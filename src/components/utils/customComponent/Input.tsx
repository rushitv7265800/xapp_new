import styled from 'styled-components';
import Block from './Block';

interface InputProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  left?: any;
  right?: any;
  classname?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Explicit typing for onChange
  type?: string;
  value?: any; // Make value optional
  placeholder?: any; // Make placeholder optional
}

const InputComponent = (props: InputProps) => {
  const { left, right, classname } = props;
  return (
    <Block className={`rounded-lg shadow-lg px-3 ${classname && classname}`}>
      {left ? left : ""}
      <Input {...props} />
      {right ? right : ""}
    </Block>
  );
};

const Input = styled.input`
  border: 1px solid var(--inputBackground);
  background: var(--inputBackground);
  font-size: 0.9rem;
  padding: 0.8rem;
  border-radius: 0.5rem;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

export default InputComponent;
