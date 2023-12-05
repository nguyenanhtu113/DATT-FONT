// import React from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { getById, getProduct } from "../api/product"
import { useEffect, useState } from "react"
import { IProduct } from "../interfaces/product"
import Product from "../components/product"
import { IColor } from "../interfaces/color"
import { getColor } from "../api/color"
import { ISize } from "../interfaces/size"
import { getSize } from "../api/size"
import { CartItem, useShoppingContext } from "../context/ShoppingCartContext"
import { Comments } from "../interfaces/comment"
import { jwtDecode } from "jwt-decode"
import { toast } from "react-toastify"
import axios from "axios"
import { getComment } from "../api/comment"
interface TokenPayload {
    id: string;
    // Bạn cần thêm các trường khác từ payload token nếu cần
}
const DetailPage = () => {
    const navigate = useNavigate()
    const [product, setProduct] = useState<IProduct>({} as IProduct)
    const [products, setProducts] = useState<IProduct[]>([])
    const [colors, setColors] = useState<IColor[]>([])
    const [sizes, setSizes] = useState<ISize[]>([])
    const [color, setColor] = useState<string | null>(null)
    const [size, setSize] = useState<string | null>(null)
    const [quantity, setQuantity] = useState<number>(1)
    const { productId } = useParams()
    const [comments, setComments] = useState<Comments[]>([]);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    console.log("log id", productId);
    const getUserIdFromToken = (): string | null => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Token not found in localStorage.');
            return null;
        }

        try {
            const decoded = jwtDecode<TokenPayload>(token);
            console.log(decoded); // Kiểm tra xem decoded token có đúng không
            return decoded.id;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };
    const handleSubmitComment = async () => {
        if (!comment.trim()) return;

        const id = getUserIdFromToken();


        console.log(id);

        if (!id) {

            toast.error('Bạn cần đăng nhập để thực hiện chức năng này.', { autoClose: 2000 })
            return;
        }

        try {
            setIsSubmitting(true);


            const response = await axios.post('http://localhost:8080/api/comment', {
                content: comment,
                productId,
                userId: id,
            }, {
                headers: {
                    // Gửi token trong header nếu API của bạn yêu cầu
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            // Xử lý response ở đây
            console.log(response.data);
            toast.success('Thêm bình luận thành công', { autoClose: 2000 })
            setComment('');
            fetchComment();
        } catch (error) {
            console.error('Error submitting comment:', error);
            toast.error('Lỗi khi thêm bình luận', { autoClose: 2000 })
        } finally {
            setIsSubmitting(false);

        }
    };
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
    const fetProduct = async () => {
        if (productId) {
            const { data } = await getById(productId)
            // console.log(data);
            setProduct(data)
            
        }
    }
    useEffect(() => {
        fetProduct()
    }, [])

    const fetProducts = async () => {
        const { data } = await getProduct()
        // console.log(data);
        setProducts(data)
    }
    useEffect(() => {
        fetProducts()
    }, [])

    const fetColor = async () => {
        const { data } = await getColor()
        // console.log(data);
        setColors(data)

    }

    useEffect(() => {
        fetColor()
    }, [])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [productId])

    const fetSize = async () => {
        const { data } = await getSize()
        // console.log(data);
        setSizes(data)

    }
    useEffect(() => {
        fetSize()
    }, [])

    const { addCartItem } = useShoppingContext()

    const addQuantity = (type: string) => {
        console.log('ok');

        if (type == 'plus') {
            setQuantity(quantity + 1)
        } else {
            if (quantity === 0) return
            setQuantity(quantity - 1)
        }
    }

    const addCart = (product: IProduct, type: string) => {
        if (!size || !color || quantity == 0) {
            return alert('Bạn Cần nhập thông tin size,color,quantity')
        }

        const cartItem: CartItem = {
            _id: typeof product._id === 'string' || typeof product._id === 'number' ? product._id : '',
            name: product.name,
            img: product.img,
            price: product.price,
            colorId: color,
            sizeId: size,
            quantity
        }

        addCartItem(cartItem)
        if (type == 'TO_CART') {
            navigate('/cart')
        }
    }

    return (

        <div className='mx-[100px] mt-[50px]'>
            <div className="product_detail_row_1 flex mb-[80px]">
                <div className=" basis-3/6">
                    <div className="image_detail_big">
                        <img className="w-[600px] h-[450px]" src={product.img} alt="" />
                    </div>
                    <div className="image_detail_small mt-[10px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[10px]">
                        <img className="w-[110px] h-[100px] mb-[20px]" src={product.img} alt="" />
                        <img className="w-[110px] h-[100px] mb-[20px]" src={product.img} alt="" />
                        <img className="w-[110px] h-[100px] mb-[20px]" src={product.img} alt="" />
                        <img className="w-[110px] h-[100px] mb-[20px]" src={product.img} alt="" />
                        <img className="w-[110px] h-[100px] mb-[20px]" src={product.img} alt="" />

                    </div>

                </div>
                <div className=" basis-3/6 pl-[100px]">
                    <h2 className="text-[20px] font-bold mb-[20px]">{product.name}</h2>
                    <div className="">
                        <span>Thương hiệu:</span>
                        <span>NEM</span>
                    </div>
                    <div className="">
                        <span>Mã SP:</span>
                        <span>{product._id}</span>
                    </div>
                    <h3 className="my-[10px] text-[24px] font-bold">{product.price}</h3>
                    <div className="size mb-[20px]">
                        <span className="text-[17px] mb-[10px]">Kích thước</span>
                        <ul className="flex gap-[20px] mt-[10px]">
                            {sizes.map((sizeItem, index) => {
                                return (
                                    <li onClick={() => setSize(sizeItem._id as string)} key={index} className={`${size === sizeItem._id ? 'border-orange-500' : ''}   w-[60px] text-center border px-[10px] py-[5px] `}>{sizeItem.name}</li>
                                )
                            })}

                        </ul>
                    </div>
                    <div className="color flex gap-[20px] mb-[20px]">
                        {colors.map((colorItem, index) => {
                            return (
                                <div className=" " >
                                    <span key={index} onClick={() => setColor(colorItem._id as string)} className={`${color == colorItem._id ? 'border-orange-500' : ''} px-[30px] py-[7px] border`} style={{ background: colorItem.name }}></span>
                                </div>
                            )
                        })}
                    </div>
                    <div className="mb-[30px]">
                        <h3><a href="">HƯỚNG DẪN CHỌN SIZE</a></h3>
                    </div>
                    <div className="quantity flex gap-[50px]">
                        <span>Số lượng</span>
                        <div className=" flex items-center border border-2 border-gray-300 px-[20px] py-[5px] gap-[20px] products-center">
                            <button onClick={addQuantity.bind(this, 'minus')}>
                                -
                            </button>
                            <span>{quantity}</span>
                            <button onClick={addQuantity.bind(this, 'plus')}>
                                +
                            </button>

                        </div>
                    </div>
                    <div className="shopping_cart my-[20px]">
                        <div className="mb-[20px]">
                            <button onClick={() => addCart(product, 'ADD_CART')} className="border border-gray-800 px-[100px] py-[10px]">THÊM VÀO GIỎ</button>
                        </div>
                        <div className="">
                            <button onClick={() => addCart(product, 'TO_CART')} className="border px-[118px] py-[10px] bg-black text-white">MUA NGAY</button>
                        </div>
                    </div>
                    <div className="describe">
                        <div className="">
                            <span className="text-[16px] font-bold">Chất liệu:</span>
                            <span>vải thô</span>
                        </div>
                        <div className="">
                            <span className="text-[16px] font-bold">Kiểu dáng:</span>
                            <span>áo vest thiết kế chiết eo, cổ bẻ 2 ve, tone màu xanh trơn</span>
                        </div>
                        <div className="">
                            <span className="text-[16px] font-bold">Sản phẩm thuộc dòng sản phẩm :</span>
                            <span>NEM NEW</span>
                        </div>
                        <div className="">
                            <span className="text-[16px] font-bold">Thông tin người mẫu:</span>
                            <span>mặc sản phẩm size 2</span>
                        </div>
                        <div className="">
                            <span className="text-[16px] font-bold">Sản phẩm kết hợp:</span>
                            <span>quần Q06402</span>
                        </div>
                    </div>


                </div>
            </div>
            <hr />
            <div className="product_detail_row_2 mt-[50px]">
                <div className="describe_product pr-[20px] mt-[5px]">
                    <div className="describe_product_row mt-[30px]">
                        <div className="title_describe bg-neutral-400 h-[60px] flex products-center">
                            <h3 className='text-[20px] px-[50px] font-bold pt-[5px]'>ĐÁNH GIÁ SẢN PHẨM  </h3>
                        </div>
                        <div className="content_describe flex mt-[30px] bg-neutral-400 h-[130px] pl-[50px]">

                            <div className=" basis-1/6 pt-[25px]">
                                <span className='text-[35px]'>4.6 </span> <span>trên 5</span>
                                <div className="icon_user flex text-red-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                </div>
                            </div>
                            <div className=" basis-5/6 pt-[20px]">
                                <div className="flex gap-[20px]">
                                    <button className=' border px-[30px] py-[5px] rounded-lg bg-white'>Tất cả </button>
                                    <button className='border px-[30px] py-[5px] rounded-lg bg-white'>5 sao(5,4 k)</button>
                                    <button className='border px-[30px] py-[5px] rounded-lg bg-white'>4 sao(806)</button>
                                    <button className='border px-[30px] py-[5px] rounded-lg bg-white'>3 sao(206)</button>
                                    <button className='border px-[30px] py-[5px] rounded-lg bg-white'>2 sao(106)</button>
                                    <button className='border px-[30px] py-[5px] rounded-lg bg-white'>1 sao(6)</button>
                                </div>
                                <div className="mt-[20px] flex gap-[50px]">
                                    <button className='border px-[30px] py-[5px] rounded-lg bg-white'>có bình luận (2,4 k)</button>
                                    <button className='border px-[30px] py-[5px] rounded-lg bg-white'>có hình ảnh/ video(1,1k) </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="w-full bg-white rounded-lg border p-2 my-4 mx-6">

                            <h3 className="font-bold">Bình Luận</h3>


                            {comments.map((comment) => (
                                <div className="flex flex-col" key={comment._id}>

                                    <div className="border rounded-md p-3 ml-3 my-3">
                                        <div className="flex gap-3 items-center">

                                            <div>
                                                <img src="https://avatars.githubusercontent.com/u/22263436?v=4"
                                                    className="object-cover w-8 h-8 rounded-full 
                   border-2 border-emerald-400  shadow-emerald-400
                   "/>
                                            </div>

                                            <div>
                                                <h3 className="font-bold">
                                                    {comment.userId && typeof comment.userId === 'object' && 'username' in comment.userId
                                                        ? (comment.userId as { username?: string }).username || 'Unknown'
                                                        : 'Unknown'}


                                                </h3>
                                                <span>{comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Không rõ"}</span>
                                            </div>
                                        </div>


                                        <p className="text-gray-600 mt-2">
                                            {comment.content}
                                        </p>

                                    </div>






                                </div>
                            ))}

                            <form >

                                <div>
                                    <div className="w-full px-3 my-2">
                                        <textarea
                                            className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            disabled={isSubmitting}
                                        ></textarea>
                                    </div>

                                    <div className="w-full flex justify-end px-3">

                                        {/* <input type='submit' className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500" value='Post Comment' /> */}
                                        <button onClick={handleSubmitComment} disabled={isSubmitting || comment.trim() === ''}>
                                            {isSubmitting ? 'Đang gửi...' : 'Gửi Bình Luận'}
                                        </button>

                                    </div>
                                </div>




                            </form>



                        </div>
                    </div>
                    <hr />
                </div>

            </div>
            <div className=" text-center m-[50px]">
                <h2 className="text-[24px] font-bold">SẢN PHẨM TƯƠNG TỰ</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((product) => <Product key={product._id} data={product} />)}
            </div>
        </div>
    )


}

export default DetailPage