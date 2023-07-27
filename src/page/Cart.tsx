import CheackOutForm from "../components/cart/CheckOutForm"
import ShoppingCart from "../components/cart/ShopingCart"


const Cart = () => {
  return (
    <div className="row">
      <div className="col-7"> 
        <ShoppingCart />
      </div>
      <div className="col-5"> 
        <CheackOutForm />
      </div>

    </div>
    
  )
}

export default Cart