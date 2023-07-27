import { createContext } from 'react';
import { ICliente } from '../../interface/interfaces';


interface ContextProps {
    cliente: ICliente | null | undefined;
    agregarCliente: (cliente: ICliente) => Promise<boolean>;
    setCliente: (cliente: ICliente | null | undefined) => void;
}


export const ClienteContext = createContext({} as ContextProps);