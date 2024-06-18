/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { axiosClient } from "../axiosClient";
import { useNavigate } from "react-router-dom";


export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [signedIn, setSignedIn] = useState(false);
  const navigate=useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosClient.get("/users/profile");
        setUser(response.data);
        setSignedIn(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        if (error.response && error.response.status === 401) {
          // Unauthorized, handle as needed (clear user data, set signedIn false)
          setUser(null);
          setSignedIn(false);
        }
        setIsLoading(false);
      }
    };
  
    if (signedIn) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [signedIn]);
  

  const signin = (data) => {
    axiosClient
      .post("/users/signin", data,{ withCredentials: true},{credentials: 'include'}, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setUser(res.data);
        setSignedIn(true);
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const signup = (data) => {
    axiosClient
      .post("/users/signup", data)
      .then((res) => {
        setUser(res.data);
        setSignedIn(true);
        setIsLoading(false);        
        navigate("/");
      })
      .catch((err) => {
          setIsLoading(false);
        console.log('err',err);
      });
  };

  const signout=()=>{
    axiosClient
    .post('/users/signout')
    .then(()=>{
      setUser(null)
      setSignedIn(false);
      setIsLoading(false);
      navigate('/')
    })
    .catch((err)=>{
      setIsLoading(false);
      console.log(err);
    })
  }



  return (
    <UserContext.Provider value={{signin,signup,signout, user, setUser,signedIn, setSignedIn,isLoading }}>
      {children}
    </UserContext.Provider>
  );
}