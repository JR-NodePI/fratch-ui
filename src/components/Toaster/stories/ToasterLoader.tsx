import { useContext } from 'react';

import Button from '../../Button/Button';
import ToasterListContext, { Toaster } from '../ToasterListContext';
import ToasterProvider from '../ToasterProvider';

const ItemCaller = ({ toaster }: { toaster: Toaster }): JSX.Element => {
  const { addToaster } = useContext(ToasterListContext);

  const onClick = () => {
    addToaster?.(toaster);
  };

  return (
    <Button
      onClick={onClick}
      label="Show toaster"
      size="small"
      type="primary"
    />
  );
};

export default function ToasterLoader(props: Toaster): JSX.Element {
  return (
    <ToasterProvider>
      <ItemCaller toaster={{ ...props }} />
    </ToasterProvider>
  );
}
