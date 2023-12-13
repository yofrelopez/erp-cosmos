import { Row } from '@tanstack/table-core';

// Definir una interfaz para tus datos, si aún no lo has hecho
interface MyDataType {
  created_at: string; // Asumiendo que esta es una fecha en formato string
  // ... otros campos de tus datos
}

// Función de filtro por mes y año
export function filterByMonth(rows: Row<MyDataType>[], columnId: string, filterValue: { month: number, year: number }) {
  return rows.filter(row => {
    const rowValue = row.getValue(columnId);
    const rowDate = new Date(rowValue as string);
    return rowDate.getMonth() === filterValue.month && rowDate.getFullYear() === filterValue.year;
  });
}
