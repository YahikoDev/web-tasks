import { ReactNode } from "react";
import { UserOutput } from "../User";

export interface ContextProviderProps {
    children: ReactNode;
}

export interface StateContextType {
    user: UserOutput;
    token: string | null;
    setUser: (user: UserOutput) => void;
    setToken: (token: string | null) => void;
}