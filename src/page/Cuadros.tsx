import FormCuadros from "../components/cuadros/FormCuadros"
import PreTablaCuadro from "../components/cuadros/PreTablaCuadro"




const Cuadros = () => {
  return (
    <div className="container py-4" style={{'padding':'0 50px'}}>

        <FormCuadros />
        <PreTablaCuadro />

    </div>
  )
}

export default Cuadros