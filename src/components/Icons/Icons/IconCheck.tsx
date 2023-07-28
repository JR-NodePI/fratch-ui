import IconContainer from '../components/IconContainer';
import { IconProps } from './IconProps';

export default function IconCheck({ type, className }: IconProps): JSX.Element {
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
}
