import React from "react";
import { BaseEdge, EdgeProps, getSmoothStepPath } from "reactflow";

function FbEdge(props: EdgeProps) {
  const { sourceX, sourceY, targetX, targetY } = props;

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return <BaseEdge path={edgePath} {...props} />;
}

export default FbEdge;
