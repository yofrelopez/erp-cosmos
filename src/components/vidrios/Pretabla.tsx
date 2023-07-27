import { useContext, useEffect } from 'react';
import { VidriosContext } from '../../context/vidrios/VidriosContext';
import { v4 as uuidv4 } from 'uuid';

import { CartContext } from '../../context/cart/CartContext';
import { IItem } from '../../interface/interfaces';





const Pretabla = () => {

  const { vidrioCliente, preFt2, setIsActiveReset, setIsActiveBoton, setIsActiveBoton2, setPreFt2  } = useContext(VidriosContext)

  const { especificaciones, medidas, precioUnitario, precioSubTotal} = vidrioCliente || {}

  const { nombre, color, textura, espesor } = especificaciones || {}

  const { largo, alto, cantidad} = medidas || {}

  const catg = especificaciones?.categoria === 1 ? 'Vidrio' : 'Espejo'

  const { addItem, nuevoItem, setNuevoItem} = useContext(CartContext)





  const handleAddItem = () => {

    const item:IItem = {
      id: uuidv4() ,
      producto: catg,
      descripcion: `${nombre} ${espesor} ${color} ${textura} ${medidas?.largo} x ${medidas?.alto}`,
      pUnitario: precioUnitario ? precioUnitario : 0 ,
      cantidad: cantidad ? cantidad : 0,
      subTotal: precioSubTotal ? precioSubTotal : 0,
    }

    setNuevoItem(item)
    setIsActiveReset(true)
    
  }

  useEffect(() => {
    if(nuevoItem){
      addItem(nuevoItem)
    }
  }, [nuevoItem])


  const handleReset = () => {
    setNuevoItem(null)
    setIsActiveReset(true)
    setPreFt2(0)
    setIsActiveBoton(true)
    setIsActiveBoton2(false)
  }


  return (
    <>
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Medida</th>
          <th scope="col">Producto</th>
          <th scope="col">Ft2</th>
          <th scope="col">P. Uni.</th>
          <th scope="col">Cant.</th>
          <th scope="col">Subtotal</th>
        </tr>
      </thead>

      <tbody>
        <tr className="table align-middle">
          <td > {`${largo} x ${alto}`} </td>
          <td > {`${catg} ${nombre} ${espesor} ${color} ${textura}`} </td>
          <td > {preFt2.toFixed(2)} </td>
          <td > {`S/.${precioUnitario?.toFixed(2)}`} </td>
          <td> {cantidad} </td>
          <td> {`S/.${precioSubTotal?.toFixed(2)}`} </td>
        </tr>
      </tbody>
     
      
    </table>

    <div className='row'>

      

      <div className='d-grid col-6'>
        <button className='btn btn-outline-danger' type='button' onClick={handleReset} >Cancelar</button>
      </div>


      <div className='d-grid col-6'>
        <button type='button' onClick={handleAddItem} className='btn btn-outline-primary'>Enviar</button>
      </div>

      
    </div>
      
    </>
  )
}

export default Pretabla