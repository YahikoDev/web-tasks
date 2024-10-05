import { createContext, ReactNode, useContext, useState } from "react";

interface ContextProviderProps {
    children: ReactNode;
}

interface StateContextType {
    user: string;
    token: string;
    setUser: (user: string) => void;
    setToken: (token: string) => void;
}

const StateContext = createContext<StateContextType>({
    user: '',
    token: '',
    setUser: () => { },
    setToken: () => { },
});

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState('');
    const [token, _setToken] = useState('');

    const setToken = (token: string) => {
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

export const useStateContext = () => useContext(StateContext)
