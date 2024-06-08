/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import  {axiosClient}  from '../axiosClient';
import { OrderContext } from './OrderProvider';
import { useNavigate } from 'react-router-dom';

export const ProductContext = createContext();

export default function ProductProvider({children}) {
    let [productsBeforeFilter, setProductsBeforeFilter] = useState([]);
    let [products, setProducts] = useState([]);
    let [addedItemsCount, setAddedItemsCount] = useState(0);
    let [addSizeCount, setAddSizeCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleDeleteProduct = async (id) => {
        try {
            await axiosClient.delete(`/products/${id}`);
            setProducts(products.filter((product) => product._id !== id));
            navigate('/');
        } catch (error) {
            console.error('handleDeleteProduct -> error', error);
        }
    }

    const { order } = useContext(OrderContext);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosClient.get('/products', { withCredentials: false });
                setProductsBeforeFilter(response.data);
                await setProducts(productsBeforeFilter.filter(product => product.isDeleted === false) );
                setLoading(false);
            } catch (error) {
                console.error('fetchProducts -> error', error);
            }
        };
        fetchProducts();
    }, [addedItemsCount, order,addSizeCount,productsBeforeFilter]);

    
  return (
    <ProductContext.Provider value={{products,setAddedItemsCount,handleDeleteProduct,loading,setLoading,setAddSizeCount}}>
        {children}
    </ProductContext.Provider>
  )
}