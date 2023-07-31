import IconContainer from '../components/IconContainer';
import { IconProps } from './IconProps';

export default function IconPause({ type, className }: IconProps): JSX.Element {
  return (
    <IconContainer className={className} type={type}>
      {({ iconClassName }) => (
        <svg
          className={iconClassName}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 12 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1.8c0-.442.32-.8.714-.8h1.429c.394 0 .714.358.714.8v14.4c0 .442-.32.8-.714.8H1.714a.678.678 0 0 1-.505-.234A.851.851 0 0 1 1 16.2V1.8Zm7.143 0c0-.442.32-.8.714-.8h1.429c.19 0 .37.084.505.234.134.15.209.354.209.566v14.4c0 .442-.32.8-.714.8H8.857c-.394 0-.714-.358-.714-.8V1.8Z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </IconContainer>
  );
}
