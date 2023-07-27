import { FC, ReactNode, useState } from "react"
import { ClienteContext } from "./ClienteContext"
import { ICliente } from "../../interface/interfaces";
import { supabase } from "../../supabase/client";





interface Props {
    children: ReactNode;
}


const ClienteProvider:FC<Props> = ({children}) => {


    const [cliente, setCliente] = useState<ICliente | null | undefined>(null)

    const agregarCliente = async (cliente: ICliente): Promise<boolean> => {
        try {
            //verificar si el cliente ya existe
            const { data, error } = await supabase
            .from('clientes')
            .select('*')
            .eq('id_cliente', cliente.id_cliente)
            if (error) {
                console.log('El cliente ya existe')
                throw error
                
            }
            if (data?.length) {
                console.log('El cliente ya existe')
                return true
            }
            //agregar cliente
            const { data: data2, error: error2 } = await supabase
            .from('clientes')
            .insert([
                { 
                    id_cliente: cliente.id_cliente,
                    id_type: cliente.tipo_doc,
                    nombres: cliente.nombres,
                    apellidos: cliente.apellidos,
                    telefono: cliente.telefono,
                    email: cliente.email,
                    direccion: cliente.direccion
                }
            ])
            if (error2) {
                throw error2
            }
            setCliente(data2?.[0])
            return true

        } catch (error) {
            console.log(error)
            return false
        }

    }


    





  return (
    <ClienteContext.Provider value={{cliente, agregarCliente, setCliente }}>
        {children}
    </ClienteContext.Provider>
  )
}

export default ClienteProvider