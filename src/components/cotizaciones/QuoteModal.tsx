import React, { useState, ReactNode, useEffect, useContext } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { modalQuote } from '../../interface/interfaces';
import { supabase } from '../../supabase/client';
import { AuthContext } from '../../context/auth/AuthContext';
import { generatePDF } from '../../utils/pdfGenerator';
import { QuoteProducts } from '../../interface/interfaces';
import { clientContact } from '../../interface/interfaces';
import { FaBox, FaCalendarCheck, FaCircleNotch, FaFileContract } from 'react-icons/fa';

import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import Observacion from './Observacion';
import { OrdenContext } from '../../context/invoice/OrdenContext';




interface QuoteModalProps {
  buttonLabel: ReactNode;
  className?: string;
  quote: modalQuote;
  contactClient?: clientContact;
}

interface OrderProps {
  ordenType: string;
  estadoServicio: string;
  estadoEntrega: string;
  fechaEntrega: string;
}



const QuoteModal: React.FC<QuoteModalProps> = ({ buttonLabel, className, quote }) => {

  const { isLoggedIn } = useContext(AuthContext)

  const { observaciones } = useContext(OrdenContext) // 

  const [products, setProducts] = useState<QuoteProducts[] | [] >([])

  const [contact, setContact] = useState<clientContact | undefined>(undefined)

  const [order, setOrder] = useState<OrderProps | null>(null)

  const [editarActivo, setEditarActivo] = useState<boolean>(false)

  const [modal, setModal] = useState(false);



  const toggle = () => {

    setModal(!modal);
    if(editarActivo === true){
      setEditarActivo(false)
    }  
  }



  const fetchData = async () => {
    //hacer una consulta a supabase para traer los productos que coicidan con la columna id_orden de la tabla ordenes
    // los productos están en la tabla items_orden tienen un id_orden y tienen la clave foranea id_orden de la orden igual al quote.id_orden
    // la data que se trae de supabase es un array de objetos, cada objeto es un producto del tipo IItem
    const { data, error } = await supabase
      .from('items_orden')
      .select('*')
      .eq('id_orden', quote.id_orden)
    if (error) {
      console.log(error)
      return
    }
    setProducts(data as QuoteProducts[])
  }

  // hacer una consulta a supabase para traer de la tabla cientes, el telefono, el email y la direccion del cliente que coincida con el id_cliente de la tabla ordenes
  const fetchContact = async () => {

    const { data, error } = await supabase
      .from('clientes')
      .select('telefono, email, direccion')
      .eq('id_cliente', quote.id_cliente)
    if (error) {
      console.log(error)
      return
    }
    setContact(data?.[0] as clientContact)
  }

  // hacer una consulta a supabase para traer de la tabla "ordenes", el ordenType,
  // el estadoServicio, el estadoEntrega y la fechaEntregan de la orden que coincida con el id_orden de la tabla ordenes
  
    const fetchOrder = async () => {

      const { data, error } = await supabase
        .from('ordenes')
        .select('ordenType, estadoServicio, estadoEntrega, fechaEntrega')
        .eq('id_orden', quote.id_orden)
      if (error) {
        console.log(error)
        return
      }

      setOrder(data?.[0] as OrderProps)
    }


    // Form

    const { register, reset, handleSubmit, formState: { errors } } = useForm<OrderProps>({

        defaultValues: {
          ordenType: order?.ordenType,
          estadoServicio: order?.estadoServicio,
          estadoEntrega: order?.estadoEntrega,
          fechaEntrega: order?.fechaEntrega

        }
    });

    const onSubmit = async (data: OrderProps) => {

      console.log('Data del UseForm:', data)

      Swal.fire({
        title: 'Estas seguro?',
        text: "No podras revertir esta accion!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardar!'
      }).then(async (result) => {
        // hacer un update a la tabla ordenes, donde el id_orden sea igual al quote.id_orden
      // y actualizar los campos ordenType, estadoServicio, estadoEntrega y fechaEntrega con los datos del formulario
        if (result.isConfirmed) {
            if(data !== order){
              const { error } = await supabase
                .from('ordenes')
                .update({
                  ordenType: data.ordenType,
                  estadoServicio: data.estadoServicio,
                  estadoEntrega: data.estadoEntrega,
                  fechaEntrega: data.fechaEntrega
                })
                .eq('id_orden', quote.id_orden)
              if (error) {
                console.log(error)
                return
              }
              setEditarActivo(false)
              fetchOrder()
            } else {
              console.log('No hay cambios')
            }
        }
      })     

    }




    const cancelarEdicion = () => {
      console.log('cancelar edicion')
      setEditarActivo(false)
    }




  
  
  useEffect(() => {
    if(isLoggedIn){
      fetchData()
      fetchContact()
      fetchOrder()
    }
  }, [isLoggedIn])

  useEffect(() => {
    if(order){
      reset({
        ordenType: order.ordenType,
        estadoServicio: order.estadoServicio,
        estadoEntrega: order.estadoEntrega,
        fechaEntrega: order.fechaEntrega
      })
    }
  }, [order])

  const date = new Date(quote.created_at)
  

  return (
    <div>
      <Button className='btn-sm' color="light" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} size='xl' className={className}>
        <ModalHeader toggle={toggle}>{`${quote.ordenType} ID: ${quote.id_serie}`}</ModalHeader>
        <ModalBody>
          <h5>Información del Cliente</h5>
          <div className='row d-flex'>
            <p className='col-6 mb-0'> <b>Nombre:</b> {quote.nombres} {quote.apellidos}</p>
            <div className='d-flex col-6 mb-0'>
              <p className='pe-4 mb-0'><b>DNI/RUC: </b>{quote.id_cliente}  </p>
              <p className='mb-0'><b>Teléfono: </b> {contact?.telefono}</p>
            </div>
            <div className='d-flex col-6'>
              <p><b>Email: </b> {contact?.email}</p>
            </div>
            <div className='col-6'>
              <p className='mb-0'><b>Dirección: </b> {contact?.direccion}</p>
              <p className='col-6' > <b>Fecha: </b> {date.toLocaleString()}</p>
            </div>
          </div>

          <div className='container py-4 bg-body-tertiary'>

            {
              editarActivo === true && (
                <form  onSubmit={handleSubmit(onSubmit)}>
                  <div className='row'>


                    <div className='col-6'>
                      <div className="form-group mb-3 col-6">
                        <label htmlFor="ordenType">Tipo de documento</label>
                        <div>
                          <select id='ordenType' className="form-select" {...register('ordenType', { required: true })}>
                            <option value='Proforma'>Proforma</option>
                            <option value='Contrato'>Contrato</option>
                          </select>
                        </div>
                        {errors.ordenType && <span className="text-danger">Este campo es requerido</span>}
                      </div>
                    </div>




                    <div className='col-6'>
                      <div className="form-group mb-3 col-6">
                        <label htmlFor='estadoServicio'>Estado del Servicio</label>
                        <select className="form-select" {...register('estadoServicio', { required: true })}>
                          <option value="Pendiente">Pendiente</option>
                          <option value="En-Proceso">En Proceso</option>
                          <option value="Terminado">Terminado</option>
                        </select>
                        {errors.estadoServicio && (
                          <span className="text-danger">Este campo es requerido</span>
                        )}
                      </div>
                    </div>






                    <div className='col-6'>
                      <div className="form-group mb-3 col-6">
                        <label htmlFor='estadoEntrega'>Estado de Entrega</label>
                        <select className="form-select" {...register('estadoEntrega', { required: true })}>
                          <option value="Pendiente">Pendiente</option>
                          <option value="Entregado">Entregado</option>
                        </select>
                        {errors.estadoEntrega && (
                          <span className="text-danger">Este campo es requerido</span>
                        )}
                      </div>
                    </div>





                    <div className='col-6'>
                    <div className="form-group mb-3 col-6">
                      <label htmlFor='fechaEntrega'>Fecha de Entrega</label>
                      <input
                        type="date"
                        className="form-control"
                        min={new Date().toISOString().split('T')[0]}
                        {...register('fechaEntrega', { required: true })}
                      />
                      {errors.fechaEntrega && <span className="text-danger">Este campo es requerido</span>}
                    </div>
                    </div>






                  </div>

                  <div className='d-flex justify-content-center pt-4'>
                    <button type='submit' className='btn btn-outline-warning btn-sm me-4'>Guardar</button>
                    <button type='button' onClick={cancelarEdicion} className='btn btn-outline-info btn-sm me-4'>Cancelar</button>
                  </div>


                </form>
              )
            }

            {
              editarActivo === false && (
                <div className='row gx-5'>
                  <div className='col'>
                  <FaFileContract className="text-warning"/><span> {order?.ordenType} </span>
                  </div>
                  <div className='col'>
                  <FaCircleNotch className="text-warning" /> <span>{order?.estadoServicio}</span>
                  </div>
                  <div className='col'>
                  <FaBox className="text-warning" /> <span>{order?.estadoEntrega}</span> 
                  </div>
                  <div className='col'>
                  <FaCalendarCheck className="text-warning" /> <span>{order?.fechaEntrega}</span>
                  </div> 
                </div>

              )
            }




            <div className='d-flex justify-content-center pt-4'>
              {
                editarActivo === false &&
                <button
                  type='button'
                  className='btn btn-outline-primary btn-sm me-4'
                  onClick={() => setEditarActivo(true)}                  
                  >Editar</button>
              }    

            </div>


          </div>

          <div className='pt-4'>
            <h5>Productos</h5>

          </div>
          <Table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Descripción</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {
                products.length === 0 ?
                 <tr><td colSpan={5}>No hay productos</td></tr>
                :
                products?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.producto}</td>
                    <td>{item.descripcion}</td>
                    <td>{`S/.${item.p_unitario.toFixed(2)}`}</td>
                    <td>{item.cantidad}</td>
                    <td>{`S/.${item.subtotal.toFixed(2)}`}</td>
                  </tr>
              ))}
            </tbody>
          </Table>
          <Observacion quote={quote}/>
        </ModalBody>
        <ModalFooter className='d-flex justify-content-between'>
          
          <Button color="warning" onClick={toggle}>Cerrar</Button>
          <Button color="primary" onClick={() => generatePDF({ observaciones: observaciones ? observaciones : [] }, quote, products, contact)}>Descargar PDF</Button>
          <h5>Total: S/.{quote.total.toFixed(2)}</h5>
        </ModalFooter>        
        
      </Modal>
    </div>
  );
}

export default QuoteModal;
