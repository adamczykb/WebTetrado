import React from "react";
import {
  DefaultPluginUISpec,
  PluginUISpec,
} from "molstar/lib/mol-plugin-ui/spec";
import { createPluginUI } from "molstar/lib/mol-plugin-ui/index";
import { PluginConfig } from "molstar/lib/mol-plugin/config";
import { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";

import "../../assets/css/molstar.css";
import { CustomElementProperty } from "molstar/lib/mol-model-props/common/custom-element-property";
import {
  Model,
  ElementIndex,
  StructureSelection,
  StructureElement,
} from "molstar/lib/mol-model/structure";
import { Color } from "molstar/lib/mol-util/color";
import { isPositionLocation } from "molstar/lib/mol-geo/util/location-iterator";
import { Vec3 } from "molstar/lib/mol-math/linear-algebra";
import { ColorTheme } from "molstar/lib/mol-theme/color";
import { ThemeDataContext } from "molstar/lib/mol-theme/theme";
import { ColorNames } from "molstar/lib/mol-util/color/names";
import { ParamDefinition as PD } from "molstar/lib/mol-util/param-definition";
import { Script } from "molstar/lib/mol-script/script";
import Column from "antd/lib/table/Column";


export const StructureQualityReportColorThemeParams = {
  type: PD.MappedStatic('issue-count', {
      'issue-count': PD.Group({}),
      'specific-issue': PD.Group({
          kind: PD.Text()
      })
  })
};

export function CustomColorTheme(
  ctx: ThemeDataContext,
  props: PD.Values<{}>
): ColorTheme<{}> {
  // const { radius, center } = ctx.structure;
  // const radiusSq = Math.max(radius * radius, 0.001);
  // const scale = ColorTheme.PaletteScale;
  // console.log(ctx.structure?.model.atomicHierarchy.atoms.type_symbol.toArray()) //typy
  // console.log(ctx.structure?.model.atomicConformation.occupancy.toArray())  //odleglosc
  // console.log(ctx.structure?.model.atomicConformation.x.toArray())  //x
  // console.log(ctx.structure?.model.atomicConformation.y.toArray())  //x
  return {
    factory: CustomColorTheme,
    granularity: "group",
    color: (location) => {
      
      if (!StructureElement.Location.is(location)) return ColorNames.green;
      const { unit, element } = location;
      // console.log(unit.model.atomicHierarchy.residueAtomSegments.index[element].)
      if(unit.model.atomicHierarchy.atoms.label_comp_id.value(element)=='DG')
      return ColorNames.pink
      if(element==202)
      return ColorNames.red
      console.log(unit.model.atomicHierarchy.atomSourceIndex.toArray())
      // console.log(unit.model.atomicHierarchy.residues.auth_seq_id.toArray()[element])
      // if (location.structure.model.atomicHierarchy.residues.auth_seq_id.) {
      //   return ColorNames.aliceblue;
      // } else {
        return ColorNames.gold;
      // }
    },
    // palette: {
    //   filter: "nearest",
    //   colors: [
    //     ColorNames.red,
    //     Color(0xaaaaaa),
    //     ColorNames.violet,
    //     ColorNames.orange,
    //     ColorNames.yellow,
    //     ColorNames.green,
    //     ColorNames.blue,
    //   ],
    // },
    props: props,
    description: "",
  };
}

export const CustomColorThemeProvider: ColorTheme.Provider<
  {},
  "show-quadruplexes"
> = {
  name: "show-quadruplexes",
  label: "Show quadruplexes",
  category: "WebTetrado",
  factory: CustomColorTheme,
  getParams: () => ({ eodod: "eee" }),
  defaultValues: {},
  isApplicable: (ctx: ThemeDataContext) => true,
};
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
const MySpec: PluginUISpec = {
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

const createPlugin = async (parent: HTMLDivElement, url: string) => {
  const plugin = await createPluginUI(parent, MySpec);
  const data = await plugin.builders.data.download(
    { url: url },
    { state: { isGhost: true } }
  );
  let structure;
  // if(url.split(".").splice(-1)[0] == "cif"){
  //   structure=BuiltInTrajectoryFormats[0]
  // }else{
  //   structure=BuiltInTrajectoryFormats[2]
  // }
  let trajectory = await plugin.builders.structure.parseTrajectory(
    data,
    "mmcif"
  );

  await plugin.builders.structure.hierarchy
    .applyPreset(trajectory, "default", {
      showUnitcell: false,
      representationPreset: "auto",
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
type MyProps = {
  structure_file: string;
};
export class MolStarWrapper extends React.Component<MyProps> {
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
      url: string
    ) {
      plugin = createPlugin(parent.current, url);

      return () => {
        plugin?.then(function (result) {
          result.dispose();
        });
      };
    }

    init(this.plugin, this.parent, this.props.structure_file);
  }
  render() {
    return <div ref={this.parent}></div>;
  }
}
