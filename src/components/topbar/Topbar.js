import './Topbar.scss';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import jwtDecode from 'jwt-decode';

const Topbar = ()=>{
    const token = sessionStorage.getItem('token');
    const table = token ? jwtDecode(token) : null;
    return(
        <div className="topbar">
            <div className="logo">
                <LocalDiningIcon className='icon'/>
                <h1>ECE Rest.</h1>
            </div>
            {table && <p>Table Number{table.number}</p>}
        </div>
    )
}

export default Topbar