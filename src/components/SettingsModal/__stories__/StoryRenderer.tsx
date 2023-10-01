import { createPortal } from 'react-dom';

import SettingsModal from '../SettingsModal';
import { SettingsModalProps } from '../SettingsModalProps';

const inlineStyles: React.CSSProperties = {
  position: 'fixed',
  zIndex: 999999,
  top: '10%',
  left: '20%',
  boxShadow: 'border-box',
  width: '60%',
  height: '80%',
  backgroundColor: 'var(--ft-color-background)',
  border: '1px solid var(--ft-color-grey-1)',
};

export default function StoryRenderer(props: SettingsModalProps): JSX.Element {
  return createPortal(
    <div style={inlineStyles}>
      <SettingsModal {...props} />
    </div>,
    document.body
  );
}
