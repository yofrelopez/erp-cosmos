
import { useForm } from "react-hook-form";
import {useEffect} from 'react';
import { useContext } from "react";
import { VidriosContext } from "../../context/vidrios/VidriosContext";



export interface IVidrio {
    largo: number;
    alto: number;
    cantidad: number;
    descuento: number;
    pulido: boolean;
    biselado: boolean;
    ft2?: number;
}



const FormVidrios = () => {

    const {vidrioCliente, setFormData, preFt2, setPreFt2,
            calcFt2, setIsActiveBoton, setIsActiveBoton2, setIsActiveReset, isActiveReset} = useContext(VidriosContext)


    const { register, reset, handleSubmit, formState: { errors } } = useForm<IVidrio>({

        defaultValues: {
            largo: 0,
            alto: 0,
            cantidad: 1,
            pulido: false,
            biselado: false,
            descuento: 0,

        }
    });

    const onSubmit = async (data: IVidrio) => {

        if(data.alto > 0 && data.largo > 0){
            setPreFt2(calcFt2(Number(data.alto), Number(data.largo)))
            setFormData(data)
            console.log('Data del UseForm:', data)
            setIsActiveBoton(false)
            setIsActiveBoton2(false)                       
        } 
            
    }

    const resetForm = () => {
        reset({
            largo: 0,
            alto: 0,
            cantidad: 1,
            pulido: false,
            biselado: false,
            descuento: 0,
        })
        setPreFt2(0)
        setIsActiveBoton(true)
        setIsActiveBoton2(false)
    }
    




    useEffect(() => {
        console.log(preFt2)
    }, [preFt2])


    useEffect(() => {
        console.log(vidrioCliente)
    }, [vidrioCliente])


    useEffect(() => {
        if(isActiveReset){
            resetForm()
            setIsActiveReset(false)
        }
    }, [isActiveReset])
    



    




  return (
    <> 

        <form onSubmit={handleSubmit(onSubmit)} className="row g-3">

            <div className="col-6 col-md-4">
                <label htmlFor="largo" className="form-label">Largo</label>
                <div className="input-group mb-3">
                    <input type="number"
                            id="largo"
                            step="any"
                            className="form-control form-control-lg"
                            aria-describedby="largo"
                            {...register('largo',{
                                required: true
                            })}
                            onChange={()=>setIsActiveBoton(true)}

                    />
                    <span className="input-group-text" id="largo">cm</span>
                </div>
                {errors.largo && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
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
                            required: true
                            })}
                            onChange={()=>setIsActiveBoton(true)}

                    />
                    <span className="input-group-text" id="alto">cm</span>
                </div>
                {errors.alto && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
            </div>


            <div className="col-6 col-md-4">
                <label htmlFor="cantidad" className="form-label">Cantidad</label>
                <div className="input-group mb-3">
                    <input type="number"
                            id="cantidad"
                            className="form-control form-control-lg"
                            aria-describedby="largo"
                            {...register('cantidad',{
                                required: true
                            })}
                            onChange={()=>setIsActiveBoton(true)}

                        />
                    <span className="input-group-text" id="cantidad">Und.</span>
                </div>
                {errors.cantidad && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
            </div>


            <div className="col-6 col-md-4">
                <label htmlFor="descuento" className="form-label">Descuento</label>
                <div className="input-group mb-3">
                    <select id="descuento"
                            className="form-select form-select-lg"
                            disabled
                            {...register('descuento', {
                                required: true
                            })}
                            onChange={()=>setIsActiveBoton(true)}

                        >
                        <option value='0'>0</option>
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='15'>15</option>
                        <option value='20'>20</option>

                    </select>
                    <span className="input-group-text" id="descuento">%</span>
                </div>
                {errors.descuento && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
            </div>


            <div className="col-6 col-md-4">
                <label htmlFor="pulido" className="form-label">Pulido</label>
                <div className="form-check form-switch my-switch-container ms-4 mt-2">
                    <input className="form-check-input my-switch"
                            disabled
                            type="checkbox"
                            role="switch"
                            id="pulido" 
                            {...register('pulido', {  required: false })}
                            onChange={()=>setIsActiveBoton(true)}

                        />
                </div>
                {errors.pulido && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
            </div>


            <div className="col-6 col-md-4">
                <label htmlFor="biselado" className="form-label">Biselado</label>
                <div className="form-check form-switch my-switch-container ms-4 mt-2">
                    <input className="form-check-input my-switch"
                            disabled
                            type="checkbox"
                            role="switch"
                            id="biselado" 
                            {...register('biselado', {  required: false })}
                            onChange={()=>setIsActiveBoton(true)}

                        />
                </div>
                {errors.biselado && <p className='alert alert-danger p-1'><small>Este campo es requerido</small></p>}
            </div>

            <div className="row g-3">
                <div className="d-grid col-6">
                    <button type="button" onClick={resetForm} className="btn btn-outline-warning">Reset</button>
                </div>
                <div className="d-grid col-6">
                    <button type="submit" className="btn btn-outline-primary">Calcular</button>
                </div>
            </div>


            



            
        </form>

    </>
  )
}

export default FormVidrios