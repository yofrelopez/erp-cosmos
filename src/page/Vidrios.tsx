import Botones from "../components/vidrios/Botones"
import FormVidrios from "../components/vidrios/FormVidrios"
import Pretabla from "../components/vidrios/Pretabla"
import { useContext } from "react";
import { VidriosContext } from "../context/vidrios/VidriosContext";




const Vidrios = () => {

  const { isActiveBoton, isActiveBoton2 } = useContext(VidriosContext)


  return (
    <div className="container">
      <div className="row p-4">

        <div>
          <h2> Vidrios</h2>
        </div>

        <hr/>

        <div className="pt-4"></div>

          <div className="col-12 col-lg-6 ">
              <FormVidrios />
              {
                !isActiveBoton && isActiveBoton2 ?
                  <div className="pt-4 pb-4">
                      <Pretabla />
                  </div>
                :
                false
              }
              

          </div>

          <div className="col-12 col-lg-6">

              <Botones />

          </div>
          
      </div>

    </div>
  )
}

export default Vidrios