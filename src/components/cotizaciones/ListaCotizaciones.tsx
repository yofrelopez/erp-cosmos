import { useEffect, useContext, useState, useMemo } from "react"
import { supabase } from "../../supabase/client"
import { AuthContext } from "../../context/auth/AuthContext"
import {   Row, flexRender,   getCoreRowModel,   useReactTable } from '@tanstack/react-table'
import { AiOutlineEye } from 'react-icons/ai';
import { modalQuote } from "../../interface/interfaces";
import QuoteModal from "./QuoteModal";



const ListaCotizaciones = () => {    


  const { isLoggedIn } = useContext(AuthContext)

  const [ cotizaciones, setCotizaciones ] = useState([])

  const data = useMemo(() => cotizaciones, [cotizaciones])

  // agregar un prefijo en la columna total


  const columns = [
      {
        header: 'Serie',
        accessorKey: 'id_serie',
        footer: 'Serie'
      },
      {
        //no mostrar el header de esta columna. Ocultar esta columna
        //ocultar el header de esta columna con una condicional en el flexRender de la tabla
        // si el header es igual a Id_Orden no mostrarlo 
        // quedaría así la condiciona: header.id !== 'Id_Orden' ? flexRender(header.column.columnDef.header, header.getContext()) : false
        header: 'Id_Orden',
        accessorKey: 'id_orden',
        footer: 'Id_Orden',
        
      },
      {
        //no mostrar el header de esta columna. Ocultar esta columna
        //ocultar el header de esta columna con una condicional en el flexRender de la tabla
        // si el header es igual a Id_Orden no mostrarlo 
        // quedaría así la condiciona: header.id !== 'Id_Orden' ? flexRender(header.column.columnDef.header, header.getContext()) : false
        header: 'ID Cliente',
        accessorKey: 'id_cliente',
        footer: 'ID Cliente',
        
      },
      {
        header: 'Fecha',
        accessorKey: 'created_at',
        footer: 'Fecha',
        cell: ({ getValue }: { getValue: ()=> any}) => {
          // Convertir el timestamp en una fecha
          const date = new Date(getValue());
          // Formatear la fecha en una cadena de texto legible
          const humanReadableDate = date.toLocaleString();
          return humanReadableDate;
        },
      },
      {
        header: 'Tipo',
        accessorKey: 'ordenType',
        footer: 'Tipo'
      },
      {
        header: 'Entrega',
        accessorKey: 'fechaEntrega',
        footer: 'Entrega'
      },
      {
        header: 'Servicio',
        accessorKey: 'estadoServicio',
        footer: 'Servicio'
      },
      {
        header: 'Nombres',
        accessorKey: 'nombres',
        footer: 'Nombres'
      },
      {
        header: 'Apellidos',
        accessorKey: 'apellidos',
        footer: 'Apellidos'
      },
      {
        header: 'Total',
        accessorKey: 'total',
        footer: 'Total',
        cell: ({ getValue }: { getValue: () => any }) => {
          const value = getValue();
          return `S/. ${value.toFixed(2)}`;
        },
      },
      {
        header: 'Ver',
        accessorKey: 'ver',
        footer: 'Ver',
        cell: ({ row }: { row: Row<modalQuote> }) => (
          <QuoteModal buttonLabel={<AiOutlineEye style={{'paddingBottom':2}} size={25}/>} quote={row.original} />

        )
      },
    ]

  const table = useReactTable({
    data, columns,
    getCoreRowModel: getCoreRowModel<modalQuote>(),
  }) ;





  const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('vista_ordenes_clientes')
          .select('*')        
        if (error) {
          throw error
        }
        console.log('data', data)
        if(data?.length > 0){
          setCotizaciones(data as any)
        }
        
      } catch (error) {
        console.error(error)
      }
    }


    useEffect(() => {
      if(isLoggedIn){
        fetchData()
      }
    }, [isLoggedIn])


    
    // Modal   



/*     const abrirModal = (row: Row<modalQuote>) => {
      console.log('row', row.original)
    } */

  



  return (
    <div className="container">
      <h3 className="text-center text-secondary display-6">Lista de Cotizaciones</h3>
      <hr/>
    {
      cotizaciones.length > 0 ?
      <table className="table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (                
              <th key={header.id}>
                {
                  
                  header.column.columnDef.header !== 'Id_Orden' ?
                  flexRender(header.column.columnDef.header, header.getContext())
                  : false
                }
              </th>))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                // a la columna total agregar el simbolo de dolar

                <td key={cell.id}>

                  {
                    cell.column.columnDef.header !== 'Id_Orden' ?
                  flexRender(cell.column.columnDef.cell, cell.getContext())
                  : false
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>




      : <div className="alert alert-info">No hay cotizaciones</div>


    }
      
    </div>
  )
}

export default ListaCotizaciones

