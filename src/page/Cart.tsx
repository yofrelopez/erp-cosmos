import CheackOutForm from "../components/cart/CheckOutForm"
import ShoppingCart from "../components/cart/ShopingCart"


const Cart = () => {
  return (
    <div className="row container">
      <div className="col-12 col-lg-7"> 
        <ShoppingCart />
      </div>
      <div className="col-12 col-lg-5"> 
        <CheackOutForm />
      </div>

    </div>
    
  )
}

export default Cart