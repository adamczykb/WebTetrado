import React, { useEffect } from "react";
import {
  DefaultPluginUISpec,
  PluginUISpec,
} from "molstar/lib/mol-plugin-ui/spec";
import { createPluginUI } from "molstar/lib/mol-plugin-ui/index";
import { PluginConfig } from "molstar/lib/mol-plugin/config";
import { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { Script } from "molstar/lib/mol-script/script";
import { StructureSelection } from "molstar/lib/mol-model/structure/query";

import "../../assets/css/molstar.css";

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
  const trajectory = await plugin.builders.structure.parseTrajectory(
    data,
    "mmcif"
  );
  await plugin.builders.structure.hierarchy.applyPreset(trajectory, "default");
  const data_sel =
    plugin.managers.structure.hierarchy.current.structures[0]?.cell.obj?.data;
//   const selection = Script.getStructureSelection(
//     (Q) =>
//       Q.struct.generator.atomGroups({
//         "chain-test": Q.core.rel.eq(["B", Q.ammp("label_asym_id")]),
//       }),
//     data_sel!
//   );
//   const loci = StructureSelection.toLociWithSourceUnits(selection);
  return plugin;
};
type MyProps = {
  structure_file: string;
};
export class MolStarWrapper extends React.Component<MyProps> {
  parent: React.RefObject<HTMLDivElement>;
  constructor(props: any) {
    super(props);
    this.parent = React.createRef<HTMLDivElement>();
  }
  componentDidMount() {
    let plugin: Promise<PluginUIContext> | undefined = undefined;
    async function init(parent: any, url: string) {
      plugin = createPlugin(parent.current, url);
      return () => {
        plugin?.then(function (result) {
          result.dispose();
        });
      };
    }
    init(this.parent, this.props.structure_file);
  }

  render() {
    return <div ref={this.parent}></div>;
  }
}
