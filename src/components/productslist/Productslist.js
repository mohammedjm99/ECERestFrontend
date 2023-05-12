import './Productslist.scss';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct } from '../../redux/cartSlice';
import { request } from '../../api/axiosMethods';

const Productslist = () => {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [products,setProducts] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(null);
    const [categories,setCategories] = useState(null);
    const cart = useSelector(state=>state.persistedReducer.cart.cartItems);
    useEffect(()=>{
        const fetchProducts = async()=>{
            try{
                setLoading(true);
                setError(false);
                const res = await request.get('/product');
                setLoading(false);
                setProducts(res.data);
                setFilteredProducts(res.data);
                const allCategories = ["all", ...res.data.map(product => product["category"])];
                setCategories(allCategories?.filter((c, i) => allCategories.indexOf(c) === i));
            }catch(e){
                setLoading(false);
                setError(true);
            }
        }
        fetchProducts();
    },[]);

    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('all');

    useEffect(() => {
        products && setFilteredProducts(category === "all"
            ? products.filter(product => product.name.toLowerCase().indexOf(searchText) !== -1)
            : products.filter(product => product.name.toLowerCase().indexOf(searchText) !== -1 && product.category === category));
    }, [category, searchText, products]);
    const dispatch = useDispatch();

    const handleContolCart = (item) => {
        if (cart.some(s => s._id === item._id))
            dispatch(deleteProduct(item._id));
        else
            dispatch(addProduct({ ...item, quantity: 1 }));
    }
    return (
        loading ? <p>Loading...</p> : error ? <p className='error'>Error, Please contact the manager.</p> : products &&
        <div className="productslist">
            <div className="categories">
                <div className="searchcontainer">
                    <SearchIcon />
                    <input type="text" placeholder='Search' onChange={(e) => setSearchText(e.target.value.toLowerCase())} value={searchText} />
                    <CloseIcon onClick={() => setSearchText('')} style={{ cursor: 'pointer' }} />
                </div>

                <h3 style={{ marginBottom: '10px' }}>categories</h3>

                <div className="list">
                    {categories && categories.map((c, i) => (
                        <div key={i} className={`item${category === c ? ' active' : ''}`} onClick={() => setCategory(c)}>{c}</div>
                    ))}
                </div>

            </div>

            <div className="foods">
                <h3 className="title">Foods</h3>
                <div className="wrapper">

                    {filteredProducts.length !== 0 ? filteredProducts.map(item => (
                        <div className='item' key={item._id} style={item.isVisible?{opacity:1}:{opacity:0.7}}>
                            <div className="img">
                                <img src={item.img} alt="" />
                            </div>
                            <div className="content">
                                <h3>{item.name}</h3>
                                <p>{item.category}</p>
                                <h3><span style={{ color: '#f54749', marginRight: '1px' }}>$</span>{item.price}</h3>
                                {item.isVisible?
                                    <span className='control' onClick={() => handleContolCart(item)}>{cart.some(s => s._id === item._id) ? "- Delete" : "+ Add"}</span>
                                :
                                    <h4>Currently Unvailable</h4>
                                }
                            </div>
                        </div>
                    ))
                        : <p style={{ textAlign: 'center' }}>No foods to show...</p>
                    }
                </div>

            </div>
        </div>
    )
}

export default Productslist;