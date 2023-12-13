import { useContext, useEffect } from "react";
import { CrudContext } from "../../context/crud/CrudContext";
import { VidriosContext } from "../../context/vidrios/VidriosContext";
import Boton from "./Boton";
import NavbarTarifas from "./NavbarTarifas";

const Botones = () => {

  const { tarifarioVidrios, getTarifarioVidrios } = useContext(CrudContext);

  const { activeMenuBotones } = useContext(VidriosContext);

  useEffect(() => {
    getTarifarioVidrios(activeMenuBotones);
  }, [activeMenuBotones]);

  return (
    <>
      <div className="row sm-container">
        <div className="pt-4 pt-lg-0 pb-2">
            <NavbarTarifas />



        </div>

        <div className="d-flex flex-wrap px-0 px-sm-2 justify-content-center justify-content-sm-start ">
          {tarifarioVidrios?.map((vidrio) => (
            <Boton key={vidrio?.id} vidrio={vidrio} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Botones;
