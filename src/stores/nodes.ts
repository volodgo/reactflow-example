import { Node } from "reactflow";
import { FbNodeData } from "../models";
export default <Node<FbNodeData>[]>[
  {
    id: "fb-1",
    type: "fbNode",
    data: {
      label: "fbNode1",
      inp: [
        { id: "inp-1", label: "inp1" },
        { id: "inp-2", label: "inp2" },
      ],
      outp: [{ id: "outp-1", label: "outp1" }],
    },
    position: { x: 50, y: 100 },
    style: {
      // width: 100,
      // height: 200,
    },
  },
];
