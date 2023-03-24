import './Topbar.scss';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';

const Topbar = ()=>{
    const token = sessionStorage.getItem('token');
    const [table,setTable] = useState(null);
    useEffect(()=>{
        const set = ()=>{
            try{
                setTable(jwtDecode(token));
            }catch(e){
                setTable(null);
            }
        }
        set();
    },[token])
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