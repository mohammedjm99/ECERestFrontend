import './Navbar.scss';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ListIcon from '@mui/icons-material/List';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = ({title}) => {
    const {cartAmount} = useSelector(state=>state.persistedReducer.cart);
    return (
        <div className="navbar">
            <div className="wrapper">
                <Link to='/' className={`${title === 'Home' ? 'active' : ''}`}>{title === 'Home' ? <HomeIcon className='icon'/> : <HomeOutlinedIcon className='icon'/>}</Link>
                <Link to='/cart' className={`cart${title === 'Cart' ? ' active' : ''}`}>
                    <span>{cartAmount}</span>{title === 'Cart' ? <ShoppingCartIcon className='icon'/> : <ShoppingCartOutlinedIcon className='icon'/>}
                </Link>
                <Link to='/orders' className={`${title === 'Orders' ? 'active' : ''}`}><ListIcon className='icon' /></Link>
            </div>

        </div>
    )
}

export default Navbar;