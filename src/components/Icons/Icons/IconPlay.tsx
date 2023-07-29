import IconContainer from '../components/IconContainer';
import { IconProps } from './IconProps';

export default function IconPlay({ type, className }: IconProps): JSX.Element {
  return (
    <IconContainer className={className} type={type}>
      {({ iconClassName }) => (
        <svg
          className={iconClassName}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1.984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L2.506 1.139A1 1 0 0 0 1 1.984Z"
          />
        </svg>
      )}
    </IconContainer>
  );
}
