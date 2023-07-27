


import { FC, useContext, useEffect, useState } from 'react';
import { VidriosContext } from '../../context/vidrios/VidriosContext';
import { ITarifarioVidrios } from '../tarifarios/Vidrios';
import { IVidrioCliente } from '../../interface/interfaces';



interface Props {
    vidrio: ITarifarioVidrios | undefined | null;
}

const Boton:FC<Props> = ({vidrio}) => {

    const { setVidrioCliente, formData, preFt2, isActiveBoton, setIsActiveBoton2 } = useContext(VidriosContext)

    const [ preVidrio, setPreVidrio ] = useState<IVidrioCliente | null>(null)



    const categoria = vidrio?.categoria === 1 ? 'Vidrio' : 'Espejo'
    const espesor = vidrio?.espesor
    const getColor = () => {
       if (espesor === '2mm' || espesor === '3mm' ) {
           return 'btn-primary'
       } else if (espesor === '4mm' || espesor === '5.5mm' ) {
              return 'btn-secondary'
         }  else if (espesor === '6mm' || espesor === '8mm' ) {
            return 'btn-success'
            }  else {
                return 'btn-warning'
                }
    }
    const color = getColor()

    const getPrecioVidrio = () => {
        if(vidrio && formData){

            const vidrioPrecio:IVidrioCliente = {
                especificaciones: {
                    categoria: vidrio.categoria,
                    nombre: vidrio.nombre,
                    code: vidrio.code,
                    espesor: vidrio.espesor,
                    color: vidrio.color,
                    textura: vidrio.textura,
                    costo: vidrio.costo,
                    venta: vidrio.venta,
                    id: vidrio.id
                },
                medidas: {
                    largo: formData?.largo,
                    alto: formData?.alto,
                    cantidad: formData?.cantidad,
                    descuento: formData?.descuento,
                    pulido: formData?.pulido,
                    biselado: formData?.biselado,
                },
                precioUnitario: preFt2 * vidrio.venta,
                precioSubTotal: Number(preFt2 * vidrio.venta) * Number(formData.cantidad),
            }

            setPreVidrio(vidrioPrecio)
        }
    }

    const handleBoton = () => {
        getPrecioVidrio()
        setIsActiveBoton2(true)
    }

    useEffect(() => {
        if(preVidrio){
            setVidrioCliente(preVidrio)
        }
    }, [preVidrio])




  return (
    <div className='col-3 d-grid mb-2'>
        <button
            onClick={handleBoton}
            type="button"
            disabled={isActiveBoton}
            className={`btn ${color} btn-lg`}
        >
            {categoria}<br/>
            <small> {vidrio?.nombre}</small>
            <small> {vidrio?.espesor}</small>
        </button>

    </div>
  )
}

export default Boton