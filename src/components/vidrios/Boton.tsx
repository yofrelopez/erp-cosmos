


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



    let categoria = '';
    //asignar a categoria el valor de la categoria del vidrio   del 1 al 4
    if (vidrio?.categoria === 1) {
        categoria = 'Vidrio'
    } else if (vidrio?.categoria === 2) {
        categoria = 'Espejo'
    } else if (vidrio?.categoria === 4) {
        categoria = 'Ventana'
    } else if (vidrio?.categoria === 7) {
        categoria = 'Puerta'
    } else if(vidrio?.categoria === 8) {
        categoria = 'Mampara'
    };


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
            
            const metroLineal = ((Number(formData.largo) + Number(formData.alto)) * 2) / 100
            const precioPulido = formData.pulido ? metroLineal * 12 : 0

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
                precioUnitario: (preFt2 * vidrio.venta) + precioPulido,
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


        <div className='col-5 col-sm-3 d-grid m-1'>
            <button
                onClick={handleBoton}
                type="button"
                disabled={isActiveBoton}
                className={`btn ${color} btn-lg`}
            >
                <p className='fs-6 mb-0'> {categoria} </p>
                <p className='fs-6 mb-0'> {vidrio?.nombre}</p>
                <p className='fs-6 mb-0'> {vidrio?.espesor}</p>
            </button>
        </div>

  )
}

export default Boton