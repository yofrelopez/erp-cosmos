import { FC } from "react";
import { ITarifarioVidrios } from "../../tarifarios/Vidrios";
import { useContext } from "react";
import { CrudContext } from "../../../context/crud/CrudContext";
import Swal from 'sweetalert2'



interface Props {
  item: ITarifarioVidrios;
}


const Filas:FC<Props> = ({item}) => {


  const { deleteTarifarioVidrios, setProductoParaActualizar } = useContext(CrudContext)

  const categoria = item?.categoria === 1 ? 'Vidrio' : 'Espejo'


  const handleDelete = (id: number | undefined) => {
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      
      confirmButtonText: 'Si, borrar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const borrar = await deleteTarifarioVidrios(id)
        if(borrar){
          Swal.fire(
            'Borrado!',
            'El registro ha sido borrado.',
            'success'
          ) 
        } else {
          Swal.fire(
            'Error!',
            'El registro no ha sido borrado.',
            'error'
          ) 
        }
        
      }
    })
  }

  const handleUpdate = (item: ITarifarioVidrios) => {
    setProductoParaActualizar(item)
  }


  return (

      <tr className="table align-middle">
        <th scope="row">{`${categoria} ${item?.nombre}`}</th>
        <td>{item?.espesor}</td>
        <td>{item?.color}</td>
        <td>{item?.textura}</td>
        <td>{`S/.${item?.costo}`}</td>
        <td>{`S/.${item?.venta}`}</td>
        <td>
          <button className="btn btn-warning btn-sm"
            onClick={()=>handleUpdate(item)}
          >
            Editar
          </button> |
          | <button onClick={()=>handleDelete(item?.id)}
              className="btn btn-danger btn-sm"
              type="button"
              >Borrar</button>
        </td>


      </tr>


  )
}

export default Filas
