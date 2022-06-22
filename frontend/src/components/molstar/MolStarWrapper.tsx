import React from "react";
import {
  DefaultPluginUISpec,
  PluginUISpec,
} from "molstar/lib/mol-plugin-ui/spec";
import { createPluginUI } from "molstar/lib/mol-plugin-ui";
import { PluginConfig } from "molstar/lib/mol-plugin/config";
import { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";

import "molstar/build/viewer/molstar.css";
import { StructureElement } from "molstar/lib/mol-model/structure";
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

// const StripedResidues = CustomElementProperty.create<number>({
//   label: "Show quadruplexes",
//   name: "basic-wrapper",
//   getData(model: Model) {
//     const map = new Map<ElementIndex, number>();
//     const residueIndex = model.atomicHierarchy.residueAtomSegments.index;
//     for (let i = 0, _i = model.atomicHierarchy.atoms._rowCount; i < _i; i++) {
//       map.set(i as ElementIndex, residueIndex[i] % 2);

//     }
//     return { value: map };
//   },
//   coloring: {
//     getColor(e: any) {
//       return e === 0 ? Color(0xff0011) : Color(0x1100ff);
//     },
//     defaultColor: Color(0x222222),
//   },
//   getLabel(e: any) {
//     return "";
//   },
// });

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
  structure: StateObjectRef<SO.Molecule.Structure>
) {
  // Create array of expressions defining nucleotides of each tetrad
  const nucleotideTetradExpressions = tetrads.map((tetrad) => {
    const tetradNucleotides = parseTetrad(tetrad.name);
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
  });

  // Create quadruplex structure
  let quadruplexNumber = 1; // FIXME: should be unique for each quadruplex
  const quadruplexExpression = MS.core.logic.or(nucleotideTetradExpressions);
  const quadruplexComponent =
    await plugin.builders.structure.tryCreateComponentFromExpression(
      structure,
      MS.struct.generator.atomGroups({ "residue-test": quadruplexExpression }),
      `quadruplex-component-${quadruplexNumber}`,
      { label: `Quadruplex ${quadruplexNumber}` }
    );
  if (!quadruplexComponent) return;
  quadruplexNumber++;
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
          type: "cartoon",
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
      { type: "cartoon" }
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
        if (!StructureElement.Location.is(location)) return ColorNames.green;
        const { unit, element } = location;
        let outputColor = Color(0xeeeeee);

        const atom_data = unit.model.atomicHierarchy;
        const residue =
          atom_data.chains.auth_asym_id
            .value(atom_data.chainAtomSegments.index[element])
            .toString() +
          "." +
          atom_data.atoms.auth_comp_id.value(element) +
          atom_data.residues.auth_seq_id
            .value(atom_data.residueAtomSegments.index[element])
            .toString();
        tetrads.forEach((x) => {
          if (x.nucleotities.includes(residue)) {
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

  plugin.representation.structure.themes.colorThemeRegistry.add(
    TetradOnzColorSchemeProvider
  );
  for (const s of plugin.managers.structure.hierarchy.current.structures) {
    plugin.managers.structure.component.updateRepresentationsTheme(
      s.components,
      { color: TetradOnzColorSchemeProvider.name as any }
    );
  }
}

const createPlugin = async (
  parent: HTMLDivElement,
  url: string,
  tetrads: tetrad[]
) => {
  const file_format: String =
    url.split(".")[url.split(".").length - 1] === "cif" ? "mmcif" : "pdb";

  const plugin = await createPluginUI(parent, MolStarPluginSpec);
  const data = await plugin.builders.data.download(
    { url: url },
    { state: { isGhost: true } }
  );
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
  await addTetradComponents(plugin, tetrads, structure);
  applyTetradOnzColorScheme(plugin, tetrads);
  plugin.behaviors.layout.leftPanelTabName.next("data");
  return plugin;
};

type MolStarWrapperProps = {
  structure_file: string;
  tetrads: tetrad[];
};

export class MolStarWrapper extends React.Component<MolStarWrapperProps> {
  parent: React.RefObject<HTMLDivElement>;
  plugin: Promise<PluginUIContext> | undefined;

  constructor(props: any) {
    super(props);
    this.parent = React.createRef<HTMLDivElement>();
    this.plugin = undefined;
  }

  componentDidMount() {
    async function init(
      plugin: Promise<PluginUIContext> | undefined,
      parent: any,
      url: string,
      tetrads: tetrad[]
    ) {
      plugin = createPlugin(parent.current, url, tetrads);

      return () => {
        plugin?.then(function (result) {
          result.dispose();
        });
      };
    }
    return init(
      this.plugin,
      this.parent,
      this.props.structure_file,
      this.props.tetrads
    );
  }

  render() {
    return <div ref={this.parent}></div>;
  }
}
