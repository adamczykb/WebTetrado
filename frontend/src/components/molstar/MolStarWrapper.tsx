import React, { useEffect, useState } from "react";
import {
  DefaultPluginUISpec,
  PluginUISpec,
} from "molstar/lib/mol-plugin-ui/spec";
import { createPluginUI } from "molstar/lib/mol-plugin-ui";
import { PluginConfig } from "molstar/lib/mol-plugin/config";
import { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";

import "molstar/build/viewer/molstar.css";
import { Structure, StructureElement } from "molstar/lib/mol-model/structure";
import { ColorTheme } from "molstar/lib/mol-theme/color";
import { ThemeDataContext } from "molstar/lib/mol-theme/theme";
import { ColorNames } from "molstar/lib/mol-util/color/names";
import { ParamDefinition as PD } from "molstar/lib/mol-util/param-definition";
import { tetrad } from "../../types/RestultSet";
import { ONZ_COLORS } from "../../assets/data/onzClassColor";
import { Color } from "molstar/lib/mol-util/color";
import { MolScriptBuilder as MS } from "molstar/lib/mol-script/language/builder";
import { StateObjectRef } from "molstar/lib/mol-state";
import { PluginStateObject as SO } from "molstar/lib/mol-plugin-state/objects";
import { Subscription } from 'rxjs';
import { throttleTime } from 'rxjs';
import { StructureRef } from "molstar/lib/mol-plugin-state/manager/structure/hierarchy-state";
const MolStarPluginSpec: PluginUISpec = {
  ...DefaultPluginUISpec(),
  config: [
    [PluginConfig.VolumeStreaming.Enabled, false],
    [PluginConfig.Viewport.ShowSettings, false],
    [PluginConfig.Viewport.ShowAnimation, false],
    [PluginConfig.Viewport.ShowSelectionMode, true],
  ],
  layout: {
    initial: {
      isExpanded: false,
      showControls: false,
      controlsDisplay: "reactive",
      regionState: {
        left: "full", // set to "hidden" to hide left panel
        top: "hidden", // set to "full" to show ACGU sequence
        right: "hidden",
        bottom: "hidden",
      },
    },
  },
  components: {
    remoteState: "none",
    viewport: {},
  },
};

function parseTetrad(tetrad: string) {
  return tetrad.split("-").map((nucleotide) => {
    const chainId = nucleotide.split(".")[0]; // FIXME: sometimes chains have long names (> 1 char)
    const numbers = nucleotide.match(/(\d)+$/);
    if (!numbers) return;
    const residueId = parseInt(numbers[0], 10);
    return { chainId, residueId };
  });
}

async function addTetradComponents(
  plugin: PluginUIContext,
  tetrads: tetrad[],
  structure: StateObjectRef<SO.Molecule.Structure>,
  representation: any
) {
  // Create array of expressions defining nucleotides of each tetrad
  const nucleotideTetradExpressions = tetrads.map((tetrad) => {
    const tetradNucleotides = parseTetrad(tetrad.name);
    if (
      tetrads.every((v) => v.nucleotides.every((v1) => v1.indexOf(".") == -1))
    ) {
      return MS.core.logic.or(
        tetradNucleotides.map((nucleotide) =>
          MS.core.logic.and([
            // Check if residue number is corresponding
            MS.core.rel.eq([nucleotide?.residueId, MS.ammp("auth_seq_id")]),
          ])
        )
      );
    } else {
      return MS.core.logic.or(
        tetradNucleotides.map((nucleotide) =>
          MS.core.logic.and([
            // Check if chain name is corresponding
            MS.core.rel.eq([nucleotide?.chainId, MS.ammp("auth_asym_id")]),
            // Check if residue number is corresponding
            MS.core.rel.eq([nucleotide?.residueId, MS.ammp("auth_seq_id")]),
          ])
        )
      );
    }
  });

  // Create quadruplex structure
  const quadruplexExpression = MS.core.logic.or(nucleotideTetradExpressions);
  const quadruplexComponent =
    await plugin.builders.structure.tryCreateComponentFromExpression(
      structure,
      MS.struct.generator.atomGroups({ "residue-test": quadruplexExpression }),
      `quadruplex-component`,
      { label: `Quadruplex` }
    );
  if (!quadruplexComponent) return;
  // For each expression in nucleotides expression array, create tetrad component
  for (let i = 0; i < nucleotideTetradExpressions.length; i++) {
    const tetradExpression = MS.struct.generator.atomGroups({
      "residue-test": nucleotideTetradExpressions[i],
    });
    const tetradComponent =
      await plugin.builders.structure.tryCreateComponentFromExpression(
        quadruplexComponent?.ref,
        tetradExpression,
        `tetrad-${tetrads[i].number}`,
        { label: `Tetrad ${tetrads[i].number}` }
      );
    if (tetradComponent)
      await plugin.builders.structure.representation.addRepresentation(
        tetradComponent,
        {
          type: representation,
        }
      );
  }

  // Create component which represents nucleotides not included in quadruplex.
  const otherNucleotides =
    await plugin.builders.structure.tryCreateComponentFromExpression(
      structure,
      MS.struct.generator.atomGroups({
        "residue-test": MS.core.logic.not([quadruplexExpression]),
      }),
      "other nucleotides",
      { label: "Other nucleotides" }
    );
  if (otherNucleotides) {
    await plugin.builders.structure.representation.addRepresentation(
      otherNucleotides,
      { type: representation }
    );
  }
}

function applyTetradOnzColorScheme(plugin: PluginUIContext, tetrads: tetrad[]) {
  function TetradOnzColorScheme(
    ctx: ThemeDataContext,
    props: PD.Values<{}>
  ): ColorTheme<{}> {
    return {
      factory: TetradOnzColorScheme,
      granularity: "group",
      color: (location) => {
        let unit = undefined;
        let element = undefined
        if (!StructureElement.Location.is(location)) {
          if (location.kind != 'bond-location')
            return ColorNames.gray
          unit = location.bUnit
          element = location.aUnit.elements[0]
        } else {
          unit = location.unit
          element = location.element
        }
        let outputColor = Color(0xeeeeee);

        const atom_data = unit.model.atomicHierarchy;
        let residue: string;
        let residue_without_chains: string;
        if (/\d+/.test(atom_data.atoms.auth_comp_id.value(element))) {
          residue =
            atom_data.chains.auth_asym_id
              .value(atom_data.chainAtomSegments.index[element])
              .toString() +
            "." +
            atom_data.atoms.auth_comp_id.value(element) +
            "/" +
            atom_data.residues.auth_seq_id
              .value(atom_data.residueAtomSegments.index[element])
              .toString();

          residue_without_chains =
            atom_data.atoms.auth_comp_id.value(element) +
            "/" +
            atom_data.residues.auth_seq_id
              .value(atom_data.residueAtomSegments.index[element])
              .toString();
        } else {
          residue =
            atom_data.chains.auth_asym_id
              .value(atom_data.chainAtomSegments.index[element])
              .toString() +
            "." +
            atom_data.atoms.auth_comp_id.value(element) +
            atom_data.residues.auth_seq_id
              .value(atom_data.residueAtomSegments.index[element])
              .toString();

          residue_without_chains =
            atom_data.atoms.auth_comp_id.value(element) +
            atom_data.residues.auth_seq_id
              .value(atom_data.residueAtomSegments.index[element])
              .toString();
        }
        tetrads.forEach((x) => {
          if (
            (x.nucleotides.every((v) => {
              return v.indexOf(".") == -1;
            }) &&
              x.nucleotides.includes(residue_without_chains)) ||
            x.nucleotides.includes(residue)
          ) {
            outputColor = Color(ONZ_COLORS[x.onz_class]);
          }
        });
        return outputColor;
      },
      props: props,
      description: "",
    };
  }

  const TetradOnzColorSchemeProvider: ColorTheme.Provider<{}, "tetrad-onz"> = {
    name: "tetrad-onz",
    label: "Tetrad ONZ",
    category: "WebTetrado",
    factory: TetradOnzColorScheme,
    getParams: () => ({}),
    isApplicable: () => true,
    defaultValues: {},
  };
  try {
    plugin.representation.structure.themes.colorThemeRegistry.add(
      TetradOnzColorSchemeProvider
    );
  } catch (e) {

  }
  for (const s of plugin.managers.structure.hierarchy.current.structures) {
    plugin.managers.structure.component.updateRepresentationsTheme(
      s.components,
      { color: TetradOnzColorSchemeProvider.name as any }
    );
  }
}

const addStructure = async (
  plugin: any,
  url: string,
  tetrads: tetrad[],
  representation: any) => {
  const data = await plugin.builders.data.download(
    { url: url },
    { state: { isGhost: true } }
  );
  const file_format: String =
    url.split(".")[url.split(".").length - 1] === "cif" ? "mmcif" : "pdb";
  //@ts-ignore
  const trajectory = await plugin.builders.structure.parseTrajectory(
    data,
    file_format
  );
  const model = await plugin.builders.structure.createModel(trajectory);
  const structure = await plugin.builders.structure.createStructure(model, {
    name: "model",
    params: {},
  });
  await addTetradComponents(plugin, tetrads, structure, representation);
  applyTetradOnzColorScheme(plugin, tetrads);

}
const createPlugin = async (
  parent: HTMLDivElement,
  url: string,
  tetrads: tetrad[],
  representation: any
) => {

  const plugin = await createPluginUI(parent, MolStarPluginSpec);
  await addStructure(plugin, url, tetrads, representation);
  plugin.behaviors.layout.leftPanelTabName.next("data");
  plugin.canvas3d?.camera.stateChanged.asObservable().pipe(throttleTime(10, undefined, { leading: true, trailing: true }))!.subscribe(value => {
    plugin.canvas3d?.camera.setState({ fog: 0, clipFar: false, minNear: 0.1 })
  })
  return { plugin };
};
type MolStarWrapperProps = {
  structure_file: string;
  tetrads: tetrad[];
  representation: any
};

export const MolStarWrapper = (props: MolStarWrapperProps) => {
  let parent_c: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
  let [plugin, setPlugin] = useState<PluginUIContext | undefined>(undefined);
  let subs_c: Subscription[] = [];

  useEffect(() => {
    if (!plugin) {
      createPlugin(parent_c.current!,
        props.structure_file,
        props.tetrads,
        props.representation
      ).then((v) => {
        setPlugin(v.plugin);
      });
    }

  }, [])

  useEffect(() => {
    if (plugin) {
      plugin.clear()
      addStructure(plugin, props.structure_file, props.tetrads, props.representation)
    }
  }, [props.representation])

  return <div ref={parent_c}></div>;
}
