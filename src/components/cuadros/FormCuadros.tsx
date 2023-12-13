import { useState, useContext } from 'react';
import { CuadrosContext } from '../../context/cuadros/CuadrosContext';
import { CartContext } from '../../context/cart/CartContext';
import { useForm } from 'react-hook-form';
import { ICuadro } from '../../interface/interfaces';
import { v4 as uuidv4 } from 'uuid';



const FormCuadros = () => {


    const { addItem } = useContext(CartContext)

    const { calcularCuadro, itemCuadro, setItemCuadro } = useContext(CuadrosContext)

    const [ fondoIsActive, setFondoIsActive ] = useState(false)

    const [ calcularIsActive, setCalcularIsActive ] = useState(false)

    const [ precioEspecialIsActive, setPrecioEspecialIsActive ] = useState(false)

    const [ formCuadroTemporal, setFormCuadroTemporal ] = useState<ICuadro>({} as ICuadro)
    

    const { register, formState: { errors }, handleSubmit, reset } = useForm<ICuadro>({

        defaultValues: {
            largo: 0,
            alto: 0,
            cantidad: 1,
            margen: 'directo',
            fondoTipo: '',
            fondoColor: '',
            vidrio: 'simple',
            molduraEspesor: 'media',
            molduraTextura: '',
            precioEsepcial: 0,
            molduraColor: '',
            nordexEspaldar: false,
            parante: false,
        }
    });

    const onSubmit = async (data: ICuadro) => {
        if( data.largo > 0 && data.alto > 0 && data.cantidad > 0 ){
            console.log('on submit')

            setFormCuadroTemporal(data)
            calcularCuadro(data)
            setCalcularIsActive(!calcularIsActive)
            
        }
    }

    const handleFondo = () => {
        setFondoIsActive(!fondoIsActive)
        reset({
            fondoTipo: '',
            fondoColor: '',
        })

    }

    const handleCancelar = () => {

        setCalcularIsActive(false)
        reset({
            ...formCuadroTemporal
        })
        setItemCuadro(null)
    }

    const handleReset = () => {
        reset({
            largo: 0,
            alto: 0,
            cantidad: 1,
            margen: 'directo',
            fondoTipo: '',
            fondoColor: '',
            vidrio: 'simple',
            molduraEspesor: 'media',
            molduraTextura: '',
            precioEsepcial: 0,
            molduraColor: '',
            nordexEspaldar: false,
            parante: false,
        })

        setFormCuadroTemporal({} as ICuadro)
        setFondoIsActive(false)
    }

    const handleEnviar = () => {
        const uid = uuidv4()

        if( itemCuadro !== null ){
            addItem({...itemCuadro, id: uid})
            setCalcularIsActive(false)
            setFondoIsActive(false)
            setFormCuadroTemporal({} as ICuadro)
            setItemCuadro(null)
            reset({
                largo: 0,
                alto: 0,
                cantidad: 1,
                margen: 'directo',
                fondoTipo: '',
                fondoColor: '',
                vidrio: 'simple',
                molduraEspesor: 'media',
                molduraTextura: '',
                precioEsepcial: 0,
                molduraColor: '',
                nordexEspaldar: false,
                parante: false,
            })
        }
        
    }




  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)} >
        <fieldset disabled={calcularIsActive} className="row g-3">  


            <legend className="text-body-tertiary">Medidas</legend>
            

            <div className="col-6 col-md-4">
                <label htmlFor="largo" className="form-label">Largo</label>
                <div className="input-group mb-3">
                    <input type="number"
                            id="largo"
                            step="any"
                            className="form-control form-control-lg"
                            aria-describedby="largo"
                           {...register('largo',{
                                required: 'Este campo es requerido',
                                validate: value => value > 0 || 'El valor debe ser mayor que 0'
                            })}
                            /* onChange={()=>setIsActiveBoton(true)} */

                    />
                    <span className="input-group-text" id="largo">cm</span>
                </div>

                {errors.largo  && <p className='alert alert-danger p-1'><small>{errors.largo.message}</small></p>}



                
            </div>


            <div className="col-6 col-md-4">
                <label htmlFor="alto" className="form-label">Alto</label>
                <div className="input-group mb-3">
                    <input type="number"
                            id="alto"
                            step="any"
                            className="form-control form-control-lg"
                            aria-describedby="largo"
                            {...register('alto',{
                                required: 'Este campo es requerido',
                                validate: value => value > 0 || 'El valor debe ser mayor que 0'
                            })}
                            /* onChange={()=>setIsActiveBoton(true)} */

                    />
                    <span className="input-group-text" id="alto">cm</span>
                </div>
                {errors.alto && <p className='alert alert-danger p-1'><small>{errors.alto.message}</small></p>}
            </div>


            <div className="col-6 col-md-4">
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







            <legend className="text-body-tertiary">Tipo de Fondo</legend>




            <div className="col-6 col-md-3">
                <label htmlFor="margen" className="form-label">Margen</label>
                <div className=" mb-3">
                    <select id="margen"
                            className="form-select form-select-lg"
                            
                            {...register('margen', {
                                required: true
                            })}
                            onChange={handleFondo}

                        >
                        <option value='directo'>Directo</option>
                        <option value='fondo'>Fondo</option>

                    </select>
                </div>
                {/* {errors.descuento && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>} */}
            </div>

            <div className="col-6 col-md-3">
                <label htmlFor="fondoTipo" className="form-label">Tipo de Fondo</label>
                <div className=" mb-3">
                    <select id="fondoTipo"
                            className="form-select form-select-lg"
                            disabled={!fondoIsActive}
                            {...register('fondoTipo', {
                                required: fondoIsActive
                            })}
                            /* onChange={()=>setIsActiveBoton(true)} */

                        >
                        <option value='cartulina'>Cartulina</option>
                        <option value='vidrio'>Vidrio</option>
                        <option value='paspartu-nordex'>Paspartu Nordex</option>

                    </select>
                </div>
                {errors.fondoTipo && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
            </div>


            <div className="col-6 col-md-3">
                <label htmlFor="fondoColor" className="form-label">Color</label>
                <div className="mb-3">
                    <input type="text"
                            id="fondoColor"
                            className="form-control form-control-lg"
                            aria-describedby="fondoColor"
                            disabled={!fondoIsActive}
                           {...register('fondoColor',{
                                required: fondoIsActive
                            })}
                            /* onChange={()=>setIsActiveBoton(true)} */

                    />
                </div>
                {errors.fondoColor && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
            </div>



            <div className="col-6 col-md-3">
                <label htmlFor="vidrio" className="form-label">Vidrio</label>
                <div className="mb-3">
                    <select id="vidrio"
                            className="form-select form-select-lg"
                            {...register('vidrio', {
                                required: true
                            })}
                            /* onChange={()=>setIsActiveBoton(true)} */

                        >
                        <option value='simple'>Simple</option>
                        <option value='mate'>Mate</option>

                    </select>
                </div>
                {/* {errors.descuento && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>} */}
            </div>








            <legend className="text-body-tertiary">Moldura Principal</legend>



            <div className="col-6 col-md-3">
                <label htmlFor="molduraEspesor" className="form-label">Espesor</label>
                <div className=" mb-3">
                    <select id="molduraEspesor"
                            className="form-select form-select-lg"
                            {...register('molduraEspesor', {
                                required: true
                            })}
                            /* onChange={()=>setIsActiveBoton(true)} */

                        >
                        <option value='media'>1/2"</option>
                        <option value='tres-cuartos'>3/4"</option>
                        <option value='una-pulgada'>1"</option>
                        <option value='pulgada-media'>1 1/2"</option>
                        <option value='dos-pulgadas'>2"</option>

                    </select>
                </div>
                {/* {errors.descuento && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>} */}
            </div>

            <div className="col-6 col-md-3">
                <label htmlFor="molduraTextura" className="form-label">Textura</label>
                <div className=" mb-3">
                    <select id="molduraTextura"
                            className="form-select form-select-lg"
                            {...register('molduraTextura', {
                                required: true
                            })}
                            /* onChange={()=>setIsActiveBoton(true)} */

                        >
                        <option value='plano'>Plano</option>
                        <option value='plano-filo'>Plano con Filo</option>
                        <option value='redondo'>Redondo</option>
                        <option value='redondo-filo'>Redondo con Filo</option>
                        <option value='pan-de-oro'>Pan de Oro</option>
                        <option value='marmol'>Marmol</option>

                    </select>
                </div>
                {errors.molduraTextura && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
            </div>            








            <div className="col-6 col-md-3">
                <label htmlFor="molduraColor" className="form-label">Color</label>
                <div className="mb-3">
                    <input type="text"
                            id="molduraColor"
                            className="form-control form-control-lg"
                            aria-describedby="molduraColor"
                           {...register('molduraColor',{
                                required: true
                            })}
                            /* onChange={()=>setIsActiveBoton(true)} */

                    />
                </div>
                {errors.molduraColor && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
            </div>



            <div className="col-6 col-md-3">
                <label htmlFor="precioEsepcial" className="form-label">Precio Especial</label>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="precioEsepcial">S/.</span>

                    <input type="number"
                            id="precioEsepcial"
                            step="any"
                            className="form-control form-control-lg"
                            disabled={!precioEspecialIsActive}
                            aria-describedby="precioEsepcial"
                           {...register('precioEsepcial',{
                                required: false
                            })}
                            /* onChange={()=>setIsActiveBoton(true)} */

                    />
                    
                </div>
                {/* {errors.largo && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>} */}
            </div>













            <div className="col-6 col-md-4 pb-3">
                <label htmlFor="nordexEspaldar" className="form-label">Nordex Espaldar</label>
                <div className="form-check form-switch my-switch-container ms-4 mt-2">
                    <input className="form-check-input my-switch"
                            type="checkbox"
                            role="switch"
                            id="nordexEspaldar" 
                            {...register('nordexEspaldar', {  required: false })}
                            /* onChange={()=>setIsActiveBoton(true)} */

                        />
                </div>
                {/* {errors.pulido && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>} */}
            </div>


            <div className="col-6 col-md-4 pb-3" >
                <label htmlFor="parante" className="form-label">Parante</label>
                <div className="form-check form-switch my-switch-container ms-4 mt-2">
                    <input className="form-check-input my-switch"
                            type="checkbox"
                            role="switch"
                            id="parante" 
                            {...register('parante', {  required: false })}
                           /*  onChange={()=>setIsActiveBoton(true)} */

                        />
                </div>
                {/* {errors.biselado && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>} */}
            </div>


            <div className="col-6 col-md-4 pb-3" >
                <label htmlFor="activePrecio" className="form-label">Activar Precio Especial</label>
                <div className="form-check form-switch my-switch-container ms-4 mt-2">
                    <input className="form-check-input my-switch"
                            type="checkbox"
                            role="switch"
                            id="activePrecio"
                            onClick={ ()=> setPrecioEspecialIsActive(!precioEspecialIsActive) } 
                           /*  onChange={()=>setIsActiveBoton(true)} */

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

    </>
  )
}

export default FormCuadros