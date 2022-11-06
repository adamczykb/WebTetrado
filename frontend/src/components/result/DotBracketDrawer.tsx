import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import {
  ONZ_COLORS_STRING,
  ONZ_TEXTS_COLOR_STRING,
  STRING_ONZ_COLORS,
} from "../../assets/data/onzClassColor";
import {
  dot_bracket_values,
  helice,
  nucleotide,
  quadruplex,
  tetrad,
} from "../../types/RestultSet";

interface DotBracketDrawerArguments {
  helice: helice[];
  nucleotides: nucleotide[];
  dot_bracket: dot_bracket_values;
}
const DotBracketDrawer = (props: DotBracketDrawerArguments) => {
  let [bracketArray, setBracketArray] = useState<Map<number, string>>(
    new Map<number, string>()
  );
  useEffect(() => {
    let onz_bracket_map = new Map<number, string>();
    props.helice.forEach((helice: helice) => {
      helice.quadruplexes.forEach((quadruplex: quadruplex) => {
        quadruplex.tetrad.forEach((tetrad: tetrad) => {
          tetrad.name.split("-").forEach((nucleotide: string) => {
            onz_bracket_map.set(
              props.nucleotides[
                props.nucleotides.findIndex((value: any) => {
                  return value.name == nucleotide;
                })
              ].number,
              ONZ_COLORS_STRING[tetrad.onz_class]
            );
          });
        });
      });
    });
    setBracketArray(onz_bracket_map);
  }, []);

  return (
    <p
      style={{
        whiteSpace: "pre-wrap",
        fontSize: "20px",
        marginLeft: "10px",
        fontFamily: "'PT Mono', monospace",
      }}
    >
      {props.dot_bracket.sequence
        .split("")
        .map((sequence: string, index: number) =>
          sequence == "-" ? (
            <span
              key={"dbs" + index.toString()}
              style={{ fontFamily: '"PT Mono", monospace' }}
            >
              {sequence}
            </span>
          ) : bracketArray?.has(
              index +
                1 -
                (props.dot_bracket.sequence.slice(0, index).match(/-/g) || [])
                  .length
            ) ? (
            <Tooltip
              key={"dbs" + index.toString()}
              placement="top"
              title={
                STRING_ONZ_COLORS[
                  bracketArray?.get(
                    index +
                      1 -
                      (
                        props.dot_bracket.sequence
                          .slice(0, index)
                          .match(/-/g) || []
                      ).length
                  ) || ""
                ]
              }
            >
              <span
                style={{
                  fontFamily: '"PT Mono", monospace',
                  backgroundColor: bracketArray?.get(
                    index +
                      1 -
                      (
                        props.dot_bracket.sequence
                          .slice(0, index)
                          .match(/-/g) || []
                      ).length
                  ),
                  color:
                    ONZ_TEXTS_COLOR_STRING[
                      STRING_ONZ_COLORS[
                        bracketArray?.get(
                          index +
                            1 -
                            (
                              props.dot_bracket.sequence
                                .slice(0, index)
                                .match(/-/g) || []
                            ).length
                        )!
                      ]
                    ],
                }}
              >
                {sequence}
              </span>
            </Tooltip>
          ) : (
            <span
              style={{ fontFamily: '"PT Mono", monospace' }}
              key={"dbs" + index.toString()}
            >
              {sequence}
            </span>
          )
        )}
      <br />
      {props.dot_bracket.line1
        .split("")
        .map((sequence: string, index: number) =>
          sequence == "-" ? (
            <span
              style={{ fontFamily: '"PT Mono", monospace' }}
              key={"dbl1" + index.toString()}
            >
              {sequence}
            </span>
          ) : bracketArray?.has(
              index +
                1 -
                (props.dot_bracket.sequence.slice(0, index).match(/-/g) || [])
                  .length
            ) ? (
            <Tooltip
              key={"dbl1" + index.toString()}
              placement="top"
              title={
                STRING_ONZ_COLORS[
                  bracketArray?.get(
                    index +
                      1 -
                      (
                        props.dot_bracket.sequence
                          .slice(0, index)
                          .match(/-/g) || []
                      ).length
                  ) || ""
                ]
              }
            >
              <span
                style={{
                  fontFamily: '"PT Mono", monospace',
                  backgroundColor: bracketArray?.get(
                    index +
                      1 -
                      (
                        props.dot_bracket.sequence
                          .slice(0, index)
                          .match(/-/g) || []
                      ).length
                  ),
                  color:
                    ONZ_TEXTS_COLOR_STRING[
                      STRING_ONZ_COLORS[
                        bracketArray?.get(
                          index +
                            1 -
                            (
                              props.dot_bracket.sequence
                                .slice(0, index)
                                .match(/-/g) || []
                            ).length
                        )!
                      ]
                    ],
                }}
              >
                {sequence}
              </span>
            </Tooltip>
          ) : (
            <span
              style={{ fontFamily: '"PT Mono", monospace' }}
              key={"dbl1" + index.toString()}
            >
              {sequence}
            </span>
          )
        )}

      <br />
      {props.dot_bracket.line2
        .split("")
        .map((sequence: string, index: number) =>
          sequence == "-" ? (
            <span
              style={{ fontFamily: '"PT Mono", monospace' }}
              key={"dbl2" + index.toString()}
            >
              {sequence}
            </span>
          ) : bracketArray?.has(
              index +
                1 -
                (props.dot_bracket.sequence.slice(0, index).match(/-/g) || [])
                  .length
            ) ? (
            <Tooltip
              key={"dbl2" + index.toString()}
              placement="top"
              title={
                STRING_ONZ_COLORS[
                  bracketArray?.get(
                    index +
                      1 -
                      (
                        props.dot_bracket.sequence
                          .slice(0, index)
                          .match(/-/g) || []
                      ).length
                  ) || ""
                ]
              }
            >
              <span
                style={{
                  fontFamily: '"PT Mono", monospace',
                  backgroundColor: bracketArray?.get(
                    index +
                      1 -
                      (
                        props.dot_bracket.sequence
                          .slice(0, index)
                          .match(/-/g) || []
                      ).length
                  ),
                  color:
                    ONZ_TEXTS_COLOR_STRING[
                      STRING_ONZ_COLORS[
                        bracketArray?.get(
                          index +
                            1 -
                            (
                              props.dot_bracket.sequence
                                .slice(0, index)
                                .match(/-/g) || []
                            ).length
                        )!
                      ]
                    ],
                }}
              >
                {sequence}
              </span>
            </Tooltip>
          ) : (
            <span
              style={{ fontFamily: '"PT Mono", monospace' }}
              key={"dbl2" + index.toString()}
            >
              {sequence}
            </span>
          )
        )}
      <br />
    </p>
  );
};

export default DotBracketDrawer;
