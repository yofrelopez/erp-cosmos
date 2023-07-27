import { createContext } from 'react';
import { IItem } from '../../interface/interfaces';


interface ContextProps {

    cart : IItem[] | [];
    setCart : (value: IItem[] | []) => void;
    addItem: (item: IItem ) => void;
    nuevoItem: IItem | null;
    setNuevoItem: (item: IItem | null) => void;
    eliminarItem: (id: string) => void;
    updateCantidad: (id: string, cantidad: number) => void;
    totalCart: number;
    setTotalCart: (value: number) => void;
    
}


export const CartContext = createContext({} as ContextProps);