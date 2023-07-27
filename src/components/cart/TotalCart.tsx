
import { useContext, useEffect } from 'react';
import { CartContext } from "../../context/cart/CartContext";
import { IItem } from "../../interface/interfaces";
import { FC } from 'react';


interface Props {
    cart: IItem[] | [];
}



const TotalCart:FC<Props> = ({cart}) => {

    const { setTotalCart } = useContext(CartContext);

    let subtotales = cart.map( item => item.subTotal);

    let total = subtotales.reduce((acumulador: number, subTotal: number) => {
        return acumulador + Number(subTotal);
    }, 0);

    useEffect(() => {
      if(cart.length > 0){
        setTotalCart(total);
      }
    }, [cart, total, setTotalCart]);

  return (
    <tr className="lead">
        <td colSpan={3}> </td>
        <td> <strong> Total </strong> </td>
        <td> <strong> {`S/.${total.toFixed(2)}`} </strong> </td>
        <td></td>
    </tr>
  )
}

export default TotalCart