import { useEffect, useState } from "react";
import { request } from "../../api/axiosMethods";
import Navbar from "../../components/navbar/Navbar";
import Topbar from "../../components/topbar/Topbar";
import './Orders.scss';
import jwtDecode from "jwt-decode";


const Orders = ({ title, socket }) => {
    const token = sessionStorage.getItem('token') || null;
    const [orders, setOrders] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                setError(false);
                const res = await request.get('/order/user/' + jwtDecode(token)._id, {
                    headers: { token: `Bearer ${token}` },
                });
                setLoading(false);
                setOrders(res.data);
            } catch (e) {
                setLoading(false);
                setError(true)
            }
        }
        fetch();
    }, [token]);

    useEffect(() => {
        socket.on('changeStatus', data => {
            setOrders(prevOrders => prevOrders && prevOrders.map(order => order._id === data._id ? data : order));
        });

        socket.on('removeOrder', ({id,table}) => {
            try{
                const token = sessionStorage.getItem('token');
                const decoded = jwtDecode(token);
                if(decoded._id===table){
                    setOrders(prevOrders => prevOrders && prevOrders.filter(order => order._id !== id ));
                }
            }catch(e){
            }
        });
    }, []);
    
    return (
        <div className="orders">
            <Topbar />
            {loading && <p>Loading...</p>}
            {error && <p className="empty">You are not allowed to order, please contact the restaurant management to provide you a QR code.</p>}
            <div className="orderswrapper">
                {orders && (orders.length !== 0 ? orders.map((order, i) => (
                    <div className="order" key={order._id}>

                        <h2>Order <span>#{i + 1}</span></h2>
                        {order.products.map((el, i) => (
                            <div className="food" key={i}><p>{el.name} <span>${el.price}</span></p> <p>x{el.quantity}</p><hr /></div>
                        ))}

                        <div className="total">Total: <span>${order.products.reduce((a, b) => a + b.price * b.quantity, 0)}</span></div>

                        {order.status === 0 ? <div className="status" style={{ color: '#F29339', borderColor: '#F29339' }}>pending</div> :
                            order.status === 1 ? <div className="status" style={{ color: '#007E33', borderColor: '#007E33' }}>accepted</div> :
                                order.status === 2 ? <div className="status" style={{ color: '#0099CC', borderColor: '#0099CC' }}>completed</div> :
                                    order.status === 3 ? <div className="status" style={{ color: '#FF5733', borderColor: '#FF5733' }}>rejected, please order again.</div> :
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