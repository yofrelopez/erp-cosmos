import { FC, ReactNode, useState } from "react";
import { ListaDeProductos } from "../../utils/funcionesSupabase";
import { TarifarioContext } from "./TarifarioContext";

interface Props {   
    children: ReactNode;
}

export interface PreciosMoldurasProps {
    [key: string]: number;
}




const TarifarioProvider:FC<Props> = ({children}) => {

    const [ listaProductos, setListaProductos ] = useState<ListaDeProductos[] | null>(null);

    const [ listaPreciosMolduras, setListaPreciosMolduras ] = useState<PreciosMoldurasProps | null>(null);

    const [ listaPreciosAglomerados, setListaPreciosAglomerados ] = useState<PreciosMoldurasProps | null>(null);


    return (
        <TarifarioContext.Provider
            value={{ listaProductos, setListaProductos, listaPreciosMolduras, setListaPreciosMolduras,
                        listaPreciosAglomerados, setListaPreciosAglomerados
             }}>
            {children}
        </TarifarioContext.Provider>
    )   
}


export default TarifarioProvider;


