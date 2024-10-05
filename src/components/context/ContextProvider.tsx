import { createContext, ReactNode, useContext, useState } from "react";


interface user {
    name: string
    email: string
}

interface ContextProviderProps {
    children: ReactNode;
}

interface StateContextType {
    user: user;
    token: string | null;
    setUser: (user: user) => void;
    setToken: (token: string | null) => void;
}

const StateContext = createContext<StateContextType>({
    user: {} as user,
    token: null,
    setUser: () => { },
    setToken: () => { },
});

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState({
        name: 'Jhon',
        email: 'jhon@test.com'
    });
    const [token, _setToken] = useState<string | null>(null);

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

export const useStateContext = () => useContext(StateContext)
