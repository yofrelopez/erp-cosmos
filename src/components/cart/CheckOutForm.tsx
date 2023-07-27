import React, {useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';
import { ClienteContext } from '../../context/cliente/ClienteContext';
import { OrdenContext } from '../../context/invoice/OrdenContext';
import { CartContext } from '../../context/cart/CartContext';
import { v4 as uuidv4 } from 'uuid';



const CheackOutForm: React.FC = () => {

  const { cliente, setCliente, agregarCliente } = useContext(ClienteContext);

  const { agregarOrden, newOrden, setNewOrden, ordenItems, setOrdenItems, agregarOrdenItems } = useContext(OrdenContext);

  const { cart, totalCart, setCart } = useContext(CartContext);

  const [ isActivate , setIsActivate ] = useState<boolean>(false);


  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();
  const selectedDocumentType = watch('documentType');

  const onSubmit = async (data: any) => {
    console.log(data);

    if(data && !isActivate){
      const idOrden = uuidv4();
      setIsActivate(true);
      setCliente({
        id_cliente: data.clientId,
        tipo_doc: data.idType,
        nombres: data.firstName,
        apellidos: data.lastName,
        telefono: data.phone,
        email: data.email,
        direccion: data.address        
      });
      setNewOrden({
        id_orden: idOrden,
        id_cliente: data.clientId,
        ordenType: data.documentType,
        fechaEntrega: data.deliveryDate,
        estadoServicio: data.serviceStatus,
        estadoEntrega: data.deliveryStatus,
        estadoPago: data.paymentStatus,
        total: totalCart,
      });
      setOrdenItems({
        id_orden: idOrden,
        items: cart,
      })
    }

    if(isActivate && data){
      console.log('isActivate', isActivate);
      setIsActivate(false);
      console.log('cliente', cliente)
      await agregarCliente(cliente!)
      .then((res) => {
        if(res){
          agregarOrden(newOrden!)
          .then((res) => {
            if(res){
              agregarOrdenItems(ordenItems!)
              .then((res) => {
                if(res){
                  console.log('Todo ok');
                  reset();
                  setIsActivate(false);
                  setCart([]);
                  localStorage.removeItem('cart');
                }
              })
            }
          })
        }
      })

      
    }
  };

  const handleLimpiar = () => {
    console.log('limpiar');
    reset();
  }


  const handleCancelar = () => {
    setIsActivate(false);

  }


  return (
    <>
      <div className='p-4 d-flex py-2 align-items-center'>
        <FaUser className='mt-2' size='1.7em' />
        <h3 className='ps-3 pt-2 m-0'>Datos del cliente</h3>
      </div>

      <div className='p-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='row'>

          <div className="form-group mb-3 col-6">
            <label htmlFor="idType">Tipo de ID</label>
            <div>
              <select id='idType' disabled={isActivate} className="form-select form-select-lg" {...register('idType', { required: true })}>
                <option value='DNI'>DNI</option>
                <option value='RUC'>RUC</option>
                <option value='CE'>CE</option>
              </select>
            </div>
            {errors.idType && <span className="text-danger">Este campo es requerido</span>}
          </div>

          <div className="form-group col-6 mb-3">
            <label>ID</label>
            <input
              disabled={isActivate}
              type="text"
              className="form-control form-control-lg"
              {...register('clientId', { required: true })}
            />
            {errors.clientId && <span className="text-danger">Este campo es requerido</span>}
          </div>

          <div className='mb-3 col-6 d-grid'>
            <button disabled={isActivate} type="button" className="btn btn-outline-warning ">
              Validar ID
            </button>
          </div>
          <div className='mb-3 col-6 d-grid'>
            <button disabled={isActivate} type="button" className="btn btn-outline-info ">
              Limpiar Validación 
            </button>
          </div>


          <div className="form-group col-6 mb-3">
            <label>Nombres</label>
            <input
              disabled={isActivate}
              type="text"
              className="form-control form-control-lg"
              {...register('firstName', { required: true })}
            />
            {errors.firstName && <span className="text-danger">Este campo es requerido</span>}
          </div>

          <div className="form-group mb-3 col-6">
            <label>Apellidos</label>
            <input
              disabled={isActivate}
              type="text"
              className="form-control form-control-lg"
              {...register('lastName', { required: true })}
            />
            {errors.lastName && <span className="text-danger">Este campo es requerido</span>}
          </div>

          <div className="form-group mb-3">
            <label>Email</label>
            <input
              disabled={isActivate}
              type="email"
              className="form-control form-control-lg"
              {...register('email', { required: false, pattern: /^\S+@\S+$/i })}
            />
            {errors.email?.type === 'required' && (
              <span className="text-danger">Este campo es requerido</span>
            )}
            {errors.email?.type === 'pattern' && (
              <span className="text-danger">Ingrese un email válido</span>
            )}
          </div>

          <div className="form-group  mb-3">
            <label>Dirección</label>
            <input
              disabled={isActivate}
              type="text"
              className="form-control form-control-lg"
              {...register('address', { required: false })}
            />
            {errors.address && <span className="text-danger">Este campo es requerido</span>}
          </div>

          <div className="form-group mb-3 col-6">
            <label>Teléfono</label>
            <input
              disabled={isActivate}
              type="tel"
              className="form-control form-control-lg"
              {...register('phone', { required: true })}
            />
            {errors.phone && <span className="text-danger">Este campo es requerido</span>}
          </div>



          <div className="form-group mb-3 col-6">
            <label htmlFor="documentType">Tipo de documento</label>
            <div>
              <select id='documentType' disabled={isActivate} className="form-select form-select-lg" {...register('documentType', { required: true })}>
                <option value='Proforma'>Proforma</option>
                <option value='Contrato'>Contrato</option>
              </select>
            </div>
            {errors.documentType && <span className="text-danger">Este campo es requerido</span>}
          </div>




          {selectedDocumentType === 'Contrato' && (
            <>
              <div className="form-group mb-3 col-6">
                <label>Fecha de Entrega</label>
                <input
                  disabled={isActivate}
                  type="date"
                  className="form-control form-control-lg"
                  min={new Date().toISOString().split('T')[0]}
                  {...register('deliveryDate', { required: true })}
                />
                {errors.deliveryDate && <span className="text-danger">Este campo es requerido</span>}
              </div>

              <div className="form-group mb-3 col-6">
                <label>Estado del Servicio</label>
                <select className="form-select form-select-lg" disabled={isActivate} {...register('serviceStatus', { required: true })}>
                  <option value="Pendiente">Pendiente</option>
                  <option value="En-Proceso">En Proceso</option>
                  <option value="Terminado">Terminado</option>
                </select>
                {errors.serviceStatus && (
                  <span className="text-danger">Este campo es requerido</span>
                )}
              </div>

              <div className="form-group mb-3 col-6">
                <label>Estado de Entrega</label>
                <select className="form-select form-select-lg" disabled={isActivate} {...register('deliveryStatus', { required: true })}>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Entregado">Entregado</option>
                </select>
                {errors.deliveryStatus && (
                  <span className="text-danger">Este campo es requerido</span>
                )}
              </div>

              <div className="form-group mb-3 col-6">
                <label>Estado del Pago</label>
                <select className="form-select form-select-lg" disabled={isActivate} {...register('paymentStatus', { required: true })}>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Adelanto">Adelanto</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
                {errors.paymentStatus && (
                  <span className="text-danger">Este campo es requerido</span>
                )}
              </div>
            </>
          )}
          

          <div className='my-3 col-6'>
            <div className='d-grid'>
              {
                isActivate ?
                <button type="button" onClick={handleCancelar} className="btn btn-outline-warning btn-lg">
                  Cancelar
                </button>
                :
                <button type="button" onClick={handleLimpiar} className="btn btn-outline-warning btn-lg">
                  Limpiar Formulario
                </button>
              }
            </div>
          </div>

          <div className='my-3 col-6'>
            <div className='d-grid'>
              {
                isActivate ?
                <button type="submit" className="btn btn-outline-success btn-lg">
                  Guardar
                </button>
                :
                <button type="submit" className="btn btn-outline-primary btn-lg">
                  Continuar con la venta
                </button>
              }
              
            </div>            
          </div>




        </form>    
      </div>
    </>
  );
};

export default CheackOutForm;
