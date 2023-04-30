import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './auth/Login';
import Notfound from './pages/404/Notfound';
import Cart from './pages/cart/Cart';
import { Home } from "./pages/home/Home";
import Loading from './pages/loading/Loading';
import Loginerror from './pages/logineeror/Loginerror';
import Orders from './pages/orders/Orders';
import Tests from './pages/tests/Tests';
import jwtDecode from "jwt-decode";

import { Ws } from './api/socketLink';
import io from 'socket.io-client';
const socket = io(Ws);

function App() {

  const Socketconnection = () => {
    const token = sessionStorage.getItem('token');

    useEffect(() => {
      try {
        const decoded = jwtDecode(token);
        socket.emit('joinUserO', decoded._id);
      } catch (e) {}
    }, []);
    return <Outlet />
  }

  return (
    <div className="App" style={{ marginBottom: '85px' }}>
      <Router>
        <Routes>
          <Route path='/login'>
            <Route path=':id' element={<Login title='login' />} />
            <Route path='error' element={<Loginerror />} />
          </Route>
          <Route path='/' element={<Socketconnection />}>
            <Route index element={<Home title={'Home'} />} />
            <Route path='cart' element={<Cart title='Cart' socket={socket}/>} />
            <Route path='orders' element={<Orders title='Orders' socket={socket}/>} />
            <Route path='loading' element={<Loading title='tests' />} />
          </Route>
          <Route path='*' element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
