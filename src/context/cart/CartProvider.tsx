
import { FC, ReactNode, useState, useEffect } from 'react';
import { CartContext } from "./CartContext";
import { IItem } from "../../interface/interfaces";





interface Props {
    children: ReactNode;
}


const CartProviderCtxt:FC<Props> = ({children}) => {

  
  const [ cart, setCart ] = useState<IItem[] | []>([]);

  const [ nuevoItem, setNuevoItem ] = useState<IItem | null>(null);

  const [ totalCart, setTotalCart ] = useState<number>(0);


  const addItem = (item: IItem ) => {

    if (cart.length > 0) {

      const itemExist = cart.find( i => i.id === item.id);

      if (itemExist) {
        setCart(

          cart.map( i =>
            i.id === item.id
              ? { ...i, cantidad: i.cantidad + 1 }
              : i
          )
        );
        setNuevoItem(null);
      } else {
        setCart([...cart, item] );
        setNuevoItem(null);

      }

    } else {
      setCart([ item ]);
      setNuevoItem(null);

    }   
    
    
  };

  useEffect(() => {
    console.log('cart', cart)
    if(cart.length > 0){
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart])

  useEffect(() => {
    if(localStorage.getItem('cart')){
      setCart(JSON.parse(localStorage.getItem('cart') || '{}'));
    }
  }, [])


  const eliminarItem = (id: string) => {
    const deleteItem = cart.filter( i => i.id !== id );
    setCart(deleteItem);
  }

  const updateCantidad = (id: string, cantidad: number) => {
    const updateItem = cart.map( i => i.id === id ? { ...i, cantidad, subTotal: cantidad * i.pUnitario } : i );
    setCart(updateItem);
  }


  return (
    <CartContext.Provider value={{cart, setCart, addItem, nuevoItem, totalCart, setTotalCart,
                                  setNuevoItem, eliminarItem, updateCantidad}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProviderCtxt