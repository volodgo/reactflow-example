import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
  useReactFlow,
  useStoreApi,
  useViewport,
} from "reactflow";
import initialNodes from "./nodes";
import initialEdges from "./edges";
import React, { useCallback } from "react";
import { nanoid } from "nanoid/non-secure";

export function useDiagramStore() {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const addFbNode = (position: { x: number; y: number }) => {
    setNodes((_nodes) => {
      let index = _nodes.filter((node) => node.type == "fbNode").length + 1;
      return [
        ..._nodes,
        {
          id: "fb-" + nanoid(),
          type: "fbNode",
          data: { label: "fbNode" + index, inp: [], outp: [] },
          style: {
            // width: 100,
            // height: 200,
          },
          position: position,
        },
      ];
    });
  };

  const addInp = (parentId: string) => {
    setNodes((_nodes) => {
      let parentNode = _nodes.find((node) => node.id == parentId);
      if (parentNode) {
        let index = parentNode.data.inp.length + 1;
        parentNode.data.inp.push({
          id: "inp-" + nanoid(),
          label: "inp" + index,
        });
        parentNode.data = { ...parentNode.data };
      }
      return [..._nodes];
    });
  };

  const addOutp = (parentId: string) => {
    setNodes((_nodes) => {
      let parentNode = _nodes.find((node) => node.id == parentId);
      if (parentNode) {
        let index = parentNode.data.outp.length + 1;
        parentNode.data.outp.push({
          id: "outp-" + nanoid(),
          label: "outp" + index,
        });
        parentNode.data = { ...parentNode.data };
      }
      return [..._nodes];
    });
  };

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addFbNode,
    addInp,
    addOutp,
  };
}
