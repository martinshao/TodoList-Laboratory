import { useMachine } from "@xstate/react";
import { mouseMachine } from "../xstate/mouseMachine";


function MouseMove() {
  const [, send] = useMachine(mouseMachine);
  return (
    <div style={{width: '200px', height: '200px'}} onMouseMove={(event) => send(event)}>MouseMove</div>
  )
}

export default MouseMove