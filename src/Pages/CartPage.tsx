
import { Link } from "react-router-dom"
import CartItem from "../components/CartItem"
import { useShoppingContext } from "../context/ShoppingCartContext"

const CartPage = () => {
  const { totalPrice, cartQty, cartItem } = useShoppingContext()

  if (cartItem.length === 0) {
    return (
      <h2 className=" text-center py-[150px] font-bold text-[30px]">Không có sản phẩm nào</h2>
    )
  } else {
    return (
      <div>
        <div>
          <ul className="flex">

          </ul>
        </div>
        <section className="flex gap-8 w-10/12 m-auto py-20 ">
          <section className="basis-4/6">

            {cartItem.map(item => {
              console.log("item", item);
              return <CartItem key={item._id} {...item} />
            })}


            <div className="border-t-2 flex justify-between">
              <Link to={'/product/:id'}>
                <button className="border-2  font-semibold p-3 px-5 mt-10">
                  Tiếp tục mua sắm
                </button>{" "}
              </Link>

              <button className="bg-black text-white font-semibold p-3 px-7 mt-10 ">
                Cập nhật giỏ hàng{" "}
              </button>
            </div>
          </section>
          <section className="basis-2/6 w-full">
            <p className="font-semibold">Mã giảm giá</p>
            <div className=" w-full">
              <input
                className="border w-8/12 py-3 px-2  mt-10"
                type="text"
                placeholder="Mã giảm giá"
              />
              <button className="border w-3/12 py-3 px-2 mt-10 bg-black text-white">
                Áp dụng
              </button>
            </div>
            <section className="bg-zinc-100 mt-12">
              <div className="p-10">
                {" "}

                <div className=" pt-5 flex">
                  {" "}
                  <span className="grow">Tổng giỏ hàng</span>
                  <span className="text-right ">{cartQty}</span>
                </div>
                <div className=" pt-5 flex">
                  {" "}
                  <span className="grow">Tổng tiền</span>
                  <span className="text-right ">${totalPrice}</span>
                </div>
                <Link to={'/pay'}>
                  <button className="bg-black text-white font-semibold p-3 mt-10 w-full">
                    Thanh toán
                  </button>
                </Link>

              </div>
            </section>
          </section>
        </section>
      </div>
    )

  }


}

export default CartPage