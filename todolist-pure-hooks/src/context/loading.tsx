import React, { FC, useReducer } from 'react'

interface LoadingState {
  loaded: boolean;
  loading: boolean;
  error: Error | null;
}

const LoadingComponent: FC = () => {

  const [state, dispatch] = useReducer(
    (state: LoadingState, newState: Partial<LoadingState>) => ({
      ...state,
      ...newState
    }),
    {
      loaded: false,
      loading: false,
      error: null
    }
  )


  return (
    <div></div>
  )
}

export default LoadingComponent