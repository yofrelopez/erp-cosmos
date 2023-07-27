
import { FC, ReactNode, useState, useEffect } from 'react';
import { CuadrosContext } from "./CuadrosContext";
import { ICuadro } from "../../interface/interfaces";
import { IItem } from '../../interface/interfaces';






interface Props {
    children: ReactNode;
}


const CuadrosProviderContext:FC<Props> = ({children}) => {

    const [ cuadro, setCuadro ] = useState< ICuadro | null >(null);
    const [ perimetro, setPerimetro ] = useState<number>(0);
    const [ pieCuadrado, setPieCuadrado ] = useState<number>(0);
    const [ precioMoldura1, setPrecioMoldura1 ] = useState<number>(0);
    const [ precioVidrio, setPrecioVidrio ] = useState<number>(0);
    const [ precioCuadroTotal, setPrecioCuadroTotal ] = useState<number>(0);
    const [ segundoVidrio, setSegundoVidrio ] = useState<number>(0);
    const [ paspartuNordex, setPaspartuNordex ] = useState<number>(0);
    const [ itemCuadro, setItemCuadro ] = useState<IItem | null >(null);


    const calcularCuadro = ( dato: ICuadro ) => {
        setCuadro( dato ); 
           
    }

    useEffect(() => {
         
        if( cuadro !== null && cuadro?.margen === 'directo' ){
            setPerimetro( Number(cuadro.largo * 2) + Number(cuadro.alto * 2) );
            setPieCuadrado( Number(cuadro.largo) * Number(cuadro.alto) / 900 );
            switch (cuadro?.vidrio) {
                case 'simple': setPrecioVidrio(5);
                    break;
                case 'mate': setPrecioVidrio(8.5);
                    break;
                default: setPrecioVidrio(0);
            }
        }

        if( cuadro !== null && cuadro?.margen === 'fondo'){
            const largo = Number(cuadro.largo) + 5;
            const alto = Number(cuadro.alto) + 5;
            setPerimetro( Number(largo * 2) + Number(alto * 2) );
            setPieCuadrado( Number(largo) * Number(alto) / 900 );
            switch (cuadro?.vidrio) {
                case 'simple': setPrecioVidrio(5);
                    break;
                case 'mate': setPrecioVidrio(8.5);
                    break;
                default: setPrecioVidrio(0);
            }
            
        }

    }, [cuadro])



    useEffect(() => {
        if( perimetro !== 0 && pieCuadrado !== 0 ){
            switch (cuadro?.molduraEspesor) {
                case 'media': setPrecioMoldura1(15);
                    break;
                case 'tres-cuartos': setPrecioMoldura1(18);
                    break;
                case 'una-pulgada': setPrecioMoldura1(23);
                    break;
                case 'pulgada-media': setPrecioMoldura1(30);
                    break;
                case  'dos-pulgadas': setPrecioMoldura1(35);
                    break;
                default: setPrecioMoldura1(0);
            }
            if(cuadro?.fondoTipo === 'vidrio'){
                setSegundoVidrio( pieCuadrado * 5 );
            }
            if(cuadro?.fondoTipo === 'paspartu-nordex'){
                setPaspartuNordex( pieCuadrado * 7.5 );
            }
        }
    }, [perimetro, pieCuadrado, paspartuNordex])

    useEffect(() => {
        if( precioMoldura1 !== 0 ){
            const precioVidrioTotal = precioVidrio * pieCuadrado;
            const precioMolduraTotal = precioMoldura1 * (perimetro * 0.01);
            setPrecioCuadroTotal(
                    (precioVidrioTotal + precioMolduraTotal + segundoVidrio + paspartuNordex) * cuadro?.cantidad! );
            console.log('precioVidrioTotal: ', precioVidrioTotal);
            console.log('precioMolduraTotal: ', precioMolduraTotal);
            console.log('segundoVidrio: ', segundoVidrio);
            console.log('paspartuNordex: ', paspartuNordex)
        }
    }, [precioMoldura1, segundoVidrio])


    useEffect(() => {        


        if( precioCuadroTotal !== 0 ){

            const tempItemCuadro:IItem = {
                id: 'temporal',
                producto: 'Cuadro',
                descripcion: `${cuadro?.largo}cm x ${cuadro?.alto}cm - ` +
                    `${cuadro?.margen === 'directo' ? 'Directo' : 'Fondo: '} ` +
                    `${cuadro?.fondoTipo === 'cartulina' ? 'Cartulina - ' : ''}` +
                    `${cuadro?.fondoTipo === 'paspartu-nordex' ? 'Paspartu Nordex - ' : ''}` + 
                    `${cuadro?.fondoTipo === 'vidrio' ? 'Doble Vidrio - ' : ''}` +
                    `${cuadro?.margen === 'fondo' ? `Color de fondo: ${cuadro?.fondoColor} - ` : ''}` +
                    `Vidrio: ${cuadro?.vidrio} - Moldura: ${cuadro?.molduraEspesor} - ` +
                    `${cuadro?.molduraTextura} - ${cuadro?.molduraColor}`,
                pUnitario: precioCuadroTotal,
                cantidad: cuadro?.cantidad!,
                subTotal: precioCuadroTotal * cuadro?.cantidad!
    
            }
            setItemCuadro( tempItemCuadro );



            console.log('Precio Total: ', precioCuadroTotal);
            setCuadro( null );
            setPerimetro( 0 );
            setPieCuadrado( 0 );
            setPrecioMoldura1( 0 );
            setPrecioVidrio( 0 );
            setPrecioCuadroTotal( 0 );
            setSegundoVidrio(0);
            setPaspartuNordex(0);
        }
    }, [precioCuadroTotal])


  return (
    <CuadrosContext.Provider
        value={ {calcularCuadro, cuadro, itemCuadro, setItemCuadro} }>

        {children}

    </CuadrosContext.Provider>
  )
}

export default CuadrosProviderContext