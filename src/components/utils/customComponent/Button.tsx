import React from "react";

interface ButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  outlined?: boolean,
  classname?: string,
  onClick:any
}

const Button = (props: ButtonProps) => {
  const { outlined, classname } = props;
  return (
    <button
      className={`${outlined ? "bg-white border-primary border-2 text-primary font-bold" : "bg-theme text-white font-bold"} px-10 rounded-xl py-3 ${classname}`}
      {...props} />
  )
}

export default Button;