import { useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { request } from '../api/axiosMethods';

const Login = ()=>{
    const {id} = useParams();
    const navigate = useNavigate();
    console.log('1')
    useEffect(()=>{
        const fetch = async () => {
            try {
                console.log('2');
                const res = await request.get('/auth/login/' + id);
                console.log('3');
                sessionStorage.setItem('token',res.data);
                console.log('4');
                navigate('/');
            } catch (e) {
                sessionStorage.removeItem('token'); 
                navigate('/loginerror');
            }
        }
        fetch();
    },[id,navigate]);
}

export default Login;