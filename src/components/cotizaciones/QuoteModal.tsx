import React, { useState, ReactNode, useEffect, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { modalQuote } from '../../interface/interfaces';
import { supabase } from '../../supabase/client';
import { AuthContext } from '../../context/auth/AuthContext';
import { generatePDF } from '../../utils/pdfGenerator';
import { QuoteProducts } from '../../interface/interfaces';
import { clientContact } from '../../interface/interfaces';



interface QuoteModalProps {
  buttonLabel: ReactNode;
  className?: string;
  quote: modalQuote;
  contactClient?: clientContact;
}



const QuoteModal: React.FC<QuoteModalProps> = ({ buttonLabel, className, quote }) => {

  const { isLoggedIn } = useContext(AuthContext)

  const [products, setProducts] = useState<QuoteProducts[] | [] >([])

  const [contact, setContact] = useState<clientContact | undefined>(undefined)

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

  // hacer una consulta a supabase para traer de la tabla cientes, el telefono, el email y la direccion del cliente que coincida con el id_cliente de la tabla ordenes
  const fetchContact = async () => {

    const { data, error } = await supabase
      .from('clientes')
      .select('telefono, email, direccion')
      .eq('id_cliente', quote.id_cliente)
    if (error) {
      console.log(error)
      return
    }
    setContact(data?.[0] as clientContact)
  }
  
  
  useEffect(() => {
    if(isLoggedIn){
      fetchData()
      fetchContact()
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
          <div className='row d-flex'>
            <p className='col-6 mb-0'> <b>Nombre:</b> {quote.nombres} {quote.apellidos}</p>
            <div className='d-flex col-6 mb-0'>
              <p className='pe-4 mb-0'><b>DNI/RUC: </b>{quote.id_cliente}  </p>
              <p className='mb-0'><b>Teléfono: </b> {contact?.telefono}</p>
            </div>
            <div className='d-flex col-6'>
              <p><b>Email: </b> {contact?.email}</p>
            </div>
            <div className='col-6'>
              <p className='mb-0'><b>Dirección: </b> {contact?.direccion}</p>
              <p className='col-6' > <b>Fecha: </b> {date.toLocaleString()}</p>
            </div>
          </div>

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
          <Button color="primary" onClick={()=>generatePDF(quote, products, contact)}>Descargar PDF</Button>
          <h5>Total: S/.{quote.total.toFixed(2)}</h5>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default QuoteModal;
