import Navbar from "../../components/navbar/Navbar";
import Topbar from "../../components/topbar/Topbar";
import './Cart.scss';
import { useDispatch, useSelector } from "react-redux";
import {deleteProduct,controlQuantity,clear} from '../../redux/cartSlice';
import jwtDecode from "jwt-decode";
import {request} from '../../api/axiosMethods';
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const Cart = ({ title ,socket}) => {
    const cartItems = useSelector(state=>state.persistedReducer.cart.cartItems);
    const totalPrice = cartItems.reduce((a,b)=>a+b.price*b.quantity,0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');

    const handleCheckout = async()=>{
        const apiProducts = cartItems.map(item=>{
            return {
                product:item._id,
                quantity:item.quantity
            }
        });
        const token = sessionStorage.getItem('token') || null;
        try{
            setLoading(true);
            setError('')
            const res = await request.post('/order/'+jwtDecode(token)._id,{
                products: apiProducts
            },{
                headers: { token: `Bearer ${token}` },
            });
            setLoading(false);
            dispatch(clear());
            socket.emit("addOrder",res.data);
            navigate('/orders');
        }catch(e){
            setLoading(false);
            if(e.response?.status === 403){
                sessionStorage.removeItem('token');
                setError("invalid token");
            }
            if(e.message==='Invalid token specified') setError('You are not allowed to order, please contact the restaurant management to provide you a QR code.');
            else if(e.message==='Request failed with status code 400') setError(e.response.data);
            else if(e.message==='Request failed with status code 403') setError("session expired");
            else setError('internal server error');
            console.log(e);
        }
    }
    return (
        <div className="cart">
            <Topbar />
            <div className="items">
                {cartItems.length === 0 
                    ? <p className="empty">Cart is empty.</p> 
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
                    <button onClick={handleCheckout} disabled={loading}>Checkout</button>
                    {error && <p className="empty">{error}</p>}
                </div>
            }
            <Navbar title={title} />

        </div>
    )
}

export default Cart;