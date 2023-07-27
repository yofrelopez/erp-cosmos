import React, { useState, ReactNode, useEffect, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { modalQuote } from '../../interface/interfaces';
import { supabase } from '../../supabase/client';
import { AuthContext } from '../../context/auth/AuthContext';
import { generatePDF } from '../../utils/pdfGenerator';
import { QuoteProducts } from '../../interface/interfaces';



interface QuoteModalProps {
  buttonLabel: ReactNode;
  className?: string;
  quote: modalQuote;
}



const QuoteModal: React.FC<QuoteModalProps> = ({ buttonLabel, className, quote }) => {

  const { isLoggedIn } = useContext(AuthContext)

  const [products, setProducts] = useState<QuoteProducts[] | [] >([])

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);



  const fetchData = async () => {
    //hacer una consulta a supabase para traer los productos que coicidan con la columna id_orden de la tabla ordenes
    // los productos están en la tabla items_orden tienen un id_orden y tienen la clave foranea id_orden de la orden igual al quote.id_orden
    // la data que se trae de supabase es un array de objetos, cada objeto es un producto del tipo IItem
    const { data, error } = await supabase
      .from('items_orden')
      .select('*')
      .eq('id_orden', quote.id_orden)
    if (error) {
      console.log(error)
      return
    }
    setProducts(data as QuoteProducts[])

  }
  
  
  useEffect(() => {
    if(isLoggedIn){
      fetchData()
    }
  }, [isLoggedIn])

  const date = new Date(quote.created_at)
  

  return (
    <div>
      <Button className='btn-sm' color="light" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} size='xl' className={className}>
        <ModalHeader toggle={toggle}>Cotización ID: {quote.id_serie}</ModalHeader>
        <ModalBody>
          <h5>Información del Cliente</h5>
          <p>Nombre: {quote.nombres} {quote.apellidos}</p>
          <p>DNI/RUC: {quote.id_cliente}</p>
          <p>Fecha: {date.toLocaleString()}</p>

          <h5>Productos</h5>
          <Table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Descripción</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {
                products.length === 0 ?
                 <tr><td colSpan={5}>No hay productos</td></tr>
                :
                products?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.producto}</td>
                    <td>{item.descripcion}</td>
                    <td>{`S/.${item.p_unitario.toFixed(2)}`}</td>
                    <td>{item.cantidad}</td>
                    <td>{`S/.${item.subtotal.toFixed(2)}`}</td>
                  </tr>
              ))}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter className='d-flex justify-content-between'>
          
          <Button color="warning" onClick={toggle}>Cerrar</Button>
          <Button color="primary" onClick={()=>generatePDF(quote, products)}>Descargar PDF</Button>
          <h5>Total: S/.{quote.total.toFixed(2)}</h5>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default QuoteModal;
