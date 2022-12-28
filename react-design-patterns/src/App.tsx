import styled from 'styled-components';
import Usage from './counter/compound-component/Usage';

function App() {
  return (
    <StyledApp>
      <Usage />
    </StyledApp>
  );
}

const StyledApp = styled.div`
  padding: 20px;
`;

export default App;
