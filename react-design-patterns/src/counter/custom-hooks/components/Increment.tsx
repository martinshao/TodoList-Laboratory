import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledButton } from './StyledButton';

interface IncrementProps {
  icon: IconProp;
  disabled?: boolean;
  onClick: () => void;
}

function Increment({ icon, onClick, disabled }: IncrementProps) {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      <FontAwesomeIcon icon={icon} color='#17a2b8' />
    </StyledButton>
  );
}

export default Increment;
