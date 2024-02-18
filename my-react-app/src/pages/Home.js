import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../App.css';



const Home = () => {
  
  const [addToCart, setAddToCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState();
  const [userId, setUserId] = useState();
  const [search, setSearch] = useState();
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [filterValue, setFilterValue] = useState(12);

  useEffect(()=>{
    const fetchData = async ()=>{
      const res = await axios.get('https://dummyjson.com/products');
      setProducts(res.data.products);   
    }
   
   const userId =  localStorage.getItem('userId');
   setUserId(userId);
   const userName =  localStorage.getItem('name');
   setName(userName);
   fetchData();
  },[]);


  const handleSearch = async(e)=>{
    e.preventDefault();
    const res = await axios.get(`https://dummyjson.com/products/search?q=${search}`)
    
    setProducts(res.data.products);
    setSearch('');
  }


const handleAddToCart = async(id,e)=> {
    
    e.preventDefault();
    const newItem = { id: id, quantity: 1 };
    setAddToCart(prevCart => [...prevCart, newItem]);
    const updatedCart = [...addToCart, newItem];


    
    if(addToCart) {
      
    const res = await axios.post('https://dummyjson.com/carts/add', {
    userId: userId,
    products: updatedCart 
  })
    setTotal(res.data.total);
    } else {
      console.error('addToCart is empty');
    }

    setCartCount(prevCount => prevCount + 1);
  }


  const handleFilter = (e) => {
    const filtered = products.filter(product => product.price <= filterValue);
    setProducts(filtered); 
  };
  

  return (
    <>
{/* search bar */}
    <div className='search_div'>
      <h3>logo</h3>
      
      <div >
      <input type='text' className="searchBar" placeholder='Search Product' value={search} onChange={(e)=>setSearch(e.target.value)}/>
      <button onClick={handleSearch} className="searchBtn">Search</button></div>
      <div className='basket_user'>
      <div style={{marginRight:'20px'}}>
      <span className='totalPrice'>${total}</span>
     <span className='basket'>{cartCount}</span>
      <i className="bi bi-basket-fill custom-icon"></i>
      </div>
      {name ? <h5>Hi {name}</h5> : ''}
      </div>
    </div>

{/* price filter */}
  <div className='price_heading'>
    <h5>Price Filter</h5>
      <span>$12</span>
      <input type='range' min='12' max='1800' step='1' value={filterValue} onChange={(e)=> setFilterValue(e.target.value)} />
      <span>$1800</span>
      <h6>${filterValue}</h6>
      <button className='searchBtn' onClick={handleFilter}>Apply</button>
  </div>




  {/* all products */}
    <div className='main'>
       {products && products.map((product)=>
        <div className="card" style={{width:'16rem', height:'25rem', margin:'12px 0px'}} key={product.id}>
  <img src={product.thumbnail} className="card-img-top" style={{height:'12rem'}} alt="porduct_image" />
  <div className="card-body">
  <h5 className="card-title">{product.title}</h5>
  <h6 className="card-title">{product.brand}</h6>
  <h5 className="card-title">${product.price} <span style={{color:'grey', fontSize:'15px', float:'right'}}>Rating : {product.rating}</span></h5>
    
    <button className="btn btn-success" onClick={(e)=>handleAddToCart(product.id,e)} >Add To Cart</button>
  </div>
</div>
       )}
       </div>
    </>
  )
}

export default Home