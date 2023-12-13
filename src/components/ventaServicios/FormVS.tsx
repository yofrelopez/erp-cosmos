



//formulario con bootstrap, typescript y react-hook-form, con los campos de la tabla ventaServicios
// los campos para llenar son: cantidad, descripción y precio unitario


import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';
import { CartContext } from '../../context/cart/CartContext';
import { IItem } from '../../interface/interfaces';



const FormVS = () => {

    const { addItem } = useContext(CartContext);

    const [ formVentaServicios, setFormVentaServicios ] = useState<IItem>({} as IItem);

    const [ subTotalEstado, setSubTotalEstado ] = useState(0);

    const [ calcularIsActive, setCalcularIsActive ] = useState(false)


    const { register, formState: { errors }, handleSubmit, reset } = useForm<IItem>({

        defaultValues: {
            producto: '',
            cantidad: 0,
            descripcion: '',
            pUnitario: 0,
            subTotal: 0
        }
    });

    const onSubmit = (data: IItem) => {
        setFormVentaServicios({
            ...data,
            subTotal: Number(data.cantidad) * Number(data.pUnitario)
        })
        setCalcularIsActive(true)
        setSubTotalEstado(data.cantidad * data.pUnitario)
    }


    const handleReset = () => {
        reset({
            producto: '',
            cantidad: 0,
            descripcion: '',
            pUnitario: 0,
            subTotal: 0
        })
        setCalcularIsActive(false)
        setFormVentaServicios({} as IItem)
        setSubTotalEstado(0);

    }

    const handleCancelar = () => {

        reset({
            ...formVentaServicios
        })
        setCalcularIsActive(false)
    }


    const handleEnviar = () => {

        const uid = uuidv4()
        addItem({...formVentaServicios, id: uid, pUnitario: Number(formVentaServicios.pUnitario)})

            


        console.log(formVentaServicios);

        reset({
            producto: '',
            cantidad: 0,
            descripcion: '',
            pUnitario: 0,
            subTotal: 0
        })

        setCalcularIsActive(false)
        setSubTotalEstado(0)

    }





  return (
    <div className='container pt-4'>
        <form onSubmit={handleSubmit(onSubmit)} >

            <fieldset disabled={calcularIsActive} className="row g-3"> 

            <div className="col-12 col-md-6">
                <label htmlFor="producto" className="form-label">Producto</label>
                <div className="mb-3">
                    <input type="text"
                            id="producto"
                            className="form-control form-control-lg"
                            aria-describedby="producto"
                           {...register('producto',{
                            })}
                            /* onChange={()=>setIsActiveBoton(true)} */

                    />
                </div>
                {errors.producto && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
            </div>


            <div className="col-12 col-md-6">
                <label htmlFor="cantidad" className="form-label">Cantidad</label>
                <div className="input-group mb-3">
                    <input type="number"
                            id="cantidad"
                            className="form-control form-control-lg"
                            aria-describedby="largo"
                            {...register('cantidad',{
                                required: 'Este campo es requerido',
                                validate: value => value > 0 || 'El valor debe ser mayor que 0'
                            })}
                            /* onChange={()=>setIsActiveBoton(true)} */

                        />
                    <span className="input-group-text" id="cantidad">Und.</span>
                </div>
                {errors.cantidad && <p className='alert alert-danger p-1'><small>{errors.cantidad.message}</small></p>}
            </div>



            <div className="col-12">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <div className="mb-3">
                    <textarea   id="descripcion"
                                className="form-control form-control-lg"
                                aria-describedby="descripcion"
                                {...register('descripcion',{
                                    required: 'Este campo es requerido',
                                })}
                                /* onChange={()=>setIsActiveBoton(true)} */
                    ></textarea>
                </div>
                {errors.descripcion && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
            </div>




            <div className="col-12">
                <label htmlFor="pUnitario" className="form-label">Precio</label>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="pUnitario">S/.</span>

                    <input type="number"
                            id="pUnitario"
                            step="any"
                            className="form-control form-control-lg"
                            aria-describedby="pUnitario"
                            {...register('pUnitario',{
                                required: 'Este campo es requerido',
                            })}
                            /* onChange={()=>setIsActiveBoton(true)} */

                    />
                    
                </div>
                {errors.pUnitario && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
            </div>


            <div className="col-12">
                <label htmlFor="subTotal" className="form-label">Subtotal</label>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="subTotal">S/.</span>

                    <input type="number"
                            disabled
                            id="subTotal"
                            step="any"
                            className="form-control form-control-lg"
                            aria-describedby="subTotal"
                            value={subTotalEstado}

                            /* onChange={()=>setIsActiveBoton(true)} */

                    />
                    
                </div>
            </div>

            </fieldset>





            <div className='row g-3 pb-4'>

                <div className="d-grid col-6 py-4">
                    <button type="button" onClick={handleReset} className="btn btn-outline-warning">Reset</button>
                </div>
                <div className="d-grid col-6 py-4">
                    {
                        calcularIsActive ?
                        <div className='row g-2'>
                            <div className='d-grid col-6'>
                                <button type="button" onClick={handleCancelar} className="btn btn-outline-info" >Cancelar</button>
                            </div>
                            <div className='d-grid col-6'>
                                <button type="button" onClick={handleEnviar} className="btn btn-outline-success" >Enviar</button>
                            </div>
                        </div>
                        :
                        <button type="submit" className="btn btn-outline-primary" >Calcular</button>
                        
                    }

                </div>
                
            </div>





        </form>

    </div>
  )
}

export default FormVS


