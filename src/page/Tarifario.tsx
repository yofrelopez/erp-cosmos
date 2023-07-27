


import React from 'react'
import TarifarioVidrios from '../components/tarifarios/Vidrios'
import VistaTarifario from '../components/tablas/vistaTarifa/VistaTarifario'

const TarifarioPage: React.FC = () => {
  return (
    <div>
      <div className='row'>

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