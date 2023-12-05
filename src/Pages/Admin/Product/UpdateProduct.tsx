import React, { useEffect, useState } from 'react'
import { ICategories } from "../../../interfaces/categories";
import { getCategory } from "../../../api/categories";
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IProduct } from '../../../interfaces/product';
import { getById, updateproduct } from '../../../api/product';


const UpdateProduct = () => {
  const [categories,setcategories] = useState<ICategories[]>([])
  const [product,setProduct]=useState<IProduct>({} as IProduct)
  const {id} = useParams();
  const navigate = useNavigate();
  useEffect(()=>{
    async function fetchData() {
      try{
        const {data} = await getCategory();
        // set
        setcategories(data)
      }catch(error){
        console.error('Error fetching categories:', error);
      }
    }
    fetchData();
  },[])

  useEffect(()=>{
    async function fetchProduct() {
      try{
        if(id){
          const {data} = await getById(id)
          setProduct(data)
        }
      }catch(error){
        console.error('Error fetching product:', error)
      }
    }
    fetchProduct();
  },[id]);
  
  const hanldeChage = (e: React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement | HTMLSelectElement >)=>{
    const {name, value} = e.target;
    setProduct((prevProduct)=>({
      ...prevProduct,
      [name]: value,
    }))
  }
  const handleSubmit = async( e:React.FormEvent)=>{
    e.preventDefault();
    try{
        if(id && product){
            await updateproduct(product,id) 
      setTimeout(() => {
        navigate('/admin/products');
      }, 3000);
      toast.success('cap nhat san pham thành công', { autoClose: 2000 })
        }
      
    }catch(error){
      console.error('Error updating product:', error);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau')
    }
  }
  return (
    <div className="flex flex-col items-center mt-10">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-5">UPDATE Sản Phẩm</h1>
      <form className="w-1/3"  onSubmit={handleSubmit} >
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
            name='name'
            value={product.name}
            onChange={hanldeChage}
          />

        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryImage"
          >
            Ảnh
          </label>
          <img src={product.img} alt="" />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nhập Ảnh"
            id="categoryImage"
            type="text"
            name='img'
            value={product.img}
          />

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
            name='price'
            value={product.price}
            onChange={hanldeChage}
          />

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
            name='price_sale'
            value={product.price_sale}
            onChange={hanldeChage}
          />

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
            onChange={hanldeChage}
            className="mt-1.5 shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline   sm:text-sm"
          >
            <option value="" >Nhập Loại</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>

        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryImage"
          >
            Description
          </label>
          <textarea name='description'   onChange={hanldeChage} value={product.description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="" >

          </textarea>

        </div>

        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Cập nhật Sản Phẩm
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
  )
}

export default UpdateProduct