// pdfGenerator.ts
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { clientContact, modalQuote } from "../interface/interfaces";
import { QuoteProducts } from "../interface/interfaces";
import { IObservacionesFetch } from "../components/cotizaciones/Observacion";




export const generatePDF = (observaciones: {observaciones: IObservacionesFetch[] | []} , quote: modalQuote, products: QuoteProducts[]|[], contact: clientContact | undefined ) => {



  const doc = new jsPDF();

  const aspectRatio = 1.96; // La relación de aspecto de la imagen
    const width = 35; // El ancho deseado de la imagen
    const height = width / aspectRatio; // Calcula la altura para mantener la relación de aspecto


  // Añade el logo de la empresa
  const logo = 'logo_1.png'; // reemplaza esto con tu logo
  doc.addImage(logo, 'PNG', 25, 17, width, height);

   // Añade los datos de la empresa debajo del logo
   doc.setFontSize(10); // Letras pequeñas
   doc.text('Razón social: V&D COSMOS S.R.L.', 225, 35);
   doc.text('RUC: 20609799090', 25, 40);
   doc.text('URL: vdcosmos.com', 25, 45);
   doc.text('Teléfono: 994 260 216', 25, 50);
   doc.text('Dirección: Jirón Arequipa 230 Barranca', 25, 55);
 
   // Añade la identificación del documento en la columna de la derecha
   doc.setFontSize(18); // Letras de tamaño principal
   doc.text(`${quote.ordenType}VC-0` + quote.id_serie, 120, 30); // Ajusta la coordenada x para mover el texto a la derecha
 
// Añade la fecha y el ID del cliente en una "tabla" con dos columnas
const fecha = new Date(quote.created_at);
    doc.setFontSize(12); // Tamaño de letra más pequeño para la tabla
    doc.text('Fecha:', 122, 42); // Añade margen al texto
    doc.text(fecha.toLocaleDateString(), 150, 42); // Segunda columna
    doc.text('ID cliente:', 122, 52); // Añade margen al texto
    doc.text(quote.id_cliente || '', 150, 52); // Segunda columna
    // Dibuja las líneas de la tabla
    doc.line(120, 35, 180, 35); // Línea superior
    doc.line(120, 45, 180, 45); // Línea entre las filas
    doc.line(120, 55, 180, 55); // Línea inferior
    doc.line(120, 35, 120, 55); // Línea izquierda
    doc.line(180, 35, 180, 55); // Línea derecha
    doc.line(145, 35, 145, 55); // Línea para dividir las columnas

    // traza una línea horizontal para separar el encabezado del contenido
    doc.line(20, 60, 190, 60);

    // Añade el encabezado para los datos del cliente, en la parte superior izquierda
    // El título de este apartado es "Cliente", y se alinea a la izquierda
    // El título debe tener un fondo gris claro
    doc.setFillColor(240, 240, 240); // Color de fondo
    doc.rect(20, 62, 50, 8, 'F'); // Dibuja el rectángulo
    doc.setFontSize(12); // Tamaño de letra
    doc.setTextColor(0, 0, 0); // Color de texto
    doc.text('Cliente', 22, 68); // Añade el texto

    // Añade los datos del cliente
    // Nombre, dirección, teléfono, email
    doc.setFontSize(10); // Tamaño de letra más pequeño para los datos
    doc.setTextColor(0, 0, 0); // Color de texto
    doc.text('Nombre:', 22, 78); // Añade margen al texto
    doc.text('Dirección:', 22, 83); // Añade margen al texto
    doc.text('Teléfono:', 22, 88); // Añade margen al texto
    doc.text('Email:', 22, 93); // Añade margen al texto
    // Añade los datos reales del cliente
    doc.setTextColor(0, 0, 0); // Color de texto
    doc.text(quote.nombres + '' + quote.apellidos, 52, 78); // Añade margen al texto
    doc.text(contact?.direccion + '', 52, 83); // Direccion - Añade margen al texto
    doc.text(contact?.telefono + '' , 52, 88); // Telefono - Añade margen al texto
    doc.text(contact?.email + '' , 52, 93); // Email - Añade margen al texto
    

 
   // Añade la tabla de contenido don jspdf-autotable

   const columns = [
    { title: "Producto", dataKey: "producto" },
    { title: "Descripción", dataKey: "descripcion" },
    { title: "P.Uni.", dataKey: "p_unitario" },
    { title: "Cant.", dataKey: "cantidad" },
    { title: "Subtotal", dataKey: "subtotal" },
  ];

  
   autoTable(doc, {
    head: [columns],
    body: products.map((product) => {
        return [
          product.producto,
          product.descripcion,
          product.p_unitario.toFixed(2),
          product.cantidad,
          product.subtotal.toFixed(2),
        ];
      }),
      foot: [['', '', 'Total', 'S/.', quote.total.toFixed(2)]],

    startY: 100, // Inicia la tabla 60 unidades hacia abajo desde el inicio de la página
    margin: { top: 10, right: 20, bottom: 50, left: 20 }, // Establece los márgenes de la tabla

   });


   // Obtener la posición Y después de la tabla
  const finalY = (doc as any).lastAutoTable.finalY + 10;

  // Añadir la sección de observaciones
  doc.setFontSize(12);
  doc.setFillColor(240, 240, 240); // Color de fondo
  doc.rect(20, finalY, 50, 8, 'F'); // Dibuja el rectángulo
  doc.setTextColor(0, 0, 0); // Color de texto
  doc.text('Observaciones', 22, finalY + 6); // Añade el texto

  // Añade las observaciones
  doc.setFontSize(10); // Tamaño de letra más pequeño para los datos
  doc.setTextColor(0, 0, 0); // Color de texto
  let y = finalY + 15;


  // recorrer el arreglo 'observaciones' y agregar cada observación
  observaciones.observaciones.forEach((obs) => {
    const fecha = new Date(obs.created_at);
    doc.text(`${obs.item}. ${obs.observacion} (${fecha.toLocaleDateString()})`, 22, y);
    y += 5;  });







  
   




   // Agregar paginación y pie de página a todas las páginas con un bucle
    const pageCount = (doc as any).getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
          doc.setPage(i);


          // Agregar línea horizontal en el pie de página
          const pageHeight = doc.internal.pageSize.getHeight();
          doc.line(20, pageHeight - 28, doc.internal.pageSize.getWidth() - 20, pageHeight - 28);

        // Agregar datos al pie de página
          const footer = 'Razón Social: V&D COSMOS SRL | Cuenta Empresarial Interbank: 5233004722741 | CCI: 003 523 00300472274185';
          doc.setFontSize(9); 
          doc.text(footer, 20, pageHeight - 22); 

          // Agregar paginación
          doc.text('Página ' + i + ' de ' + pageCount, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 17, { align: 'center' });
    }



 
   // Guarda el archivo PDF con el nombre quote.id_serie
   doc.save(`${quote.ordenType}_VC-0 ${quote.id_serie}.pdf`);
};
