import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { Navigate } from "react-router-dom";


export default function Signin() {
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {signin,user,isLoading} = useContext(UserContext)

  const onsubmit = (data) => {
   signin(data)
  };
  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(!isLoading && user){
    return <Navigate to="/"/>
  }
  if(!isLoading && !user){
    return (
      <div className="pt-32 bg-lightGray w-full h-screen flex flex-col items-center justify-start gap-6 ">
        <h1 className=" text-4xl text-white">Signin</h1>
        <form onSubmit={handleSubmit(onsubmit)} className=" flex flex-col justify-around items-center gap-3">
          <input className="p-2 w-60 rounded-md"
            type="text"
            placeholder="username"
            {...register("username", { required: true })}
          />
          {errors.username && <span>This field is required</span>}
          <input
          className="p-2 w-60 rounded-md"
            type="password"
            placeholder="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
          <input
            className="p-1 mt-2 w-52 rounded-md bg-amber-500 text-white border-[#ffffff87] border-2"
          type="submit" />
        </form>
      </div>
    );
  }

}