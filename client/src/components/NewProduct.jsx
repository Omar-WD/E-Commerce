import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosClient } from "../axiosClient";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductProvider";

export default function NewProduct() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [sizes, setSizes] = useState([{ size: "", qty: "" }]);
  const [category1, setCategory1] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [category3, setCategory3] = useState([]);
  const { setAddedItemsCount } = useContext(ProductContext);




  // Add a new size input field
  const addSize = () => {
    setSizes([...sizes, { size: "", qty: "" }]);
  };

  // Handle changes to size input fields
  const handleSizeChange = (index, event) => {
    const values = [...sizes];
    values[index][event.target.name] = event.target.value;
    setSizes(values);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("category1", data.category1);
    formData.append("category2", data.category2);
    formData.append("category3", data.category3);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("priceBeforeDisc", data.priceBeforeDisc);
    formData.append("image", data.image[0]);
    formData.append("description", data.description);

    // Convert sizes to JSON with numbers
    const sizesWithNumbers = sizes.map((size) => ({
      size: Number(size.size),
      qty: Number(size.qty),
    }));
    formData.append("sizes", JSON.stringify(sizesWithNumbers));
    console.log('formData',formData);
    console.log('data',data);

    try {
      await axiosClient.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully");
      setAddedItemsCount((prev) => prev + 1);
      navigate("/");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const cat1 = async () => {
    try {
      const response = await axiosClient.get("/products/category1");
      setCategory1(response.data);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const cat2 = async () => {
    try {
      const response = await axiosClient.get("/products/category2");
      setCategory2(response.data);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const cat3 = async () => {
    try {
      const response = await axiosClient.get("/products/category3");
      setCategory3(response.data);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    cat1();
    cat2();
    cat3();
  }, []);

  const cat1Options = category1.map((cat1) => (
    <option key={cat1._id} value={cat1._id}>
      {cat1.value}
    </option>
  ));

  const cat2Options = category2.map((cat2) => (
    <option key={cat2._id} value={cat2._id}>
      {cat2.value}
    </option>
  ));

  const cat3Options = category3.map((cat3) => (
    <option key={cat3._id} value={cat3._id}>
      {cat3.value}
    </option>
  ));

  const handleAddToCategory1 = () => {
    const newCategory1 = prompt("Enter new category 1");
    if (
      newCategory1 &&
      newCategory1.trim() !== "" &&
      newCategory1.length < 20 &&
      newCategory1.length > 3 &&
      category1.includes(newCategory1) === false
    ) {
      axiosClient
        .post("/products/category1", { value: newCategory1 })
        .then(() => {
          cat1();
        })
        .catch((error) => {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
        });
    }
  };
  const handleAddToCategory2 = () => {
    const newCategory2 = prompt("Enter new category 2");
    if (
      newCategory2 &&
      newCategory2.trim() !== "" &&
      newCategory2.length < 20 &&
      newCategory2.length > 3 &&
      category2.includes(newCategory2) === false
    ) {
      axiosClient
        .post("/products/category2", { value: newCategory2 })
        .then(() => {
          cat2();
        })
        .catch((error) => {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
        });
    }
  };
  const handleAddToCategory3 = () => {
    const newCategory3 = prompt("Enter new category 3");
    if (
      newCategory3 &&
      newCategory3.trim() !== "" &&
      newCategory3.length < 20 &&
      newCategory3.length > 3 &&
      category3.includes(newCategory3) === false
    ) {
      axiosClient
        .post("/products/category3", { value: newCategory3 })
        .then(() => {
          cat3();
        })
        .catch((error) => {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 items-center justify-center py-6"
    >
      <div className=" inline-flex gap-4">
        <select
          className="w-[270px] h-10 p-2 rounded-md shadow-md"
          {...register("category1", { required: true })}
        >
          <option value="">Select Category 1</option>
          {cat1Options}
        </select>
        <button className=' text-2xl text-lightGray hover:text-dark' onClick={handleAddToCategory1}>+</button>
      </div>
      <div className=' inline-flex gap-4'>
      <select
        className="w-[270px] h-10 p-2 rounded-md shadow-md"
        {...register("category2", { required: true })}
      >
        <option value="">Select Category 2</option>
        {cat2Options}
      </select>
      <button className=' text-2xl text-lightGray hover:text-dark' onClick={handleAddToCategory2}>+</button>
      </div>
      <div className=' inline-flex gap-4'>
      <select
        className="w-[270px] h-10 p-2 rounded-md shadow-md"
        {...register("category3", { required: true })}
      >
        <option value="">Select Category 3</option>
        {cat3Options}
      </select>
      <button className=' text-2xl text-lightGray hover:text-dark' onClick={handleAddToCategory3}>+</button>
      </div>

      <input
        className="w-[300px] h-10 p-2 rounded-md shadow-md"
        placeholder="Product name"
        {...register("name", { required: true, maxLength: 30 })}
      />
      <input
        className="w-[300px] h-10 p-2 rounded-md shadow-md"
        placeholder="Price"
        type="number"
        {...register("price", { required: true, min: 3, max: 400 })}
      />
      <input
        className="w-[300px] h-10 p-2 rounded-md shadow-md"
        placeholder="Price before discount"
        type="number"
        {...register("priceBeforeDisc", { min: 3, max: 400 })}
      />
      {/* <input
        className="w-[300px] h-10 p-2 rounded-md shadow-md"
        placeholder="Image url"
        {...register("img", { required: true })}
      /> */}
      <input className="w-[300px] h-10 p-2 rounded-md shadow-md" type="file" {...register("image")} />

      {sizes.map((size, index) => (
        <div key={index} className="flex gap-2">
          <input
            className="w-[135px] h-10 p-2 rounded-md shadow-md"
            placeholder="Size"
            type="number"
            name="size"
            value={size.size}
            onChange={(event) => handleSizeChange(index, event)}
          />
          <input
            className="w-[135px] h-10 p-2 rounded-md shadow-md"
            placeholder="Quantity"
            type="number"
            name="qty"
            value={size.qty}
            onChange={(event) => handleSizeChange(index, event)}
          />
          <button
        type="button"
        onClick={addSize}
        className=' text-2xl text-lightGray hover:text-dark'
      >
        +
      </button>
        </div>
      ))}
      

      <input
        className="w-[300px] h-10 p-2 rounded-md shadow-md"
        placeholder="Product Description"
        {...register("description", { required: true })}
      />
      <input
        className="w-[300px] h-10 p-2 rounded-md shadow-md border-2 border-lightGreen text-lightGreen hover:bg-lightGreen hover:text-white"
        type="submit"
      />
    </form>
  );
}
