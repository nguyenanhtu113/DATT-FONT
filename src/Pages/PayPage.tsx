import { useEffect, useState } from "react";
import { CartItem } from "../context/ShoppingCartContext";
import { ISize } from "../interfaces/size";
import { IColor } from "../interfaces/color";
import axios from "axios";
import { IOrders } from "../interfaces/Orders";
import { jwtDecode } from 'jwt-decode';
interface TokenPayload {
  id: string;
  // Bạn cần thêm các trường khác từ payload token nếu cần
}
const PayPage =() =>{
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [sizes, setSizes] = useState<ISize[]>([]); // Add your size data
  const [colors, setColors] = useState<IColor[]>([]);
  const [formData, setFormData] = useState({
    fullname: "",
    phonenumber: "",
    address: "",
  });
  useEffect(() => {
    // Fetch cart information from local storage
    const storedCart: string | null = localStorage.getItem('shopping_cart');
    if (storedCart !== null) {
      const parsedCart: CartItem[] = JSON.parse(storedCart);
      setCartItems(parsedCart);
    }
    axios.get<ISize[]>('http://localhost:8080/api/size')
    .then(response => setSizes(response.data))
    .catch(error => console.error('Error fetching size data:', error));

  // Fetch color data from your API
  axios.get<IColor[]>('http://localhost:8080/api/color')
    .then(response => setColors(response.data))
    .catch(error => console.error('Error fetching color data:', error));
    console.log(storedCart);
    
  }, []);
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const shippingFee = 0; 
  const discount = 100;
  const getSizeNameById = (sizeId: any): any => {
    const size = sizes.find((s) => s._id === sizeId);
    return size ? size.name : 'Unknown Size';
  };
  const getColorNameById = (colorId: any): any => {
    const color = colors.find((c) => c._id === colorId);
    return color ? color.name : 'Unknown Color';
  };

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
  const id = getUserIdFromToken()
  console.log(id);
  


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send order data to your server
      const response = await axios.post("http://localhost:8080/api/order", {
        userId: getUserIdFromToken(),
        fullname: formData.fullname,
        phonenumber: formData.phonenumber,
        address: formData.address,
        orderTotal: totalPrice + shippingFee - discount,
        orderDetails: cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
          sizeId: item.sizeId,
          colorId: item.colorId,
        })),
      });

      console.log("Order created:", response.data);
      // Handle success, e.g., redirect or show a success message
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

    return (
        <div>
          
          <section className="flex gap-8 w-10/12 m-auto py-10">
            <section className="basis-3/6">
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="fullname">Họ và tên</label>
              <input type="text" name="fullname" id="fullname" className="input-full" placeholder="Họ"  
                 value={formData.fullname}
                 onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}/>

              <label htmlFor="phonenumber">Số điện thoại</label>
              <input type="text" name="phonenumber" id="phonenumber" className="input-full" placeholder="Số điện thoại" 
               value={formData.phonenumber}
               onChange={(e) => setFormData({ ...formData, phonenumber: e.target.value })} />

              <label htmlFor="Address">Địa chỉ</label>
              <input type="text" name="address" id="Address" className="input-full" placeholder="Địa chỉ"
               value={formData.address}
               onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
              
              
             
              <div className="border-t-2 flex justify-between">
                <button className="border-2  font-semibold p-3 px-5 mt-10">
                  Giỏ hàng
                </button>
                <button className="bg-black text-white font-semibold p-3 px-7 mt-10 " >
                  Phương thức thanh toán
                </button>
              </div>
    
            </form>
              
            </section>
            <section className="basis-3/6 w-full">
            <table className="table-auto w-full ">
                <tbody className="w-full ">
                  {cartItems.map((item)=>(
                    <tr key={item._id} className="border-t-2">
                    <td className="flex py-10  gap-8">
                      <img src={item.img} className="w-20"></img>
                      
                      <div className="pt-7">
                        <p>{item.name}</p>
                        <div>
                          <p>{`Size: ${item.sizeId !== null ? getSizeNameById(String(item.sizeId)) : 'N/A'}`}</p>
                          <p>{`Color: ${item.colorId !== null ? getColorNameById(String(item.colorId)) : 'N/A'}`}</p>
                        </div>
                      </div>
                    </td>
                    <td className="w-40"> {item.price} </td>
                  </tr>     
                  ))}
                         
                </tbody>
              </table>
              <section className="bg-zinc-100 mt-12">
                <div className="p-5">
                  {" "}
                  <p>Tổng giỏ hàng</p>
                  <div className=" pt-5 flex">
                    {" "}
                    <span className="grow">Tổng tiền</span>
                    <span className="text-right ">{`${totalPrice.toLocaleString()}`} vnd</span>
                  </div>
                  <div className=" pt-5 flex">
                    {" "}
                    <span className="grow">Phí ship</span>
                    <span className="text-right ">{`${shippingFee.toLocaleString()}`} vnd</span>
                  </div>
                  
                  <div className=" pt-5 flex">
                    {" "}
                    <span className="grow">Giảm giá</span>
                    <span className="text-right ">{`${discount.toLocaleString()}`} vnd</span>
                  </div>
                  <div className=" pt-5 flex">
                    {" "}
                    <span className="grow">Thanh toán</span>
                    <span className="text-right ">{`${(totalPrice + shippingFee - discount).toLocaleString()}`} vnd</span>
                  </div>
                </div>
              </section>
                    
            </section>
          </section>
        </div>
    )
}

export default PayPage