

import { useForm } from "react-hook-form";
import { useEffect, useState, useContext } from 'react';
import { supabase } from '../../supabase/client'
import { CrudContext } from "../../context/crud/CrudContext";

export interface ITarifarioVidrios {
    categoria: number;
    nombre: string;
    code: string;
    espesor: string;
    color: string;
    textura: string;
    costo: number;
    venta: number;
    id?: number;
}

const initialValues: ITarifarioVidrios = {
    categoria: 0,
    nombre: '',
    code: '',
    espesor: '',
    color: '',
    textura: '',
    costo: 0,
    venta: 0
}



const TarifarioVidrios  = () => {

    const { productoParaActualizar, updateTarifarioVidrios, setProductoParaActualizar,
            setEscucharCambios } = useContext(CrudContext);

    const [categoria, setCategoria] = useState<number>(1)

    const [formData, setFormData] = useState<ITarifarioVidrios | null>(null)

    const [loading, setLoading] = useState<boolean>(false)

    const { register, reset, handleSubmit, formState: { errors } } = useForm<ITarifarioVidrios>({
        defaultValues: {
            categoria: 0,
            nombre: '',
            code: '',
            espesor: '',
            color: '',
            textura: '',
            costo: 0.00,
            venta: 0.00
        }
    });

    const onSubmit = async (data: ITarifarioVidrios) => {
        setLoading(true)
        console.log(data)
        setFormData(data)    
    } 

    const cancelar = () => {
        setProductoParaActualizar(null)
        setFormData(null)
        reset(initialValues)
    }


    const actualizarProducto = async (data: ITarifarioVidrios) => {
        setLoading(true)
        const actualizando = await updateTarifarioVidrios(data)
        if(actualizando) {
            setLoading(false)
            setProductoParaActualizar(null)
            setFormData(null)
            reset(initialValues)
            console.log('Se reseteó el formulario')
        }else {
            console.log('No se actualizó el formulario')
        }
    }


    useEffect(() => {
        if(formData) {
            //conectarse con supabase para registrar los datos en la tabla productos
            
            const registrarDatos = async () => {              
            
                const { categoria, nombre, code, espesor, color, textura, costo, venta } = formData
                const { data, error } = await supabase
                .from('productos')
                .insert([
                    { categoria, nombre, code, espesor, color, textura, costo, venta },
                ])
                console.log(data, error)
                setLoading(false)
                setFormData(null)
                setEscucharCambios(true)
                reset()
            
            }
            registrarDatos()
        }
    }, [formData])

   // escuchar cambios en el campo de categorias




    useEffect(() => {
        if(productoParaActualizar) {
            reset(productoParaActualizar)
            console.log('se cargó actualizar')
        }
    }, [productoParaActualizar])

    


  return (

    <> 

        <form onSubmit={handleSubmit(onSubmit)} className="row g-3">

            <div className="col-md-4">
                <label htmlFor="inputEmail4" className="form-label">Categoría</label>
                <select className="form-select" {...register('categoria',{
                    // onchage para signar valor al estado de categoria
                    onChange: (e) => setCategoria(parseInt(e.target.value)),
                    required: true
                })}>
                    <option value='1'>Vidrio</option>
                    <option value='2'>Espejo</option>
                    <option value='3'>Ventana</option>
                    <option value='4'>Puerta</option>
                    <option value='5'>Moldura</option>
                    <option value='6'>Aglomerados</option>
                </select>

                {
                    errors.categoria && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>
                }
      

            </div>

            <div className="col-md-4">
                <label htmlFor="inputPassword4" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" {...register('nombre',{
                    required: true
                })} />
                {errors.nombre && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
            </div>

            <div className="col-4">
                <label htmlFor="inputAddress" className="form-label">Code</label>
                <input type="text" className="form-control" id="code" {...register('code', {
                    required: true
                })} />
                {errors.code && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
            </div>
            {/* codicionar div dependiento del valor de categoria */}
            {
                categoria === 1 || categoria === 2 || categoria === 3 ?
                (
                <div className="col-4">
                    <label htmlFor="inputAddress2" className="form-label">Espesor</label>
                    <select id="espesor" className="form-select" {...register('espesor', {
                        required: true
                    })}>
                        <option value='2mm'>2mm</option>
                        <option value='3mm'>3mm</option>
                        <option value='4mm'>4mm</option>
                        <option value='5mm'>5mm</option>
                        <option value='5.5mm'>5.5mm</option>
                        <option value='6mm'>6mm</option>
                        <option value='8mm'>8mm</option>
                        <option value='10mm'>10mm</option>
                    </select>
                    {errors.espesor && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
                </div>
                ) 
                : false
            }
            {
                categoria === 5 ?
                (
                <div className="col-4">
                    <label htmlFor="inputAddress2" className="form-label">Espesor</label>
                    <select id="espesor" className="form-select" {...register('espesor', {
                        required: true
                    })}>
                        <option value='1/2"'> 1/2" </option>
                        <option value='3/4"'> 3/4" </option>
                        <option value='1"'> 1" </option>
                        <option value='1 1/2"'> 1 1/2"</option>
                        <option value='2"'> 2" </option>
                    </select>
                    {errors.espesor && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
                </div>
                )
                : false
            }

           {/* crear un campo de Espesor con input text para la categoria 6 */}

            {
                categoria === 6 ?
                (
                <div className="col-4">
                    <label htmlFor="inputAddress2" className="form-label">Espesor</label>
                    <input type="text" className="form-control" id="espesor" {...register('espesor', {
                        required: true
                    })} />
                    {errors.espesor && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
                </div>
                )
                : false
            }



            {
                categoria === 1 || categoria === 2 || categoria === 3 ?
                (
                    <div className="col-md-4">
                        <label htmlFor="inputCity" className="form-label">Color</label>
                        <select id="color" className="form-select" {...register('color', {
                            required: true
                        })}>
                            <option value='incoloro'>Incoloro</option>
                            <option value='bronce'>Bronce</option>
                            <option value='gris'>Gris</option>
                            <option value='reflejante'>Reflejante</option>
                            <option value='a color'>A color</option>
                        </select>
                        {errors.color && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
                    </div>
                ) : false
                
            }

            {
                categoria === 5 || categoria === 6 ?
                (
                    <div className="col-md-4">
                        <label htmlFor="inputCity" className="form-label">Color</label>
                        <input type="text" className="form-control" id="color" {...register('color', {
                            required: true
                        })} />
                        {errors.color && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
                    </div>

                ) : false
            }

            {
                categoria === 1 || categoria === 2 || categoria === 3 ?
                (
                    <div className="col-md-4">
                        <label htmlFor="inputState" className="form-label">Textura</label>
                        <select id="textrua" className="form-select" {...register('textura',{
                            required: true
                        })}>
                            <option value='liso'>Liso</option>
                            <option value='catedral'>Catedral</option>
                            <option value='pavonado'>Pavonado</option>
                        </select>
                        {errors.textura && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
                    </div>

                ) : false
            }

            {/* crear un campo de Textura de text input */}

            {
                categoria === 5 || categoria === 6 ? 
                (
                    <div className="col-md-4">
                        <label htmlFor="inputState" className="form-label">Textura</label>
                        <input type="text" className="form-control" id="textura" {...register('textura',{
                            required: true
                        })} />
                        {errors.textura && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
                    </div>

                ): false
            }


            

            

            <div className='col-md-4'>
                <label htmlFor="costo" className="form-label">Costo</label>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">S/.</span>
                    <input type="number" step="any" className="form-control" id="costo" {...register('costo',{
                        required: true
                    })} />
                </div>
                {errors.costo && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
            </div>


            <div className='col-md-4'>
                <label htmlFor="venta" className="form-label">Venta</label>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">S/.</span>
                    <input type="number" step="any" className="form-control" id="venta" {...register('venta',{
                        required: true
                    })} />
                </div>
                {errors.venta && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
            </div>
            
            
            <div className="col-6 d-grid">
                {
                    productoParaActualizar ?
                        <button 
                            disabled={loading} type="button"
                            className="btn btn-info"
                            onClick={handleSubmit(actualizarProducto)}
                        >
                            Actualizar
                        </button>
                    :
                    <button disabled={loading} type="submit" className="btn btn-primary">
                        Registrar
                    </button>

                }
                

            </div>

            <div className="col-6 d-grid">
                <button type="button" className="btn btn-warning" onClick={cancelar}>
                    {`${productoParaActualizar ? 'Cancelar' : 'Reset'}`}
                </button>
            </div>

        </form>

        <div className='row'>
            <div className='col-md-4'>
                <p>{formData && JSON.stringify(formData)}</p>

            </div>  
        </div>
    </>

  )
}

export default TarifarioVidrios