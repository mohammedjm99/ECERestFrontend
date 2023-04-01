import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Notfound from './pages/404/Notfound';
import Cart from './pages/cart/Cart';
import { Home } from "./pages/home/Home";
import Loading from './pages/loading/Loading';
import Loginerror from './pages/logineeror/Loginerror';
import Orders from './pages/orders/Orders';
import Tests from './pages/tests/Tests';

function App() {
  return (
    <div className="App" style={{ marginBottom: '85px' }}>
      <Router>
        <Routes>
          <Route path='/'>
            <Route index element={<Home title={'Home'} />} />
            <Route path='cart' element={<Cart title='Cart'/>} />
            <Route path='orders' element={<Orders title='Orders'/>} />
            <Route path='login/:id' element={<Login title='login' />} />
            <Route path='loginerror' element={<Loginerror />} />
            <Route path='*' element={<Notfound />} />
            <Route path='loading' element={<Loading title='tests' />} />
            <Route path='tests' element={<Tests title='tests' />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
