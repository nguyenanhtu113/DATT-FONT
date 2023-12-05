import React, { useEffect, useMemo, useState } from 'react'
import { ICategories } from '../../../interfaces/categories';
import { deletecategory, getCategory } from '../../../api/categories';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Popconfirm, Table } from 'antd';
import { Link } from 'react-router-dom';


const ListCategories = () => {
  const [categories, setcategories] = useState<ICategories[]>([])
  console.log(categories);
  useEffect(() => {
    async function fetchProduct() {
      const { data } = await getCategory();
      setcategories(data);
      console.log(data);

    }
    fetchProduct()
  }, [])
  const handleDeleteComment = async (categoryId: any) => {
    try {
      if (categoryId) {
        await deletecategory(categoryId)
        setcategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== categoryId)
        )
        toast.success('Xóa danh mục thành công', { autoClose: 2000 })
      }
    } catch (error) {
      console.log('Error deleting comment:', error);
      toast.error('Xóa danh mục thất bại');
    }
  }
 
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'index',
      width: "5%",
      key: 'index',
    },
    {
      title: 'Images',
      dataIndex: 'img',
      width: "30%",
      key: 'img',
      render: (imgArray: { url: string }[]) => (
        <div style={{ display: 'flex' }}>
          {imgArray.map((img, index) => (
            <img key={index} src={img.url} alt={`product-${index}`} style={{ width: '50px', marginRight: '5px' }} />
          ))}
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: "30%",
      key: 'name',
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "40%",
      key: "status",
      render:(status: any, record: ICategories)=>(
        <div className="inline-flex rounded-lg border  border-gray-100 bg-gray-100 p-1">
                   <Link to={`update/${record._id}`}>
                   <button
                      className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>

                      Edit
                    </button>
                   </Link>
                    <Popconfirm
                      title="Bạn có chắc chắn muốn xóa bình luận này?"
                      onConfirm={() => handleDeleteComment(record._id)}
                      okText={<button className="text-red-500 hover:text-black">Xóa</button>}
                      cancelText="Hủy"
                      placement="topRight"
                    >
                      <button
                        className="inline-flex hover:text-red-500 items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-blue-500 shadow-sm focus:relative"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="h-4 w-4 "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                        Delete
                      </button>
                    </Popconfirm>
                  </div>
      )
    },
  ];
  return (
   
    
   <div>
     <ToastContainer />
     <div className="text-center pb-7 flex justify-between items-center ">
          <div>
             <h1 className="text-2xl font-semibold">Quản Lý Danh Mục</h1>
          </div>
         <div className=''>
            <Link to={"add"}>
           <button className="bg-blue-500 flex items-center gap-2  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Thêm Danh Mục  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
           <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
           </Link>
          </div>
        </div>
     <Table dataSource={categories.map((category,index)=>({...category,index:index+1}))} columns={columns} />
   </div>
  )
}

export default ListCategories