import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../pages/loading/Loading";
import { request } from "../api/axiosMethods";

export const Requiretable = ({children})=>{
    const [show,setShow] = useState(false);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    useEffect(()=>{
        const fetch = async()=>{
            try{
                await request.get('/auth/requiretable',{
                    headers: { token: `Bearer ${token}` }
                })
                setShow(true);
            }catch(e){
                setShow(false);
                navigate('/404');
            }
        }
        fetch();
    },[token,navigate]);
    return(
        show ? children : <Loading/>
    )
}