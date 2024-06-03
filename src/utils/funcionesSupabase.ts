

import { supabase } from "../supabase/client";

export interface SimpleYMate {
    nombre: string,
    code: string,
    venta: number
}

// Función para obtener un arreglo con los precios de vidrio simple y mate de la tabla "productos" de supabase.
// Primero conectarse a la base de datos.
// En la columna "code" se encuentra el código de los vidrios. Siendo "VSIM-IL" el código del vidrio simple y "VSIM-M" el código del vidrio mate.
// En la columna "venta" se encuentra el valor del precio del vidrio. (usar el tipado SimpleYMate en la función)


export const getPrecioVidrioSimpleYMate = async () : Promise<SimpleYMate[] | null>  => {
    let { data: vidrios, error } = await supabase
        .from('productos')
        .select('nombre, code, venta')
        .in('code', ['VSIM-IL', 'VSIM-M']);
    if (error) {
        console.log('Error al obtener datos:', error);
        throw error;
    } else {
        console.log('Datos obtenidos:', vidrios);
        return vidrios;
    }
}

 

// Función para obtener un arreglo con los precios de todos los productos de la tabla "productos" de supabase.
// La columna "categoria" de la tabla "productos" está vinculada a la tabla "categoria_de_productos" mediante la columna "id".
// En la tabla "categoria_de_productos" se encuentra el nombre de la categoría de los productos, en la columna "nombre"
// En la tabla "productos" se encuentra el nombre del producto, en la columna "nombre"
// En la columna "venta" de la tabla "productos" se encuentra el valor del precio del producto.
// En la columna "code" de la tabla "productos" se encuentra el código del producto.
// En la columna "categoria" de la tabla "productos" se encuentra el id de la categoría del producto.
/*  Necesito una función que me devuelva un arreglo con los precios de todos los productos de la tabla "productos" de supabase,
 con el nombre de la categoría de los productos. */
 // Los datos que necesito de cada producto son: nombre, code, venta y el nombre de la categoría de los productos.

export interface ListaDeProductos {
    nombre: string,
    code: string,
    venta: number,
    categoria: string
}

export const getPreciosProductos = async () : Promise<ListaDeProductos[] | null>  => {
    let { data: productos, error } = await supabase
        .from('productos')
        .select('nombre, code, venta, categoria')
        .order('categoria', {ascending: true});
    if (error) {
        console.log('Error al obtener datos:', error);
        throw error;
    } else {
        console.log('Lista de Precios de Productos:', productos);
        return productos;
    }
}
