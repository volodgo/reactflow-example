import React, { CSSProperties, useCallback, useState } from "react";
import {
  Handle,
  NodeProps,
  NodeResizer,
  Position,
  Connection,
} from "reactflow";
import { FbNodeData } from "../models";

const sourceHandleStyleA: CSSProperties = { left: 50 };

export function FbNode(props: NodeProps<FbNodeData>) {
  const [label, setLabel] = useState(props.data.label);
  const onChange = useCallback((evt) => {
    // console.log(evt.target.value);
    setLabel(evt.target.value);
  }, []);

  const isValidConnection = (connection: Connection) => {
    return connection.source != connection.target;
  };

  return (
    <>
      <div className="fbNode">
        {/* <input
          id="text"
          name="text"
          onChange={onChange}
          className="nodrag"
          value={label}
        /> */}
        {props.data.label}
        <div className="fbNode__connectors">
          <div className="fbNode__connectors--inp">
            {props.data.inp?.map((inp, index) => (
              <div key={index}>
                {inp.label}
                <Handle
                  type="target"
                  position={Position.Left}
                  id={inp.id}
                  isValidConnection={isValidConnection}
                />
              </div>
            ))}
          </div>
          <div className="fbNode__connectors--outp">
            {props.data.outp?.map((outp, index) => (
              <div key={index}>
                {outp.label}
                <Handle type="source" position={Position.Right} id={outp.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <Handle type="target" position={Position.Right} id="a" /> */}
    </>
  );
}
