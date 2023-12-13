
import { ITarifarioVidrios } from '../components/tarifarios/Vidrios';
import { IVidrio } from "../components/vidrios/FormVidrios"

export interface IVidrioCliente {
    especificaciones: ITarifarioVidrios;
    medidas: IVidrio;
    precioUnitario?: number;
    precioSubTotal?: number;
}

export interface IRuta {
    path: string;
    name: string;
    icon: React.ReactNode;
}


export interface IItem {
    id: string;
    producto: string;
    descripcion: string;
    pUnitario: number;
    cantidad: number;
    subTotal: number;
}

export interface ICuadro {
    largo: number;
    alto: number;
    cantidad: number;
    margen: 'directo' | 'fondo';
    fondoTipo?: ''|'cartulina'|'vidrio'|'paspartu-nordex';
    fondoColor?: string;
    vidrio: 'simple' | 'mate';
    molduraEspesor:
    'media' | 'tres-cuartos' | 'una-pulgada' |
    'pulgada-media' | 'dos-pulgadas';
    molduraTextura: string;
    precioEsepcial: number;
    molduraColor: string;
    nordexEspaldar: boolean;
    parante: boolean;
}

export interface ICliente {
    tipo_doc: string;
    id_cliente: string;
    nombres: string;
    apellidos?: string;
    telefono: string;
    email?: string;
    direccion?: string;
}

export interface IOrden {
    id_orden: string;
    id_cliente: string;
    ordenType: 'Proforma' | 'Contrato';
    fechaEntrega?: string;
    estadoServicio?: 'Pendiente' | 'En-Proceso' | 'Terminado';
    estadoEntrega?: 'Pendiente' | 'Entregado';
    estadoPago?: 'Pendiente' | 'Adelanto' | 'Pagado';
    total: number;
}

export interface IOrdenItems {
    id_orden: string;
    items: IItem[];
}


export interface modalQuote {
    id_serie: string;
    id_orden?: string;
    created_at: string;
    ordenType: string;
    apellidos: string;
    nombres: string;
    id_cliente?: string;
    products?: IOrdenItems;
    total: number;
    estadoServicio?: string;
    fechaEntrega?: string;
  }

 export interface QuoteProducts {
    producto: string;
    descripcion: string;
    p_unitario: number;
    cantidad: number;
    subtotal: number;
  }

  export interface clientContact {
    direccion: string;
    telefono: string;
    email: string;
  }

/*
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

 */




/* 

export interface IVidrio {
    largo: number;
    alto: number;
    cantidad: number;
    descuento: number;
    pulido: boolean;
    biselado: boolean;
}


*/