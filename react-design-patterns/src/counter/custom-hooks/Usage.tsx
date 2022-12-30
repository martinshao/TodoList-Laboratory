import React from 'react';
import styled from 'styled-components';
import Counter from './Counter';
import { useCounter } from './useCounter';

function Usage() {
  const MAX_COUNT = 10;
  const { count, handleDecrement, handleIncrement } = useCounter(0);

  const handleClickIncrement = () => {
    //Put your custom logic
    if (count < MAX_COUNT) {
      handleIncrement();
    }
  };

  return (
    <>
      <Counter value={count}>
        <Counter.Decrement
          icon={'minus'}
          onClick={handleDecrement}
          disabled={count === 0}
        />
        <Counter.Label>Counter</Counter.Label>
        <Counter.Count max={MAX_COUNT} />
        <Counter.Increment
          icon={'plus'}
          onClick={handleIncrement}
          disabled={count === MAX_COUNT}
        />
      </Counter>
      <StyledContainer>
        <button onClick={handleClickIncrement} disabled={count === MAX_COUNT}>
          Custom Increment btn 1
        </button>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  margin-top: 20px;
`;

export default Usage;
