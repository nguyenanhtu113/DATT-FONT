import React, { useEffect, useState } from "react";
import { ICategories } from "../../../interfaces/categories";
import { getCategory } from "../../../api/categories";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';


const AddProduct = ({onAdd}: any) => {
  const [categories, setcategories] = useState<ICategories[]>([])
  const navigate = useNavigate();
  console.log(categories);
  useEffect(() => {
    async function fetchProduct() {
      const { data } = await getCategory();
      setcategories(data);
      console.log(data);

    }
    fetchProduct()
  }, [])
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onHandleSubmit = (data: any) => {
      onAdd(data)
      setTimeout(() => {
        navigate('/admin/products');
      }, 3000);
      toast.success('Thêm sản phẩm thành công', { autoClose: 2000 })
  }
  return (
    // -----
    <div className="flex flex-col items-center mt-10">
       <ToastContainer />
      <h1 className="text-2xl font-bold mb-5">Thêm Sản Phẩm</h1>
      <form className="w-1/3" onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryName"
          >
            Tên Sản Phẩm
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nhập Tên"
            id="categoryName"
            type="text"
            {...register("name", { required: true })}
          />
          {errors.name && <span>this field is required</span>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryImage"
          >
            Ảnh
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nhập Ảnh"
            id="categoryImage"
            type="text"
            {...register("img", { required: true })}
          />
          {errors.img && <span>this field is required</span>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryImage"
          >
            Giá
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nhập Giá"
            id="categoryImage"
            type="number"
            {...register("price")}
          />
          {errors.price && <span>this field is required</span>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryImage"
          >
            Giá_Sale
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nhập Giá Sale"
            id="categoryImage"
            type="number"
            {...register("price_sale")}
          />
          {errors.price_sale && <span>this field is required</span>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="HeadlineAct"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Loại
          </label>

          <select
            
            id="HeadlineAct"
            {...register("categoryId")}
            className="mt-1.5 shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline   sm:text-sm"
          >
            <option value="">Nhập Loại</option>
            {categories.map((category)=>(
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
          {errors.categoryId && <span>this field is required</span>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryImage"
          >
            Description
          </label>
          <textarea  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="" {...register("description")}>

          </textarea>
          {errors.description && <span>this field is required</span>}
        </div>

        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Thêm Sản Phẩm
          </button>
          <a href="/admin/products">
            <button
              className="bg-blue-500 flex gap-2 items-center hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              Quay Lại
            </button>
          </a>
        </div>
      </form>
    </div>
  );
};


export default AddProduct;