import { useContext, useState } from 'react';

import Button from '../../Button/Button';
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
    <div style={{ position: 'fixed', zIndex: 9999999 }}>
      <Button
        onClick={onClick}
        label="Show toaster"
        size="small"
        type="primary"
      />
      <p> Total: {counter}</p>
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
