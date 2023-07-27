
import { useContext } from "react";
import { CartContext } from "../../context/cart/CartContext";
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { IItem } from "../../interface/interfaces";
import { FC } from 'react';
import Swal from "sweetalert2";


interface Props {
    item: IItem;
}



const ListCart:FC<Props> = ({item}) => {

  

  const { eliminarItem, updateCantidad } = useContext(CartContext);



  const deleteItem = () => {
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarItem(item.id)
        Swal.fire(
          'Borrado!',
          'El registro ha sido borrado.',
          'success'
        )
      }
    })
  }
  
  const actualizarCantidad = ( operador: number ) => {
    if (item.cantidad === 1 && operador === -1) {
      return;
    }
    
    const cantidad = Number(item.cantidad) + operador;
    updateCantidad(item.id, cantidad);
    
  }



  return (
    <tr className="lead">
            <td>{item.producto}</td>
            <td> {item.descripcion} </td>
            <td> {`S/.${(item.pUnitario).toFixed(2)}`} </td>
            <td >
              <div className="d-flex alig-center">
                
                <div onClick={()=>actualizarCantidad( -1 )} style={{ 'cursor': 'pointer' }}><AiOutlineMinusCircle size={20}/> </div>
                <p className="px-2">{item.cantidad}</p>

                <div onClick={()=>actualizarCantidad( +1 )} style={{ 'cursor': 'pointer' }}>
                  <AiOutlinePlusCircle size={20}/> </div>
               </div>
            </td>
            
            <td> {`S/.${(item.subTotal).toFixed(2)}`} </td>

            <td>
              <div className="d-flex justify-content-center" onClick={deleteItem} style={{ 'cursor': 'pointer' }}>
                  <AiOutlineCloseCircle size={20} color='red' />
               </div>
            </td>
    </tr>
  )
}

export default ListCart