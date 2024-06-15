import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function useGitContext() {
  const context = useContext(ThemeContext);
  return context;
}
