import React, { useCallback, useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Panel,
  ConnectionLineType,
  useViewport,
} from "reactflow";

import "reactflow/dist/style.css";
import "./diagram.css";

import { FbNode } from "./components/FbNode";
import FbEdge from "./components/edges/fbEdge";
import { useDiagramStore } from "./stores/diagramStore";

const rfStyle = {
  // backgroundColor: '#B8CEFF',
  backgroundColor: "#fafafa",
};

export default function App() {
  const viewport = useViewport();

  let {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addFbNode,
    addInp,
    addOutp,
  } = useDiagramStore();

  const nodeTypes = useMemo(() => ({ fbNode: FbNode }), []);

  const edgeTypes = useMemo(() => ({ fbEdge: FbEdge }), []);
  const connectionLineStyle = { stroke: "#F6AD55", strokeWidth: 2 };
  const defaultEdgeOptions = { style: connectionLineStyle, type: "fbEdge" };

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  function onStageDrop(e: React.DragEvent<HTMLDivElement>) {
    let type = e.dataTransfer.getData("text/plain");
    if (type == "fb") {
      let point = { x: e.clientX, y: e.clientY };
      let position = {
        x: (point.x - viewport.x) / viewport.zoom,
        y: (point.y - viewport.y) / viewport.zoom,
      };
      addFbNode(position);
    } else if (type == "inp" || type == "outp") {
      let fbNode = (e.target as HTMLElement).closest(
        ".react-flow__node-fbNode"
      );
      if (fbNode) {
        let parentId = fbNode.getAttribute("data-id");
        if (parentId) {
          if (type == "inp") {
            addInp(parentId);
          } else if (type == "outp") {
            addOutp(parentId);
          }
        }
      }
    }
  }

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineStyle={connectionLineStyle}
      connectionLineType={ConnectionLineType.SmoothStep}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      style={rfStyle}
      onDragOver={onDragOver}
      onDrop={onStageDrop}
    >
      <Controls />
      <MiniMap />
      <Background variant="dots" gap={12} size={1} />
      <Panel position="top-left" className="panel--top">
        <button
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData("text/plain", "fb")}
          className="btn-add"
        >
          Добавить FB
        </button>
        <button
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData("text/plain", "inp")}
          className="btn-add"
        >
          Добавить INP
        </button>

        <button
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData("text/plain", "outp")}
          className="btn-add"
        >
          Добавить OUTP
        </button>
      </Panel>
    </ReactFlow>
  );
}
