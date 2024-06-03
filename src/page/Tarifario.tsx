
import TarifarioVidrios from '../components/tarifarios/Vidrios'
import VistaTarifario from '../components/tablas/vistaTarifa/VistaTarifario'

const TarifarioPage = () => {
  return (
    <div className='container'>
      <div className='row container pt-4'>

        <div className='col-5'>
          <TarifarioVidrios />
        </div>

        <div className='col-7'>
          <VistaTarifario />
        </div>


      </div>


    </div>
  )
}

export default TarifarioPage