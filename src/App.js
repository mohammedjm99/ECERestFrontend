import {BrowserRouter as Router , Routes , Route, useLocation} from 'react-router-dom';
import Login from './auth/Login';
import { Requiretable } from './auth/Require';
import Notfound from './pages/404/Notfound';
import Cart from './pages/cart/Cart';
import { Home } from "./pages/home/Home";
import Loading from './pages/loading/Loading';
import Loginerror from './pages/logineeror/Loginerror';
import Orders from './pages/orders/Orders';
import Tests from './pages/tests/Tests';

function App() {
  return (
    <div className="App" style={{marginBottom:'75px'}}>
      <Router>
        <Routes>
          <Route path='/'>
            <Route index element={<Requiretable><Home title={'Home'}/></Requiretable>}/>
            <Route path='/cart' element={<Requiretable><Cart title='Cart'/></Requiretable>}/>
            <Route path='/orders' element={<Requiretable><Orders title='Orders'/></Requiretable>}/>
            <Route path='/login/:id' element={<Login title='login'/>}/>
            <Route path='/loginerror' element={<Loginerror/>}/>
            <Route path='/*' element={<Notfound/>}/>
            <Route path='/loading' element={<Loading title='tests'/>}/>
            <Route path='/tests' element={<Tests title='tests'/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
