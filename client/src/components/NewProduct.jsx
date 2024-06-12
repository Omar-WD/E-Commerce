import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosClient } from "../axiosClient";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductProvider";

export default function NewProduct() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [sizes, setSizes] = useState([{ size: "", qty: "" }]);
  const [categories, setCategories] = useState({ category1: [], category2: [], category3: [] });
  const { setAddedItemsCount } = useContext(ProductContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response1 = await axiosClient.get("/products/category1");
      const response2 = await axiosClient.get("/products/category2");
      const response3 = await axiosClient.get("/products/category3");
      setCategories({ category1: response1.data, category2: response2.data, category3: response3.data });
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  const addCategory = async (categoryType) => {
    const newCategory = prompt(`Enter new ${categoryType} category`);
    if (
      newCategory &&
      newCategory.trim() !== "" &&
      newCategory.length < 20 &&
      newCategory.length > 2 &&
      categories[categoryType].find((cat) => cat.value === newCategory) === undefined
    ) {
      try {
        await axiosClient.post(`/products/${categoryType}`, { value: newCategory });
        fetchCategories();
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
      }
    }
  };

  const handleAddToCategory = (categoryType) => {
    addCategory(categoryType);
  };

  const addSize = () => {
    setSizes([...sizes, { size: "", qty: "" }]);
  };

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

  const categoryOptions = (categoryList) =>
    categoryList.map((category) => (
      <option key={category._id} value={category._id}>
        {category.value}
      </option>
    ));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 items-center justify-center py-6"
    >
      <div className="inline-flex gap-4">
        <select
          className="w-[270px] h-10 p-2 rounded-md shadow-md"
          {...register("category1", { required: true })}
        >
          <option value="">Select Category 1</option>
          {categoryOptions(categories.category1)}
        </select>
        <button
          className="text-2xl text-lightGray hover:text-dark"
          onClick={() => handleAddToCategory("category1")}
        >
          +
        </button>
      </div>
      <div className="inline-flex gap-4">
        <select
          className="w-[270px] h-10 p-2 rounded-md shadow-md"
          {...register("category2", { required: true })}
        >
          <option value="">Select Category 2</option>
          {categoryOptions(categories.category2)}
        </select>
        <button
          className="text-2xl text-lightGray hover:text-dark"
          onClick={() => handleAddToCategory("category2")}
        >
          +
        </button>
      </div>
      <div className="inline-flex gap-4">
        <select
          className="w-[270px] h-10 p-2 rounded-md shadow-md"
          {...register("category3", { required: true })}
        >
          <option value="">Select Category 3</option>
          {categoryOptions(categories.category3)}
        </select>
        <button
          className="text-2xl text-lightGray hover:text-dark"
          onClick={() => handleAddToCategory("category3")}
        >
          +
        </button>
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
      <input className="w-[300px] h-10 p-2 rounded-md shadow-md" type="file" {...register("image",{required:true})} />

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
