import { ReactNode } from "react";
import { UserOutput } from "../User";
import { PriorityAndStatus } from "../Tasks";

export interface ContextProviderProps {
    children: ReactNode;
}

export interface StateContextType {
    user: UserOutput;
    token: string | null;
    setUser: (user: UserOutput) => void;
    setToken: (token: string | null) => void;
}


export interface StatusContextType {
    statuses: PriorityAndStatus[]
    setStatuses: (statuses: PriorityAndStatus[]) => void
}

export interface PriorityContextType {
    priorities: PriorityAndStatus[]
    setPriorities: (priorities: PriorityAndStatus[]) => void
}