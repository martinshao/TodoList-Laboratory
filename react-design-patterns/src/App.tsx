import styled from 'styled-components';
import { default as CompoundComponent } from './counter/compound-component/Usage';
import { default as ControlProps } from './counter/control-props/Usage';

function App() {
  return (
    <StyledContainer>
      <StyledTitleContainer>
        <h1>Advanced React Pattern</h1>
      </StyledTitleContainer>

      <StyledPatternContainer>
        <h2>Compound component pattern</h2>
        <CompoundComponent />
      </StyledPatternContainer>

      <StyledPatternContainer>
        <h2>Control props pattern</h2>
        <ControlProps />
      </StyledPatternContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  text-align: center;
  font-family: sans-serif;
`;

const StyledTitleContainer = styled.div`
  background-color: #1428a0;
  color: white;
  padding: 35px;

  > h1 {
    margin: 0;
  }
`;

const StyledPatternContainer = styled.div`
  padding: 30px;
  border-bottom: 2px solid #d3d3d3;

  &:last-child {
    border: none;
  }

  > h2 {
    margin-top: 0;
  }
`;

export default App;
