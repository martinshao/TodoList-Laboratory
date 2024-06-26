import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledButton } from './StyledButton';

interface DecrementProps {
  icon?: IconProp;
  disabled?: boolean;
  onClick?: () => void;
}

function Decrement({
  icon = 'minus',
  onClick,
  disabled,
  ...props
}: DecrementProps) {
  return (
    <StyledButton onClick={onClick} disabled={disabled} {...props}>
      <FontAwesomeIcon icon={icon} color='#17a2b8' />
    </StyledButton>
  );
}

export default Decrement;
