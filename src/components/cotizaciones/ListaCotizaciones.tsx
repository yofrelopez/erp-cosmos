import { useEffect, useContext, useState, useMemo } from "react";
import { supabase } from "../../supabase/client";
import { AuthContext } from "../../context/auth/AuthContext";
import {
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel, 
} from "@tanstack/react-table";
import { AiOutlineEye } from "react-icons/ai";
import { modalQuote } from "../../interface/interfaces";
import QuoteModal from "./QuoteModal";




const ListaCotizaciones = () => {




  const { isLoggedIn } = useContext(AuthContext);

  const [cotizaciones, setCotizaciones] = useState([]);

  const data = useMemo(() => cotizaciones, [cotizaciones]);

  // agregar un prefijo en la columna total

  const columns = [
    {
      header: "Serie",
      accessorKey: "id_serie",
      footer: "Serie",
    },
    {
      //no mostrar el header de esta columna. Ocultar esta columna
      //ocultar el header de esta columna con una condicional en el flexRender de la tabla
      // si el header es igual a Id_Orden no mostrarlo
      // quedaría así la condiciona: header.id !== 'Id_Orden' ? flexRender(header.column.columnDef.header, header.getContext()) : false
      header: "Id_Orden",
      accessorKey: "id_orden",
      footer: "Id_Orden",
    },
    {
      //no mostrar el header de esta columna. Ocultar esta columna
      //ocultar el header de esta columna con una condicional en el flexRender de la tabla
      // si el header es igual a Id_Orden no mostrarlo
      // quedaría así la condiciona: header.id !== 'Id_Orden' ? flexRender(header.column.columnDef.header, header.getContext()) : false
      header: "ID Cliente",
      accessorKey: "id_cliente",
      footer: "ID Cliente",
    },
    {
      header: "Fecha",
      accessorKey: "created_at",
      footer: "Fecha",
      /* convertir timestamp en fecha simple: primero el año, luego el mes, y despues el dia, sepárados por guión.
      Para los meses del 01 al 09, agregarles el 0 al inicio*/
      cell: ({ getValue }: { getValue: () => any }) => {
        const value = getValue();
        const date = new Date(value);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const monthWithZero = month < 10 ? `0${month}` : month;
        const dayWithZero = day < 10 ? `0${day}` : day;
        return `${year}-${monthWithZero}-${dayWithZero}`;
      },


    },
    {
      header: "Tipo",
      accessorKey: "ordenType",
      footer: "Tipo",
    },
    {
      header: "Entrega",
      accessorKey: "fechaEntrega",
      footer: "Entrega",
    },
    {
      header: "Servicio",
      accessorKey: "estadoServicio",
      footer: "Servicio",
    },
    {
      header: "Nombres",
      accessorKey: "nombres",
      footer: "Nombres",
    },
    {
      header: "Apellidos",
      accessorKey: "apellidos",
      footer: "Apellidos",
    },
    {
      header: "Total",
      accessorKey: "total",
      footer: "Total",
      cell: ({ getValue }: { getValue: () => any }) => {
        const value = getValue();
        return `S/. ${value.toFixed(2)}`;
      },
    },
    {
      header: "Ver",
      accessorKey: "ver",
      footer: "Ver",
      cell: ({ row }: { row: Row<modalQuote> }) => (
        <QuoteModal
          buttonLabel={<AiOutlineEye style={{ paddingBottom: 2 }} size={25} />}
          quote={row.original}
        />
      ),
    },
  ];



  //Estado del filtro buscar

  const [filtrar, setFiltrar] = useState('');



  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel<modalQuote>(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtrar,
    },
    onGlobalFilterChange: setFiltrar,

  }); 

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("vista_ordenes_clientes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        throw error;
      }
      console.log("data", data);
      if (data?.length > 0) {
        setCotizaciones(data as any);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  // Modal

  /*     const abrirModal = (row: Row<modalQuote>) => {
      console.log('row', row.original)
    } */

  return (
    <div className="container">
      <h3 className="text-center text-secondary display-6">
        Lista de Cotizaciones
      </h3>
      <hr />
      <div className="d-flex">
        <div className="pe-4">
          <input
            type="text"
            placeholder="Buscar"
            value={filtrar}
            onChange={(e) => setFiltrar(e.target.value)}
          />
        </div>


      </div>
      {cotizaciones.length > 0 ? (
        <div>
          <table className="table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.column.columnDef.header !== "Id_Orden"
                        ? flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        : false}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    // a la columna total agregar el simbolo de dolar

                    <td key={cell.id}>
                      {cell.column.columnDef.header !== "Id_Orden"
                        ? flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        : false}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className='d-flex'>
            <button className='btn btn-sm btn-outline-success me-2' onClick={() => table.setPageIndex(0)}> Inicio </button>
            <button
              className='btn btn-sm btn-outline-success me-2'
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              {" "}
              Anterior{" "}
            </button>
            <button
              className='btn btn-sm btn-outline-success me-2'
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              {" "}
              Siguiente{" "}
            </button>
            <button
              className='btn btn-sm btn-outline-success'
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              {" "}
              Final{" "}
            </button>
          </div>
        </div>
      ) : (
        <div className="alert alert-info">No hay cotizaciones</div>
      )}
    </div>
  );
};

export default ListaCotizaciones;
