import Navbar from '../../components/navbar/Navbar';
import Productslist from '../../components/productslist/Productslist';
import Topbar from '../../components/topbar/Topbar';
import './Home.scss';

export const Home = ({title})=>{
    return(
        <div className="home">
            <Topbar/>
            <Productslist/>
            <Navbar title={title}/>
        </div>
    )
}