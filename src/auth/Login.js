import { useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { request } from '../api/axiosMethods';

const Login = ()=>{
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        const fetch = async () => {
            try {
                const res = await request.get('/auth/login/' + id);
                sessionStorage.setItem('token',res.data);
                navigate('/');
            } catch (e) {
                sessionStorage.removeItem('token'); 
                navigate('/login/error');
            }
        }
        fetch();
    },[id,navigate]);
}

export default Login;