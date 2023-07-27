import { createContext } from "react";
import { ICuadro } from "../../interface/interfaces";
import { IItem } from '../../interface/interfaces';


interface ContextProps {
    calcularCuadro: ( dato: ICuadro ) => void;
    cuadro: ICuadro | null;
    itemCuadro: IItem | null;
    setItemCuadro: ( item: IItem | null ) => void;
}


export const CuadrosContext = createContext({} as ContextProps);