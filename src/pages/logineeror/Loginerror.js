import Topbar from '../../components/topbar/Topbar';
import './Loginerror.scss';
import CloseIcon from '@mui/icons-material/Close';

const Loginerror = ()=>{
    return(
        <div className="loginerror">
            <Topbar/>
            <div className='box'>
                <CloseIcon className='icon'/>
                <p>Unable to login using this QR code. Please contact the manager for a correct one</p>
            </div>
        </div>
    )
}

export default Loginerror;