import React from "react";

type CountdownProps = {}

type CountdownHandle = {
  start: () => void,
}

const Countdown: React.ForwardRefRenderFunction<CountdownHandle, CountdownProps> = (
  props,
  forwardedRef,
) => {

  React.useImperativeHandle(forwardedRef, () => ({
    start() { alert('Start'); }
  })
  )

  return <div>Countdown</div>
}

export default React.forwardRef(Countdown);