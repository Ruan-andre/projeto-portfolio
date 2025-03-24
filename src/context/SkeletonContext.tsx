"use client";

import { createContext, useState, useContext } from "react";

interface SkeletonContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const skeletonContext = createContext<SkeletonContextType | undefined>(undefined);

export const SkeletonProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  return <skeletonContext.Provider value={{ isLoading, setIsLoading }}>{children}</skeletonContext.Provider>;
};

export const useSkeleton = () => {
  const context = useContext(skeletonContext);

  if (!context) throw new Error("useSkeleton deve ser usado dentro de FooterProvider");
  return context;
};
