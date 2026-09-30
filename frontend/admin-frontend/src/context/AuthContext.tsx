import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import {login as loginRequest} from "../services/authService";
import type {LoginRequest} from "../types/Auth";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
                                 children,
                             }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => Boolean(localStorage.getItem("accessToken"))
    );

    const login = async (
        credentials: LoginRequest
    ): Promise<void> => {
        const response = await loginRequest(credentials);

        localStorage.setItem(
            "accessToken",
            response.accessToken
        );

        setIsAuthenticated(true);
    };

    const logout = (): void => {
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}