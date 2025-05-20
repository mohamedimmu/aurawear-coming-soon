"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { type ReactNode } from "react";

interface ThemeProps extends ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children, ...props }: ThemeProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
