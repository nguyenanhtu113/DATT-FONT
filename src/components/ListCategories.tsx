import React, { useEffect, useState } from 'react'
import { IProduct } from '../interfaces/product';
import { Link } from 'react-router-dom';



const ListCategories = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
      // Thực hiện cuộc gọi API để lấy danh sách sản phẩm từ trang chủ
      fetch(`http://localhost:8080/api/categories/655ce0ff36e2059ae8c497cc`) // Thay thế bằng API endpoint thực tế
        .then((response) => response.json())
        .then((data) => {
          if (data.products && data.products.length > 0) {
            setProducts(data.products);
          }
        })
        .catch((error) => {
          console.error('Lỗi khi lấy dữ liệu sản phẩm: ', error);
        });
    }, []);
  return (
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {products.map((data) => (
                        <div key={data._id} className=" rounded shadow-sm p-4 relative group hover: transition-all duration-300">
                            <Link to={`/product/${data._id}`}>
                                <div>
                                    <div>
                                        <img src={data.img} alt="Product 1"
                                            className="w-full h-[421px] object-cover mb-4 transition-transform transform hover:scale-105" />
                                    </div>
                                    <div className=''>
                                        <div>
                                            <h2
                                                className="cursor-pointer text-xl  font-semibold py-1 hover: transform hover:scale-110 transition-transform hover:text-red-500">
                                                {data.name}
                                            </h2>

                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className='flex justify-between items-center '>
                                <div>
                                    <span className="text-lg line-through">{data.price}</span>
                                    <span className="text-lg text-red-500 ml-2">{data.price_sale}</span>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                </div>
                            </div>
                            <span
                                className="absolute left-0 top-0 mt-[16px] opacity-0 transform translate-x-[-100%] group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out bg-red-500 text-white px-2 py-1">
                                -40%
                            </span>
                        </div>
                    ))}

                </div>
                
  )
}

export default ListCategories