export const NoLanes = /*                        */ 0b0000000000000000000000000000000;
export const NoLane = /*                         */ 0b0000000000000000000000000000000;

let currentlyRenderingFiber;
let renderLanes = NoLanes;

const ReactCurrentDispatcher = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: {},
};

const HooksDispatcherOnMount = {}
const HooksDispatcherOnUpdate = {}

export function renderWithHooks(
  current,
  workInProgress,
  Component,
  props,
  secondArg,
  nextRenderLanes,
) {
  renderLanes = nextRenderLanes;
  currentlyRenderingFiber = workInProgress;

  workInProgress.memoizedState = null;
  workInProgress.updateQueue = null;
  workInProgress.lanes = NoLanes;

  ReactCurrentDispatcher.current =
    current === null || current.memoizedState === null
      ? HooksDispatcherOnMount
      : HooksDispatcherOnUpdate;

  let children = Component(props, secondArg);
}