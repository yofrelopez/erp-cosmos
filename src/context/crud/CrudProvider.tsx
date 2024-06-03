
import { FC, ReactNode, useState } from "react"
import { CrudContext } from "./CrudContext";
import { supabase } from "../../supabase/client";
import { ITarifarioVidrios } from "../../components/tarifarios/Vidrios";



interface Props {
    children: ReactNode;
}


const CrudProviderCtxt:FC<Props> = ({children}) => {

    // crear un estado para tarifario con typescript

    const [tarifarioVidrios, setTarifarioVidrios] = useState<any[] | undefined | null>(null)

    const [ productoParaActualizar, setProductoParaActualizar ] = useState<ITarifarioVidrios | null>(null)

    const [ escucharCambios, setEscucharCambios ] = useState<boolean>(false)


    // conectarme con supabase con la tabal productos para leer los datos y ordenarlos por espesor
    // la funcion getTarifarioVidrios() recibe una variable tipo string que es el nombre de la categoria 

    const getTarifarioVidrios = async ( selection: string ) : Promise<boolean | undefined > => {

        const categoriaId = () => {
            if (selection === 'Vidrio') {
                return 1
            } else if (selection === 'Espejo') {
                return 2
            } else if (selection === 'Ventana') {
                return 3
            } else if (selection === 'Puerta') {
                return 4
            } else if (selection === 'Moldura') {
                return 5
            } else {
                return '*'
            }
        }

        if( selection !== '*' ){
            let { data , error } = await supabase
                .from('productos')
                .select('*')
                .match({ categoria: categoriaId() })
                .order('espesor', { ascending: true })
            if (error) {
                throw error
                console.log('error', error)
                return false         } 
            else {
                setTarifarioVidrios(data)
    
                return true
            }
        }

        if(selection === '*'){
            let { data , error } = await supabase
                .from('productos')
                .select('*')
                .order('espesor', { ascending: true })
            if (error) {
                throw error
                console.log('error', error)
                return false         } 
            else {
                setTarifarioVidrios(data)
    
                return true
            }
        }


    }

    // eliminar un registro de la tabla productos

    const deleteTarifarioVidrios = async (id: number | undefined ) : Promise<boolean> => {
        let { data, error } = await supabase
            .from('productos')
            .delete()
            .match({ id: id })
        if (error) {
            throw error
            console.log('error', error)
            return false
        } else {
            console.log('data', data)
            getTarifarioVidrios('*')
            return true
        }
    }

    // crear una funcion para actualizar un registro de la tabla productos
    
    const updateTarifarioVidrios = async (producto: ITarifarioVidrios ) : Promise<boolean> => {
        let { data, error } = await supabase
            .from('productos')
            .update(producto)
            .match({ id: producto.id })
        if (error) {
            throw error
            console.log('error', error)
            return false
        } else {
            console.log('data', data)
            getTarifarioVidrios('*')
            return true
        }
    }











  return (
    <CrudContext.Provider
        value={{getTarifarioVidrios, tarifarioVidrios,
                deleteTarifarioVidrios, updateTarifarioVidrios,
                productoParaActualizar, setProductoParaActualizar,
                escucharCambios, setEscucharCambios
                }}>
        {children}
    </CrudContext.Provider>
  )
}

export default CrudProviderCtxt