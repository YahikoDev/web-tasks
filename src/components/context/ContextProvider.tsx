import { createContext, useContext, useState } from "react";
import { UserOutput } from "../../interfaces/User";
import { ContextProviderProps, StateContextType } from "../../interfaces/context/Context";

const StateContext = createContext<StateContextType>({
    user: {} as UserOutput,
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
