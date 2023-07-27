
import { createContext } from 'react';


interface ContextProps {
    userId: string | null | undefined;
    isLoggedIn: boolean;
    autenticarUsuario: (email: string, password: string) => Promise<boolean>
    cerrarSesion: () => Promise<boolean>
    escucharCambioSesion: () => void
}


export const AuthContext = createContext({} as ContextProps);