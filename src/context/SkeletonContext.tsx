"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SkeletonContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const SkeletonContext = createContext<SkeletonContextType | undefined>(undefined);

export const SkeletonProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => setIsLoading(false), 300);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return <SkeletonContext.Provider value={{ isLoading, setIsLoading }}>{children}</SkeletonContext.Provider>;
};

export const useSkeleton = () => {
  const context = useContext(SkeletonContext);
  if (!context) throw new Error("useSkeleton deve ser usado dentro de SkeletonProvider");
  return context;
};
