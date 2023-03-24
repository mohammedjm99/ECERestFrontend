import Topbar from '../../components/topbar/Topbar';
import './Notfound.scss';

const Notfound = ()=>{
    return(
        <div className="Notfound">
            <Topbar/>
            <div className="message">
                <h1>404</h1>
                <p>Page not found</p>
            </div>
        </div>
    )
};

export default Notfound;