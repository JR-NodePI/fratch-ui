import IconContainer from '../components/IconContainer';
import { IconProps } from './IconProps';

export default function IconEdit({ type, className }: IconProps): JSX.Element {
  return (
    <IconContainer className={className} type={type}>
      {({ iconClassName }): JSX.Element => (
        <svg
          className={iconClassName}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 21 21"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"
          />
        </svg>
      )}
    </IconContainer>
  );
}
