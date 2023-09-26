import IconContainer from '../components/IconContainer';
import { IconProps } from './IconProps';

export default function IconPlus({ type, className }: IconProps): JSX.Element {
  return (
    <IconContainer className={className} type={type}>
      {({ iconClassName }): JSX.Element => (
        <svg
          className={iconClassName}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="-0.5 -0.5 19 19"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M9 1v16M1 9h16"
          />
        </svg>
      )}
    </IconContainer>
  );
}
