import { useForm } from "react-hook-form";
import { IObservaciones, modalQuote } from "../../interface/interfaces";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "../../supabase/client";
import { useEffect, useState, useContext } from "react";
import { OrdenContext } from "../../context/invoice/OrdenContext";




export interface IObservacionesFetch {
    id_obs: string,
    observacion: string,
    item: number,
    id_orden: string,
    created_at: string
}




const Observacion = ({quote}: {quote: modalQuote}) => {



console.log('observaciones', quote.id_orden)

    const { setObservaciones, observaciones } = useContext(OrdenContext)


    const [ isActiveBoton, setIsActiveBoton ] = useState<boolean>(false)

    const [ itemNumber, setItemNumber ] = useState<number>(1)


    const { register, reset, handleSubmit, formState: { errors } } = useForm<IObservaciones>({

        defaultValues: {
            id_orden: '',
            id_obs: '',
            observacion: '',
            item: '',
        }
    });

    const onSubmit = async (data: IObservaciones) => {

        console.log('Data del  Observaciones:', data)
        try {
            await saveObservacion(data)            
            reset({
                id_orden: '',
                id_obs: '',
                observacion: '',
                item: '',
            })
            setIsActiveBoton(false)
        } catch (error) {
            console.log('Error al guardar la observación:', error)
        }
    }



// Función para conectarse a la base de datos de supabase y guardar la observación en la tabla 'observaciones'

    const saveObservacion = async (formData: IObservaciones) => {
        const {observacion} = formData
        const uuid = uuidv4()
        const { data: responseData, error } = await supabase
            .from('observaciones')
            .insert([
                { id_obs: uuid, observacion, item: itemNumber, id_orden: quote.id_orden }
            ])    
        if (error) {
            console.log('Error al guardar observación:', error);
            throw error
        } else {
            console.log('Observación guardada:', responseData);
            return responseData
        }
    }


    // Useffect para conectarse a la supabase y obtener las observaciones de la orden quote.id_orden

    useEffect(() => {

        if(!isActiveBoton ){
            const getObservaciones = async () => {
                const { data: observaciones, error } = await supabase
                    .from('observaciones')
                    .select('*')
                    .eq('id_orden', quote.id_orden)
                if (error) {
                    console.log('Error al obtener observaciones:', error);
                    throw error
                } else {
                    console.log('Observaciones obtenidas:', observaciones);
                    if(observaciones.length === 0){
                        return setObservaciones(false)
                    } else {
                        setObservaciones(observaciones as IObservacionesFetch[]) 
                    }
                }
            }
            getObservaciones()
        }

    }, [isActiveBoton])

    // UseEffect para actualizar el número de item de la observación cada vez que se agrega una nueva observación

    useEffect(() => {
        if(observaciones){
            setItemNumber(observaciones.length + 1)
        }
    }, [observaciones])



  return (
    <div className="container pt-4">
        <div>
            <h6>Observaciones</h6>
            {
                observaciones && observaciones.map( obs => (
                    <>
                        <p key={obs.id_obs} className="py-0 my-0">
                            <span className="pe-2">{`${obs.item}.`}</span>
                            {obs.observacion}
                            <small className="ms-2 text-muted bg-primary-subtle px-1">{new Date(obs.created_at).toLocaleDateString()}</small>
                        </p>

                        
                        
                    </>
                ))
            }
        </div>

        {
            isActiveBoton &&
            <>
            <form onSubmit={handleSubmit(onSubmit)} className="row pt-4">

                <div className="col-md-4">
                    <label htmlFor="observacion" className="form-label px-2 bg-warning-subtle">Agrega una observación</label>
                    
                        <textarea
                                id="observacion"
                                className="form-control"
                                aria-describedby="observacion"
                                rows={2}
                                {...register('observacion',{
                                    required: true
                                })}
                                /* onChange={()=>setIsActiveBoton(true)} */

                        />
                    
                    {errors.observacion && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
                </div>


                {/* botón enviar */}

                <div className="col-md-1 align-self-end">
                    <div className="d-flex flex-column">
                        <button type="submit" className="btn btn-outline-primary btn-sm">Enviar</button>
                        {/* boton cancelar */}
                        <button type="button" onClick={()=>setIsActiveBoton(false)} className="btn btn-outline-danger btn-sm">Cancelar</button>

                    </div>
                </div>

            </form>
            </>
        }

        {
            !isActiveBoton &&
            <div className="pt-4">
                <button onClick={()=>setIsActiveBoton(true)} className="btn btn-outline-primary btn-sm">Agregar Observación</button>
            </div>
        }



        



    </div>
  )
}

export default Observacion