import  { ReactNode } from "react";
import { GlobalProvider } from "../context/global-context";

const Provider = ({ children }: { children: ReactNode }) => {
  return <GlobalProvider>{children}</GlobalProvider>;
};

export default Provider;
