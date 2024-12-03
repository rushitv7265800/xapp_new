import React, { forwardRef } from 'react';
import styled from 'styled-components';

type IconProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const CustomIcon = forwardRef<HTMLButtonElement, IconProps>((props, ref) => {
  return <IconWrapper ref={ref} type="button" {...props} />;
});

export default CustomIcon;

const IconWrapper = styled.button`
  border: none;
  background-color: transparent;
  width: 4rem;
`;
