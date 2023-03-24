import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { useState } from 'react';


const Tests = ()=>{
    const [input,setInput] = useState('');
    // const [data,setData] = useState('');

    const handleSetCookie = ()=>{
        Cookies.set('token',input);
    }
    const handleDecodeCookie = ()=>{
        const decoded = jwt_decode(Cookies.get('token'));
        console.log(decoded);
    }
    return(
        <div className="tests">
            <input type="text" onChange={(e)=>setInput(e.target.value)}/>
            <button onClick={handleSetCookie}>Set Cookie</button>
            <button onClick={handleDecodeCookie}>Decode Cookie</button>
        </div>
    )
}

export default Tests;