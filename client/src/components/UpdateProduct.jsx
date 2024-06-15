import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosClient } from "../axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductProvider";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [sizes, setSizes] = useState([{ size: "", qty: "" }]);
  const [categories, setCategories] = useState({category0: [], category1: [], category2: [], category3: [] });
  const { setAddedItemsCount } = useContext(ProductContext);
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosClient.get(`/products/${productId}`);
        const productData = response.data;

        setValue("category0", productData.category0);
        setValue("category1", productData.category1);
        setValue("category2", productData.category2);
        setValue("category3", productData.category3);
        setValue("name", productData.name);
        setValue("price", productData.price);
        setValue("priceBeforeDisc", productData.priceBeforeDisc);
        setValue("description", productData.description);

        const sizes = productData.sizes.map((size) => ({
          size: size.size.toString(),
          qty: size.qty.toString(),
        }));
        setSizes(sizes);
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
      }
    };
    fetchProduct();
  }, [productId, setValue]);

  const addSize = () => {
    setSizes([...sizes, { size: "", qty: "" }]);
  };

  const handleSizeChange = (index, event) => {
    const values = [...sizes];
    values[index][event.target.name] = event.target.value;
    setSizes(values);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("category0", data.category0);
    formData.append("category1", data.category1);
    formData.append("category2", data.category2);
    formData.append("category3", data.category3);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);

    if (data.priceBeforeDisc) {
      formData.append("priceBeforeDisc", data.priceBeforeDisc);
    } else {
      formData.append("priceBeforeDisc", 0);
    }

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    const sizesWithNumbers = sizes.map((size) => ({
      size: size.size,
      qty: Number(size.qty),
    }));

    formData.append("sizes", JSON.stringify(sizesWithNumbers));

    try {
      await axiosClient.put(`/products/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product updated successfully");
      setAddedItemsCount((prev) => prev + 1);
      navigate("/shop");
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const [cat0Res, cat1Res, cat2Res, cat3Res] = await Promise.all([
        axiosClient.get("/products/category0"),
        axiosClient.get("/products/category1"),
        axiosClient.get("/products/category2"),
        axiosClient.get("/products/category3"),
      ]);

      setCategories({
        category0: cat0Res.data,
        category1: cat1Res.data,
        category2: cat2Res.data,
        category3: cat3Res.data,
      });
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (category, categoryName) => {
    try {
      const newCategory = prompt(`Enter new ${categoryName}`);
      if (!newCategory) return; 
  
      if (
        newCategory.trim() !== "" &&
        newCategory.length >= 1 &&
        newCategory.length <= 20 &&
        !categories[category].some((cat) => cat.value === newCategory)
      ) {
        await axiosClient.post(`/products/${category}`, { value: newCategory })
          .then(() => {
            
            fetchCategories();
          });
      } else {
        console.error(`Invalid ${categoryName}: ${newCategory}`);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
  
  

  const catOptions = (category) =>
    categories[category].map((cat) => (
      <option key={cat._id} value={cat._id}>
        {cat.value}
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
          {...register("category0", { required: true })}
        >
          <option value="">Select Category 0</option>
          {catOptions("category0")}
        </select>
        <button
          type="button"
          className="text-2xl text-lightGray hover:text-dark"
          onClick={() => addCategory("category0", "category 0")}
        >
          +
        </button>
      </div>
      <div className="inline-flex gap-4">
        <select
          className="w-[270px] h-10 p-2 rounded-md shadow-md"
          {...register("category1", { required: true })}
        >
          <option value="">Select Category 1</option>
          {catOptions("category1")}
        </select>
        <button
          type="button"
          className="text-2xl text-lightGray hover:text-dark"
          onClick={() => addCategory("category1", "category 1")}
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
          {catOptions("category2")}
        </select>
        <button
          type="button"
          className="text-2xl text-lightGray hover:text-dark"
          onClick={() => addCategory("category2", "category 2")}
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
          {catOptions("category3")}
        </select>
        <button
          type="button"
          className="text-2xl text-lightGray hover:text-dark"
          onClick={() => addCategory("category3", "category 3")}
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
        {...register("price", { required: true, min: 2, max: 400 })}
      />
      <input
        className="w-[300px] h-10 p-2 rounded-md shadow-md"
        placeholder="Price before discount"
        type="number"
        {...register("priceBeforeDisc", { min: 0, max: 400 })}
      />
      <input
        className="w-[300px] h-10 p-2 rounded-md shadow-md"
        type="file"
        {...register("image")}
      />

      {sizes.map((size, index) => (
        <div key={index} className="flex gap-2">
          <input
            className="w-[135px] h-10 p-2 rounded-md shadow-md"
            placeholder="Size"
            type="string"
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
          {index === sizes.length - 1 && (
            <button
              type="button"
              onClick={addSize}
              className="text-2xl text-lightGray hover:text-dark"
            >
              +
            </button>
          )}
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
