import { CrudContext } from "../../../context/crud/CrudContext"
import Encabezado from "./Encabezado"
import Filas from "./Filas"
import { useContext, useEffect, useState } from 'react';






const VistaTarifario = () => {

  const { tarifarioVidrios, getTarifarioVidrios, escucharCambios, setEscucharCambios } = useContext(CrudContext)

  const [tarifario, setTarifario] = useState<any[] | undefined | null>(null)



  useEffect(() => {
    getTarifarioVidrios('*')
  }, [])

  useEffect(() => {
    if(tarifarioVidrios){
      setTarifario(tarifarioVidrios)
      console.log('Desde Tarifario', tarifario)
    }
  }, [tarifarioVidrios])

  useEffect(() => {
    if(escucharCambios){
      getTarifarioVidrios('*')
      setEscucharCambios(false)
    }
  }, [escucharCambios])


  return (
    <>
      {
        tarifario && tarifario.length > 0        
        ?

        <table className="table table-striped">
          <Encabezado />
          <tbody>
            {
              tarifario && tarifario.map( item => (
                <Filas key={item.id} item={item} />
              ))
            }
          </tbody>
      </table>

      :
      false
      }
    </>
  )
}

export default VistaTarifario