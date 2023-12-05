import React, { useEffect, useState } from 'react'
import { Comments } from '../../../interfaces/comment';
import { deleteComment, getComment } from '../../../api/comment';
import { useParams } from 'react-router-dom';
import { Popconfirm, message } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Message = () => {
    const [comments, setComments] = useState<Comments[]>([]);
    const { productId } = useParams();
    const fetchComment = async () => {
        if (productId) {
            const { data } = await getComment(productId)
            console.log(data);
            setComments(data.comments)

        }
    }
    useEffect(() => {
        fetchComment()
    }, [])
    const handleDeleteComment = async (commentId: any) => {
        try {
            if (commentId !== null) {
                await deleteComment(commentId)
                setComments((prevComments) =>
                    prevComments.filter((comment) => comment._id !== commentId)
                )
                toast.success('Xóa bình luận thành công', { autoClose: 2000 })
            }
        } catch (error) {
            console.log('Error deleting comment:', error);
            toast.error('Xóa bình luận thất bại');
        }
    }
    return (
        <body className="bg-gray-100">
            <ToastContainer />
            <div className="container mx-auto mt-10 p-4 bg-white rounded shadow-xl">
                <div className="">
                    <input type="text" placeholder="Tìm kiếm bình luận..." className="w-full p-2 border rounded" />

                    <div className="flex mt-2 space-x-4">

                        <input type="date" className="p-2 border rounded" />
                        <span>đến</span>
                        <input type="date" className="p-2 border rounded" />
                    </div>
                    <button onClick={fetchComment}>Tìm kiếm</button>
                </div>

                <table className="mt-4 w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-300">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Tên người gửi</th>
                            <th className="border p-2">Nội dung</th>
                            <th className="border p-2">Ngày gửi</th>
                            <th className="border p-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>

                        {comments.map((comment, index) => (
                            <tr className='text-center' key={comment._id}>
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{typeof comment.userId === 'object' && 'username' in comment.userId
                                    ? (comment.userId as { username: string }).username
                                    : 'Unknown'}</td>
                                <td className="border p-2">{comment.content}</td>
                                <td className="border p-2">{comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Không rõ"}</td>
                                <td className="border p-2 text-center">
                                    {/* <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                                        <button onClick={() => handleDeleteComment(comment._id)}
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
                                    </div> */}
                                    <Popconfirm
                                        title="Bạn có chắc chắn muốn xóa bình luận này?"
                                        onConfirm={() => handleDeleteComment(comment._id)}
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
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

                <div className="mt-4 flex justify-center">

                    <button className="bg-blue-500 text-white px-4 py-2 rounded">1</button>
                    <button className="bg-white text-blue-500 px-4 py-2 rounded ml-2">2</button>

                </div>
            </div>

        </body>
    )
}

export default Message