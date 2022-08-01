enum CountActionKind {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE'
}

interface CountAction {
  type: CountActionKind;
  payload: number;
}

interface CountState {
  count: number
}

function counterReducer(state: CountState, action: CountAction) {
  const { type, payload } = action

  switch (type) {
    case CountActionKind.INCREASE:
      return {
        ...state,
        value: state.count + payload
      };
    case CountActionKind.DECREASE:
      return {
        ...state,
        value: state.count - payload
      }
    default:
      return state
  }
}