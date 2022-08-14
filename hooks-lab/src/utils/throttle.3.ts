export const throttle = <F extends Function>(callback: F) => {
  let reqID: number | null = null;

  const exec = (args: F["arguments"]) => () => {
    console.log({ argse: args });
    callback(...args);
    reqID = null;
  };

  return (...args: F["arguments"]) => {
    console.log({ args });
    if (!reqID) {
      reqID = requestAnimationFrame(exec(args));
    }
  };
};
