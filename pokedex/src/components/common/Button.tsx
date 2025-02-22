"use client";
import { FC, ReactNode } from "react";

export interface ButtonProps {
  id: string,
  children: ReactNode,
  className?: string,
  replaceClassName?: boolean,
  onClick?: () => void,
  type?: "button" | "submit" | "reset"
}

const Button: FC<ButtonProps> = ({ id, children, className, replaceClassName, onClick, type }) => {
  return (
    <button id={id} type={type ?? 'button'} className={`${replaceClassName ? className : (`${className ?? ''} bg-blueColor text-[#FEFEFE] border-none p-4 rounded-[40px] cursoir-pointer shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-full outline-none`)}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;