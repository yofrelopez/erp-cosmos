import { useContext } from 'react';
import { CuadrosContext } from "../../context/cuadros/CuadrosContext";



const PreTablaCuadro = () => {

    const { itemCuadro } = useContext(CuadrosContext);


  return (
    <>
        {
            itemCuadro ?

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Producto</th>
                    <th>Descripción</th>
                    
                    <th>P. Un.</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>

                </tr>
                </thead>

                <tbody>

                    <tr className="lead">
                        <td>{itemCuadro.producto}</td>
                        <td> {itemCuadro.descripcion} </td>
                        <td> {`S/.${(itemCuadro.pUnitario).toFixed(2)}`} </td>
                        <td ><p className='text-center'>{itemCuadro.cantidad}  </p> </td>                    
                        <td> {`S/.${(itemCuadro.subTotal).toFixed(2)}`} </td>

                    </tr>
                
                
                </tbody>


            </table>

            : false

        }
        

    </>
  )
}

export default PreTablaCuadro