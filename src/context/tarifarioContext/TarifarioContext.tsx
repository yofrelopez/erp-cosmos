

import { createContext } from "react";
import { ListaDeProductos } from "../../utils/funcionesSupabase";
import { PreciosMoldurasProps } from "./TarifarioProvider";



interface ContextProps {
    listaProductos : ListaDeProductos[] | null;
    setListaProductos: (listaProductos: ListaDeProductos[] | null) => void;
    listaPreciosMolduras: PreciosMoldurasProps | null;
    setListaPreciosMolduras: (listaPreciosMolduras: PreciosMoldurasProps | null) => void;
    listaPreciosAglomerados: PreciosMoldurasProps | null;
    setListaPreciosAglomerados: (listaPreciosAglomerados: PreciosMoldurasProps | null) => void;

}

export const TarifarioContext = createContext({} as ContextProps);


