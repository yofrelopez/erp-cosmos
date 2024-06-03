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

import { FaRegTimesCircle } from "react-icons/fa";
import { TbLoader } from "react-icons/tb";
import { IoMdCheckboxOutline } from "react-icons/io";











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
      /* Ejemplo de formato de fecha: 2021-09-30 al años 2021 solo colocar el numero 21 y quedaría así: 21-09-30*/
      cell: ({ getValue }: { getValue: () => any }) => {
        const value = getValue();
        if (value) {
          const date = new Date(value);
          const year = date.getFullYear().toString().slice(2);
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          return `${year}-${month}-${day}`;
        }
        return "";
      },   
    },
    {
      header: "Tp",
      accessorKey: "ordenType",
      footer: "Tp",
      /* Si el valor es igual a "Proforma" escribir P en color naranja con fondo amarillo pastel;
      si es igual a "Contrato" escribir C en azul con fondo celeste pastel */
      cell: ({ getValue }: { getValue: () => any }) => {
        const value = getValue();
        return value === "Proforma" ? (
          <span style={{ color: "#FFA500", background:'#FFFACD', paddingInline: '5px' }}>P</span>
        ) : (
          <span style={{ color: "#00BFFF", background:'#B0E2FF', paddingInline: '5px' }}>C</span>
        );
      },

    },
    {
      header: "Fch-Entr.",
      accessorKey: "fechaEntrega",
      footer: "Fch-Entr.",
      /* Ejemplo de formato de fecha: 2021-09-30 al años 2021 solo colocar el numero 21 y quedaría así: 21-09-30*/
      cell: ({ getValue }: { getValue: () => any }) => {
        const value = getValue();
        if (value) {
          const date = new Date(value);
          const year = date.getFullYear().toString().slice(2);
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          return `${year}-${month}-${day}`;
        }
        return "";
      },


      /* si el valor es igual a "Pendiente" escribir 'P' en letra color rojo; si es "Entregado" escribir 'E' en letra azul */
     /*  cell: ({ getValue }: { getValue: () => any }) => {
        const value = getValue();
        return value === "Pendiente" ? (
          <span style={{ color: "#E1497F", background:'#FBBAD1', paddingInline: '5px' }}>P</span>
        ) : (
          <span style={{ color: "#00CE6D", background:'#A7FAC9', paddingInline: '5px' }}>E</span>
        );
      }, */
    },
    {
      header: "Svc.",
      accessorKey: "estadoServicio",
      footer: "Svc.",
      /* Si es "Pendiente" mostrar el icono <LiaTimesCircleSolid/> en color; si es "En-Proceso" mostrar el
      icono <TbLoader/> en color naranja; si es "Terminado mostrar el icono <IoMdCheckboxOutline/> en color verde*/
      cell: ({ getValue }: { getValue: () => any }) => {
        const value = getValue();
        return value === "Pendiente" ? (
          <FaRegTimesCircle style={{ color: "#E1497F" }} />
        ) : value === "En-Proceso" ? (
          <TbLoader style={{ color: "#FFA500" }} />
        ) : (
          <IoMdCheckboxOutline style={{ color: "#00CE6D" }} />
        );
      },
    },
/*     {
      header: "Nombres",
      accessorKey: "nombres",
      footer: "Nombres",
    },
    {
      header: "Apellidos",
      accessorKey: "apellidos",
      footer: "Apellidos",
    }, */
    /* Columna con el primer nombre del accessorKey: "nombres"; y el primer apellido del accessorKey: "apellidos" */
    {
      header: "Cliente",
      accessorKey: "cliente",
      footer: "Cliente",
      cell: ({ row }: { row: Row<modalQuote> }) => {
        const { nombres, apellidos } = row.original;
        return `${nombres} ${apellidos.split(" ")[0]}`;
      },
    },

    /* Columa de Estado del pedido del accessorKey "estadoEntrega". Si es "Pendiente" colocar ícono  <TbLoader/> en color naranja;
    si es "Entregado" mostrar el icono <IoMdCheckboxOutline/> en color verde */
    {
      header: "Entr.",
      accessorKey: "estadoEntrega",
      footer: "Entr.",
      cell: ({ getValue }: { getValue: () => any }) => {
        const value = getValue();
        return value === "Pendiente" ? (
          <TbLoader style={{ color: "#FFA500" }} />
        ) : (
          <IoMdCheckboxOutline style={{ color: "#00CE6D" }} />
        );
      },
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
        /* .from("vista_ordenes_clientes") */
        .from("vista_cotizaciones")
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
