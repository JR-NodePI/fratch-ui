import IconContainer from './components/IconContainer';
import { IconProps } from './components/IconProps';

const IconCheck = ({
  type,
  className,
}: Pick<IconProps, 'type' | 'className'>): JSX.Element => {
  return (
    <IconContainer className={className} type={type}>
      {({ iconClassName }) => (
        <svg
          className={iconClassName}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="-1 -3 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            d="M1 5.917 5.724 10.5 15 1.5"
          />
        </svg>
      )}
    </IconContainer>
  );
};

export default IconCheck;
