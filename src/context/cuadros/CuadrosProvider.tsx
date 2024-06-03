

import { FC, ReactNode, useState, useEffect, useContext } from 'react';
import { CuadrosContext } from "./CuadrosContext";
import { ICuadro } from "../../interface/interfaces";
import { IItem } from '../../interface/interfaces';
import { VidriosContext } from '../vidrios/VidriosContext';
import { TarifarioContext } from '../tarifarioContext/TarifarioContext';




interface Props {
    children: ReactNode;
}


const CuadrosProviderContext:FC<Props> = ({children}) => {

    const { precioVidrioSimple, precioVidrioMate } = useContext(VidriosContext);    


    const [ cuadro, setCuadro ] = useState< ICuadro | null >(null);
    const [ perimetro, setPerimetro ] = useState<number>(0);
    const [ pieCuadrado, setPieCuadrado ] = useState<number>(0);
    const [ precioMoldura1, setPrecioMoldura1 ] = useState<number>(0);
    const [ precioVidrio, setPrecioVidrio ] = useState<number>(0);
    const [ precioCuadroTotal, setPrecioCuadroTotal ] = useState<number>(0);
    const [ segundoVidrio, setSegundoVidrio ] = useState<number>(0);
    const [ paspartuNordex, setPaspartuNordex ] = useState<number>(0);
    const [ itemCuadro, setItemCuadro ] = useState<IItem | null >(null);


    const [ nombreMoldura, setNombreMoldura ] = useState<string>('');

    const calcularCuadro = ( dato: ICuadro ) => {
        setCuadro( dato );            
    }


    // obtener lista de precios de productos de TarifarioContext
    const { listaPreciosMolduras, listaPreciosAglomerados } = useContext(TarifarioContext);


    useEffect(() => {

        if( cuadro !== null ){
                //asignarle nombre a molduras: 1/2" - 3/4" - 1" - 1 1/2" - 2"
            switch (cuadro?.molduraEspesor) {
                case 'MDM-NC': setNombreMoldura('1/2"');
                    break;
                case 'MDT-NC': setNombreMoldura('3/4"');
                    break;
                case 'MDU-NC': setNombreMoldura('1"');
                    break;
                case 'MDUM-MC': setNombreMoldura('1 1/2"');
                    break;
                case  'MDD-NC': setNombreMoldura('2"');
                    break;
                default: setNombreMoldura('');
            }
        }
    }, [cuadro])



    

    useEffect(() => {
         
        if( cuadro !== null && cuadro?.margen === 'directo' ){
            setPerimetro( Number(cuadro.largo * 2) + Number(cuadro.alto * 2) );
            setPieCuadrado( Number(cuadro.largo) * Number(cuadro.alto) / 900 );
            switch (cuadro?.vidrio) {
                case 'simple': setPrecioVidrio(precioVidrioSimple);
                    break;
                case 'mate': setPrecioVidrio(precioVidrioMate);
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
                case 'simple': setPrecioVidrio(precioVidrioSimple);
                    break;
                case 'mate': setPrecioVidrio(precioVidrioMate);
                    break;
                default: setPrecioVidrio(0);
            }
            
        }

    }, [cuadro])

    // PRECIO MOLDURA

    useEffect(() => {
        if( perimetro !== 0 && pieCuadrado !== 0 && listaPreciosMolduras !== null){
            switch (cuadro?.molduraEspesor) {
                case 'MDM-NC': setPrecioMoldura1(listaPreciosMolduras['MDM-NC']);
                    break;
                case 'MDT-NC': setPrecioMoldura1(listaPreciosMolduras['MDT-NC']);
                    break;
                case 'MDU-NC': setPrecioMoldura1(listaPreciosMolduras['MDU-NC']);
                    break;
                case 'MDUM-MC': setPrecioMoldura1(listaPreciosMolduras['MDUM-MC']);
                    break;
                case  'MDD-NC': setPrecioMoldura1(listaPreciosMolduras['MDD-NC']);
                    break;
                default: setPrecioMoldura1(0);
            }
            if(cuadro?.fondoTipo === 'vidrio'){
                setSegundoVidrio( pieCuadrado * precioVidrioSimple );
            }
            if(cuadro?.fondoTipo === 'paspartu-nordex' && listaPreciosAglomerados !== null){
                setPaspartuNordex( pieCuadrado * listaPreciosAglomerados['PASP-PRE'] );
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



    // enviar moldura Espesor


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
                    `Vidrio: ${cuadro?.vidrio} - Moldura: ${nombreMoldura} - ` +
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

    useEffect(() => {
        console.log('Precio Vidrio Context Cuadro: ', precioVidrio, precioVidrioSimple, precioVidrioMate)
    }
    , [precioVidrio])


  return (
    <CuadrosContext.Provider
        value={ {calcularCuadro, cuadro, itemCuadro, setItemCuadro} }>

        {children}

    </CuadrosContext.Provider>
  )
}

export default CuadrosProviderContext