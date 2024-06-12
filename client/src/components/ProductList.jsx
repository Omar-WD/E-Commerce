/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import Product from "./Product"
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../context/OrderProvider";
import { FaBars } from "react-icons/fa";
import FilterTools from "./FilterTools";
import { UserContext } from "../context/UserProvider";


// eslint-disable-next-line react/prop-types
export default function ProductList({category2,products}) {
  const [bgColorandOpacity, setBgColorandOpacity] = useState('')
  const [filterDispaly, setFilterDispaly] = useState('hidden')
  const location=useLocation()
  const currentLocation = location.pathname
  const {sideCartIsOppened}=useContext(OrderContext)
  const {user}=useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState([])
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const max_price = queryParams.get('max_price');
  const shoes_type = queryParams.get('shoes_type');


  useEffect(() => {
    let updatedProducts = products;
  
    if (category2) {
      updatedProducts = updatedProducts.filter(product => product.category2.value === category2);
    }
    if (max_price) {
      updatedProducts = updatedProducts.filter(product => product.price <= Number(max_price));
    }if(currentLocation === "/sale"){
      updatedProducts = updatedProducts.filter(product => product.priceBeforeDisc !== 0);
    }if(currentLocation === `/${category2}`){
      updatedProducts = updatedProducts.filter(product => product.category2.value === category2);
    }
    if(shoes_type){
      updatedProducts = updatedProducts.filter(product => product.category1.value === shoes_type);
    }
    if(!user ){
      updatedProducts = updatedProducts.filter(product => product.sizes.map(size=>size.qty).reduce((acc,qty)=>acc+qty,0)>0 );
    }
  
    setFilteredProducts(updatedProducts);
    setLoading(false);
    
  }, [category2, max_price, products,currentLocation,shoes_type,user]);
  



  useEffect(() => {
    if (sideCartIsOppened){
      setBgColorandOpacity('bg-black bg-opacity-20')
    }else{
      setBgColorandOpacity('bg-white bg-opacity-100')
    }
  }, [sideCartIsOppened])

  if(loading){
    return <div className="w-5/6 mx-auto px-16 py-16 my-12">Loading...</div>
  }else{


  return (
    <div className= {`${bgColorandOpacity} w:auto md:w-5/6 mx-4 md:mx-auto min-h-[75vh] px-4  sm:px-16 py-8  my-7 md:my-14`} >
        <h1 className=" text-4xl sm:text-5xl md:text-7xl font-bold text-lightGreen pb-6 sm:pb-8 ">{location.pathname.split("/")[1].charAt(0).toUpperCase()+location.pathname.split("/")[1].slice(1) || "Shop"}</h1>
        <div className="pb-10 sm:pb-20 flex flex-row flex-wrap items-center gap-4">
          <button onClick={()=>setFilterDispaly("block")} className=" bg-lightGreen text-white text-sm md:text-base md:w-48 h-10 px-4 font-semibold font-sans inline-flex items-center gap-2 "><FaBars /> FILTER SHOES</button>
          <span className=" text-lighterGreen text-md md:text-lg pl-3 md:pl-6 font-bold">Showing all {filteredProducts.length} results {shoes_type?<span>of type: <span className=" text-lightGreen">{shoes_type}</span></span>:""}</span>
        </div>
        <div className=" grid grid-cols-2 sm:grid-cols-3 gap-6 justify-between ">
            
        {filteredProducts.map((product,id)=>{
            return <Product key={id} product={product}/>
        }
        )}
        
        {user &&<div onClick={()=>navigate("/new-product")} className=" bg-red-700 h-32 w-32 justify-self-center  my-auto sm:my-8 md:my-14 lg:my-20 xl:my-24  flex flex-col items-center justify-center rounded-full xxl:rounded-md border-2 border-red-600  hover:cursor-pointer hover:bg-red-600">
          <span className="bg-white text-red-600 rounded-full h-10  md:h-20 w-10  md:w-20 text-[1.75rem] md:text-[3.5rem] text-center  ">+</span>
        </div>}
        </div>
        <FilterTools filteredProducts={filteredProducts} filterDispaly={filterDispaly} setFilterDispaly={setFilterDispaly} />
    </div>
  )
}
}
