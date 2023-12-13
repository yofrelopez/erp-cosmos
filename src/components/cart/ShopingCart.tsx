import ListCart from "./ListCart";
import { useContext } from "react";
import { CartContext } from "../../context/cart/CartContext";
import { IItem } from "../../interface/interfaces";
import TotalCart from "./TotalCart";






const ShoppingCart = () => {


  const { cart } = useContext(CartContext)  as { cart: IItem[] | [] }   ;

  console.log('first cart', cart)


  return (
    <div className="container">
      <h1 className="text-center mb-4">Carrito de Compras</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Descripción</th>
            
            <th>P.Un.</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            cart ?
            cart.map( item => (
              <ListCart key={item.id} item={item} />
            ))
            :
            false
          }
          <TotalCart cart={cart}/>
          
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingCart;
