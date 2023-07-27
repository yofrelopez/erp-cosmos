import { createContext } from "react";
import { IVidrioCliente } from "../../interface/interfaces"; 
import { IVidrio } from "../../components/vidrios/FormVidrios";


interface ContextProps {
    vidrioCliente: IVidrioCliente | undefined | null,
    setVidrioCliente: (vidrioCliente: IVidrioCliente) => void,
    preFt2: number,
    setPreFt2: (preFt2: number) => void,
    calcFt2: (ancho: number, alto: number) => number,
    formData: IVidrio | null,
    setFormData: (formData: IVidrio) => void,
    isActiveBoton : boolean,
    setIsActiveBoton: (isActiveBoton: boolean) => void,
    isActiveBoton2: boolean,
    setIsActiveBoton2: (isActiveBoton2: boolean) => void,
    isActiveReset: boolean,
    setIsActiveReset: (isActiveReset: boolean) => void
}


export const VidriosContext = createContext({} as ContextProps);

