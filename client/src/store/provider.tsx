"use client";

import React, { createContext, ReactNode } from "react";

import { RootStore } from "./combineReducers";

export const StoreContext = createContext(RootStore);

export const StoreWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <StoreContext.Provider value={RootStore}>{children}</StoreContext.Provider>
  );
};
