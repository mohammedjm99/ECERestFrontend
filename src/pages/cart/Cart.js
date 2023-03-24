import Navbar from "../../components/navbar/Navbar";
import Topbar from "../../components/topbar/Topbar";
import './Cart.scss';
import { useDispatch, useSelector } from "react-redux";
import {deleteProduct,controlQuantity,clear} from '../../redux/cartSlice';
import jwtDecode from "jwt-decode";
import {request} from '../../api/axiosMethods';
import { useNavigate } from "react-router-dom";


const Cart = ({ title }) => {
    const cartItems = useSelector(state=>state.persistedReducer.cart.cartItems);
    const totalPrice = cartItems.reduce((a,b)=>a+b.price*b.quantity,0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCheckout = async()=>{
        const apiProducts = cartItems.map(item=>{
            return {
                product:item._id,
                quantity:item.quantity
            }
        });
        const token = sessionStorage.getItem('token');
        const id = token ? jwtDecode(token)._id : null;
        try{
            await request.post('/order/'+id,{
                products: apiProducts
            },{
                headers: { token: `Bearer ${token}` },
            });
            dispatch(clear());
            navigate('/orders');
        }catch(e){
            dispatch(clear());
        }
    }
    return (
        <div className="cart">
            <Topbar />
            <div className="items">
                {cartItems.length === 0 
                    ? <p className="empty">Please add items to your cart...</p> 
                    : cartItems.map(item => (
                        <div className='item' key={item._id}>
                            <div className="img">
                                <img src={item.img} alt="" />
                            </div>
                            <div className="content">
                                <h4>{item.name}</h4>
                                <h3><span style={{ color: '#f54749', marginRight: '3px' }}>$</span>{item.price}</h3>
                            </div>
                            <div className="quantity">
                                <div className="control" onClick={()=>item.quantity !==10 && dispatch(controlQuantity({id:item._id,control:"increase"}))}>+</div>
                                <p>{item.quantity}</p>
                                <div className="control" onClick={()=>item.quantity === 1 ? dispatch(deleteProduct(item._id)) :dispatch(controlQuantity({id:item._id,control:"decrease"}))}>-</div>
                            </div>
                        </div>
                ))}
            </div>
            {totalPrice!==0 && 
                <div className="total">
                    <div className="texts">
                        <h3>Total:</h3>
                        <h3><span style={{ color: '#f54749', marginRight: '1px' }}>$</span>{totalPrice}</h3>
                    </div>
                    <button onClick={handleCheckout}>Checkout</button>
                </div>
            }
            <Navbar title={title} />

        </div>
    )
}

export default Cart;