import { useContext, useState } from 'react';

import Button from '../../Button/Button';
import { IconPlus } from '../../Icons/Icons';
import ToasterListContext from '../ToasterListContext';
import { Toaster } from '../ToasterListContextProps';
import ToasterProvider from '../ToasterProvider';

const StoryRendererItem = (props: Toaster): JSX.Element => {
  const [counter, setCounter] = useState<number>(1);
  const { addToaster } = useContext(ToasterListContext);

  const onClick = () => {
    addToaster?.({
      ...props,
      title: props.title ? `${props.title} - ${counter}` : '',
    });
    setCounter(counter + 1);
  };

  return (
    <div style={{ right: 0, top: 0, position: 'fixed', zIndex: 9999999 }}>
      <Button
        onClick={onClick}
        label="Show toaster"
        size="small"
        type="secondary"
        Icon={IconPlus}
        isRound
      />
    </div>
  );
};

const StoryRenderer = (props: Toaster): JSX.Element => {
  return (
    <ToasterProvider>
      <StoryRendererItem {...props} />
    </ToasterProvider>
  );
};

export default StoryRenderer;
