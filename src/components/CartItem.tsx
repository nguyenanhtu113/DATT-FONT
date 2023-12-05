import React from 'react'
import { useShoppingContext } from '../context/ShoppingCartContext'
type cartItemProps = {
    _id: number | string
    name: string
    price: number
    quantity: number,
    img: string
}

const CartItem = ({ _id, name, price, quantity, img }: cartItemProps) => {
    const { increaseQty, decreaseQty, removeCartItem } = useShoppingContext()

    return (
        <div>
            <table className="table-auto w-full ">
                <thead className="pb-10 ">
                    <tr className="text-left ">
                        <th className=" font-semibold pb-10">Sản phẩm</th>
                        <th className="font-semibold pb-10">Số lượng</th>
                        <th className="font-semibold pb-10">Giá tiền</th>
                        <th className="font-semibold pb-10">Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={_id} className="border-t-2">
                        <td className=" flex py-10  gap-8">
                            <img className='w-[100px] h-[100px]' src={img} alt="" />
                            <div className="pt-7">
                                <p>{name}</p>
                            </div>
                        </td>
                        <td className="w-40 ">
                            <button onClick={() => decreaseQty(_id as string)}>{`-`}</button>
                            <span className="px-6">{quantity}</span>
                            <button onClick={() => increaseQty(_id as string)}>{`+`}</button>
                        </td>

                        <td className="w-40">{price}</td>
                        <td className="w-40">{quantity * price}</td>
                        <td>
                            <button onClick={() => removeCartItem(_id as string)}>
                                <i className="fa-sharp fa-solid fa-circle-xmark text-slate-300 bg-black rounded-full shadow-md shadow-black text-3xl"></i>
                            </button>
                        </td>
                    </tr>


                </tbody>


            </table>

        </div>
    )
}

export default CartItem