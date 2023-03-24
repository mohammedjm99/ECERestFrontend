import { useEffect, useState } from "react";
import { request } from "../../api/axiosMethods";
import Navbar from "../../components/navbar/Navbar";
import Topbar from "../../components/topbar/Topbar";
import './Orders.scss';
import jwtDecode from "jwt-decode";


const Orders = ({ title }) => {
    const token = sessionStorage.getItem('token');
    const id = token ? jwtDecode(token)._id : null;
    const [orders, setOrders] = useState(null);
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await request.get('/order/user/' + id, {
                    headers: { token: `Bearer ${token}` },
                });
                setOrders(res.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetch();
    }, [id, token]);
    console.log(orders);
    return (
        <div className="orders">
            <Topbar />
            <div className="orderswrapper">
                {orders && (orders.length !== 0 ? orders.map((order,i)=>(
                    <div className="order" key={orders[i]._id}>

                        <h2>Order <span>#{i+1}</span></h2>
                        {order.products.map(el=>(
                            <div className="food" key={el.product._id}><p>{el.product.name} <span>${el.product.price}</span></p> <p>x{el.quantity}</p><hr /></div>
                        ))}

                        <div className="total">Total: <span>${order.products.reduce((a,b)=>a+b.product.price*b.quantity,0)}</span></div>

                        {order.status === 0 ? <div className="status" style={{color:'#F29339',borderColor:'#F29339'}}>pending</div> : 
                        order.status === 1 ? <div className="status" style={{color:'#007E33',borderColor:'#007E33'}}>accepted</div> : 
                        order.status === 2 ? <div className="status" style={{color:'#0099CC',borderColor:'#0099CC'}}>completed</div> : 
                        order.status === 3 ? <div className="status" style={{color:'#FF5733',borderColor:'#FF5733'}}>rejected, please order again.</div> : 
                        ''}

                        {order.msg &&
                        <div className="msg"><span>Message from kitchen:</span> {order.msg}</div>
                        }
                    </div>
                ))
                    : <p className="empty">No orders...</p>)}
            </div>
            <Navbar title={title} />
        </div>
    )
}

export default Orders;