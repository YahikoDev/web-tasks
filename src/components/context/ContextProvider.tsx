import { createContext, useContext, useState } from "react";
import { UserOutput } from "../../interfaces/User";
import { ContextProviderProps, StateContextType, StatusContextType } from "../../interfaces/context/Context";
import { PriorityAndStatus } from "../../interfaces/Tasks";

const StateContext = createContext<StateContextType>({
    user: {} as UserOutput,
    token: null,
    setUser: () => { },
    setToken: () => { },
});

const StateContextStatus = createContext<StatusContextType>({
    statuses: [] as PriorityAndStatus[],
    setStatuses: () => { },
});


export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState({} as UserOutput);
    const [token, _setToken] = useState<string | null>(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token: string | null) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    return (
        <StateContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </StateContext.Provider>
    );
};


export const ContextProviderStatus: React.FC<ContextProviderProps> = ({ children }) => {
    const [statuses, _setStatuses] = useState([] as PriorityAndStatus[]);

    const setStatuses = (statuses: PriorityAndStatus[]) => {
        _setStatuses(statuses)
    };

    return (
        <StateContextStatus.Provider value={{ statuses, setStatuses }}>
            {children}
        </StateContextStatus.Provider>
    );
};


export const useStateContextSatus = () => useContext(StateContext)
export const useStateContext = () => useContext(StateContext)
