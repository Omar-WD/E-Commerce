/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { axiosClient } from '../axiosClient';

export const OrderContext = createContext();

export default function OrderProvider({children}) {
    const [order, setOrder] = useState([]);
    const [externalOrders, setExternalOrders] = useState([]);
    const [documentOverflow, setDocumentOverflow] = useState('auto');
    const [SideCartDisplay, setSideCartDisplay] = useState("hidden");
    const [sideCartIsOppened, setSideCartIsOppened] = useState(false);
    const [invoiceSettled, setInvoiceSettled] = useState(false);
    const [orderStatusChangeCount,setOrderStatusChangeCount]=useState(0);

  

    useEffect(() => {
        const orderData = sessionStorage.getItem('order');
        if (orderData) {
            setOrder(JSON.parse(orderData));
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('order', JSON.stringify(order));
    }, [order]);

    useEffect(() => {
            document.body.style.overflow = documentOverflow;
    }, [documentOverflow, setDocumentOverflow]);


    useEffect(() => {
        const fetchExternalOrders = async () => {
            try {
                const response = await axiosClient.get('/orders');
                setExternalOrders(response.data);
            } catch (error) {
                console.error('Error fetching external orders:', error);
            }
        };
        fetchExternalOrders();
    }
    , [setExternalOrders, invoiceSettled,orderStatusChangeCount]);





  return (
    <OrderContext.Provider value={{order,setOrder,setDocumentOverflow,SideCartDisplay,setSideCartDisplay,sideCartIsOppened, setSideCartIsOppened,externalOrders,setInvoiceSettled,setOrderStatusChangeCount}}>
        {children}
    </OrderContext.Provider>
  )
}
