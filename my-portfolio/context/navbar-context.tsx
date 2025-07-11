"use client";
import { createContext, useState } from "react";
import { ChildrenProps, ModalContextType } from "../types";

export const NavBarContext = createContext({} as ModalContextType);

export const NavBarContextProvider = ({ children }: ChildrenProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const value = {
    setIsModalOpen,
    isModalOpen,
  } as unknown as ModalContextType;

  return (
    <NavBarContext.Provider value={value}>{children}</NavBarContext.Provider>
  );
};
