import IconContainer from './components/IconContainer';
import { IconProps } from './components/IconProps';

const IconClose = ({
  type,
  className,
}: Pick<IconProps, 'type' | 'className'>): JSX.Element => {
  return (
    <IconContainer className={className} type={type}>
      {({ iconClassName }) => (
        <svg
          className={iconClassName}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="-1 -1 16 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      )}
    </IconContainer>
  );
};

export default IconClose;
