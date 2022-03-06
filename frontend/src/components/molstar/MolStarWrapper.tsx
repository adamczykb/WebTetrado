import React from "react";
import {
  DefaultPluginUISpec,
  PluginUISpec,
} from "molstar/lib/mol-plugin-ui/spec";
import { createPluginUI } from "molstar/lib/mol-plugin-ui/index";
import { PluginConfig, PluginConfigItem } from "molstar/lib/mol-plugin/config";
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

  ],
  layout: {
    initial: {
      isExpanded: false,
      showControls: false,
      controlsDisplay: "reactive",
    },
  },
};

const createPlugin = async (
  parent: HTMLDivElement,
  url: string,
  tetrads: tetrad[]
) => {
  const plugin = await createPluginUI(parent, MolStarPluginSpec);
  const data = await plugin.builders.data.download(
    { url: url },
    { state: { isGhost: true } }
  );

  let trajectory = await plugin.builders.structure.parseTrajectory(
    data,
    "mmcif"
  );
  function CustomColorTheme(
    ctx: ThemeDataContext,
    props: PD.Values<{}>
  ): ColorTheme<{}> {
    return {
      factory: CustomColorTheme,
      granularity: "group",
      color: (location) => {
        if (!StructureElement.Location.is(location)) return ColorNames.green;
        const { unit, element } = location;
        let outputColor = Color(0xeeeeee);

        const atom_data = unit.model.atomicHierarchy;
        const residue =
          atom_data.chains.label_asym_id
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

        // console.log(unit.model.atomicHierarchy.atomSourceIndex.toArray())
        // console.log(unit.model.atomicHierarchy.residues.auth_seq_id.toArray()[element])
        // if (location.structure.model.atomicHierarchy.residues.auth_seq_id.) {
        //   return ColorNames.aliceblue;
        // } else {
        return outputColor;
        // }
      },
      props: props,
      description: "",
    };
  }

  const CustomColorThemeProvider: ColorTheme.Provider<{}, "show-quadruplexes"> =
    {
      name: "show-quadruplexes",
      label: "Show quadruplexes",
      category: "WebTetrado",
      factory: CustomColorTheme,
      getParams: () => ({}),
      isApplicable: (ctx: ThemeDataContext) => true,
      defaultValues: {},
    };

  await plugin.builders.structure.hierarchy
    .applyPreset(trajectory, "all-models", {
      // showUnitcell: false,
      // representationPreset: "auto",
      // model:1
    })
    ?.then(() => {
      // plugin.representation.structure.themes.colorThemeRegistry.add(
      //   StripedResidues.colorThemeProvider!
      // );
      plugin.representation.structure.themes.colorThemeRegistry.add(
        CustomColorThemeProvider
      );
      // plugin.managers.lociLabels.addProvider(StripedResidues.labelProvider!);
      // plugin.customModelProperties.register(StripedResidues.propertyProvider, true);

      for (const s of plugin.managers.structure.hierarchy.current.structures) {
        plugin.managers.structure.component.updateRepresentationsTheme(
          s.components,
          { color: CustomColorThemeProvider.name as any }
        );
      }
      // const dataeee = plugin.managers.structure.hierarchy.current.structures[0]?.cell.obj?.data;
      //   if (!dataeee) return;
      // const seq_id = [1,4]
      // const sel = Script.getStructureSelection(
      //   (Q) =>
      //     Q.struct.generator.atomGroups({
      //       "residue-test": Q.core.rel.inRange([
      //         Q.struct.atomProperty.macromolecular.label_seq_id(),1,4
      //       ]),
      //     }),
      //     dataeee
      // );
      // const loci = StructureSelection.toLociWithSourceUnits(sel);
      // plugin.managers.interactivity.lociSelects.select({ loci });
    });

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

    init(
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
