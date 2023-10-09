import { useState } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '../../../components';
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
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
};

export default function StoryRenderer(props: SettingsModalProps): JSX.Element {
  const [visible, setVisible] = useState(props.visible ?? false);

  return createPortal(
    <div style={inlineStyles}>
      <SettingsModal
        {...props}
        visible={visible}
        onClose={(): void => {
          setVisible(false);
        }}
      />

      <div style={{ alignSelf: 'center' }}>
        <Button
          size="small"
          type="primary"
          onClick={(event): void => {
            event.preventDefault();
            setVisible(state => !state);
          }}
        >
          Toggle modal visibility
        </Button>
      </div>
    </div>,
    document.body
  );
}
