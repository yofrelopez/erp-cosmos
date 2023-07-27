

import { useContext, useEffect } from "react";
import { CrudContext } from "../../context/crud/CrudContext";
import Boton from "./Boton";




const Botones = () => {

    const { tarifarioVidrios, getTarifarioVidrios } = useContext(CrudContext)



    useEffect(() => {
        getTarifarioVidrios()        
    }, [] )


  return (
    <>
        <div className="row">
        {
            tarifarioVidrios?.map((vidrio) => (
                <Boton key={vidrio?.id} vidrio={vidrio} />
            ))

        }
        </div>
    </>

  )
}

export default Botones