import { FC, ReactNode, useState } from "react"
import { OrdenContext } from "./OrdenContext";
import { IOrden } from "../../interface/interfaces";
import { IOrdenItems } from "../../interface/interfaces";
import { supabase } from "../../supabase/client";
import { IObservacionesFetch } from "../../components/cotizaciones/Observacion";





interface Props {
    children: ReactNode;
}


const OrdenProvider:FC<Props> = ({children}) => {


    const [newOrden, setNewOrden] = useState<IOrden | null | undefined>(null)

    const [ordenItems, setOrdenItems] = useState<IOrdenItems>({} as IOrdenItems)

    const [ observaciones, setObservaciones ] = useState<IObservacionesFetch[] | false>( false )

    const agregarOrden = async (orden: IOrden): Promise<boolean> => {
        try {
            //verificar si el orden ya existe
            const { data, error } = await supabase
            .from('ordenes')
            .select('*')
            .eq('id_orden', orden.id_orden)
            if (error) {
                throw error
            }
            if (data?.length) {
                throw new Error('El orden ya existe')
            }
            //agregar orden
            const { data: data2, error: error2 } = await supabase
            .from('ordenes')
            .insert([
                { 
                    id_orden: orden.id_orden,
                    id_cliente: orden.id_cliente,
                    ordenType: orden.ordenType,
                    fechaEntrega: orden.fechaEntrega,
                    estadoServicio: orden.estadoServicio,
                    estadoEntrega: orden.estadoEntrega,
                    estadoPago: orden.estadoPago,
                    total: orden.total
                }
            ])
            if (error2) {
                throw error2
            }
            setNewOrden(data2?.[0])
            return true

        } catch (error) {
            console.log(error)
            return false
        }

    }

    const agregarOrdenItems = async (orden_Items: IOrdenItems): Promise<boolean> => {

        const items = orden_Items.items.map((item) => {
            return {
                id_orden: orden_Items.id_orden,
                id_item: item.id,
                producto: item.producto,
                descripcion: item.descripcion,
                p_unitario: item.pUnitario,
                cantidad: item.cantidad,
                subtotal: item.subTotal,
            }
        })



        try {
            //agregar orden_Items a la orden
            const { error } = await supabase
            .from('items_orden')
            .insert(items)
            if (error) {
                throw error
            }
            setOrdenItems({} as IOrdenItems)
            return true

        } catch (error) {
            console.log(error)
            return false
        }

    } 


  return (
    <OrdenContext.Provider value={{newOrden, agregarOrden, agregarOrdenItems,
                                    setNewOrden, ordenItems, setOrdenItems, observaciones, setObservaciones}}>
        {children}
    </OrdenContext.Provider>
  )
}

export default OrdenProvider