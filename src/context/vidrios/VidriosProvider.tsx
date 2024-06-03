
import { FC, ReactNode, useState} from "react"
import { VidriosContext } from "./VidriosContext";
import { IVidrioCliente } from "../../interface/interfaces";
import { IVidrio } from "../../components/vidrios/FormVidrios";
import { SimpleYMate } from "../../utils/funcionesSupabase";




interface Props {
    children: ReactNode;
}


const VidriosProviderContext:FC<Props> = ({children}) => {

    const [vidrioCliente, setVidrioCliente] = useState<IVidrioCliente | undefined | null>(null)
    const [preFt2, setPreFt2] = useState<number>(0)

    const [formData, setFormData] = useState<IVidrio | null>(null)

    const [ isActiveBoton, setIsActiveBoton ] = useState<boolean>(true)

    const [ isActiveBoton2, setIsActiveBoton2 ] = useState<boolean>(true)

    const [ isActiveReset, setIsActiveReset ] = useState<boolean>(false)

    const [activeMenuBotones, setActiveMenuBotones] = useState<string>('Vidrio');

    const [precioVidrioSimple, setPrecioVidrioSimple] = useState<number>(0);

    const [precioVidrioMate, setPrecioVidrioMate] = useState<number>(0);

    const setVidrioSimpleyMate = (precio:SimpleYMate[] ) => {
        precio.map( item => {
            if(item.code === 'VSIM-IL'){
                setPrecioVidrioSimple(item.venta)
            }
            if(item.code === 'VSIM-M'){
                setPrecioVidrioMate(item.venta)
            }
        })
    }

    const calcFt2 = (ancho: number, alto: number) => {
        const result = (ancho * alto) / 900
        return result
    }



  return (
    <VidriosContext.Provider
        value={{formData, setFormData, vidrioCliente,
        setVidrioCliente, preFt2, setPreFt2, calcFt2,
        isActiveBoton, setIsActiveBoton,
        isActiveBoton2, setIsActiveBoton2, isActiveReset, setIsActiveReset,
        activeMenuBotones, setActiveMenuBotones, precioVidrioSimple, precioVidrioMate, setVidrioSimpleyMate  }}>

        {children}

    </VidriosContext.Provider>
  )
}

export default VidriosProviderContext