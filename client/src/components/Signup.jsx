import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { Navigate } from "react-router-dom";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, user, isLoading } = useContext(UserContext);

  const onsubmit = (data) => {
    signup(data);
  };
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!isLoading && !user) {
    return <Navigate to="/signin" />;
  }
  if (!isLoading && user) {
    return (
      <div className="pt-32 bg-lightGray w-full h-screen flex flex-col items-center justify-start gap-6 ">
        <h1 className=" text-4xl text-white">Signup</h1>
        <form
          onSubmit={handleSubmit(onsubmit)}
          className=" flex flex-col justify-around items-center gap-3"
        >
          <input
            className="p-2 w-60 rounded-md"
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {errors.name && <span>This field is required</span>}
          <input
            className="p-2 w-60 rounded-md"
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          {errors.name && <span>This field is required</span>}
          <input
            className="p-2 w-60 rounded-md"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
          <select
            className="p-2 w-60 rounded-md role-select"
            {...register("role", { required: true })}
          >
            <option value="" selected disabled>
              Role
            </option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {errors.role && <span>This field is required</span>}
          <input
            className="p-1 mt-2 w-52 rounded-md bg-red-600 text-white border-[#ffffff87] border-2 hover:cursor-pointer hover:duration-1000 hover:ease-out hover:bg-red-800"
            type="submit"
          />
        </form>
      </div>
    );
  }
}
