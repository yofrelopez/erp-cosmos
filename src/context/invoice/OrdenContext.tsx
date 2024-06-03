import { createContext } from 'react';
import { IOrden, IOrdenItems } from '../../interface/interfaces';
import { IObservacionesFetch } from '../../components/cotizaciones/Observacion';


interface ContextProps {
    newOrden: IOrden | null | undefined;
    agregarOrden: (orden: IOrden) => Promise<boolean>;
    agregarOrdenItems: (ordenItems: IOrdenItems) => Promise<boolean>;
    setNewOrden: (orden: IOrden | null | undefined) => void;
    ordenItems: IOrdenItems;
    setOrdenItems: (ordenItems: IOrdenItems) => void;
    observaciones: IObservacionesFetch[] | false;
    setObservaciones: (observaciones: IObservacionesFetch[] | false) => void;


}


export const OrdenContext = createContext({} as ContextProps);