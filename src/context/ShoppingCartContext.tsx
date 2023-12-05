import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type ShoppingContextProviderProps = {
    children: ReactNode
}
export type CartItem = {
    _id: number | string
    name: string
    price: number
    quantity: number,
    img: string
    sizeId: string | null
    colorId: string | null
}

interface ShoppingContextType {
    cartQty: number
    totalPrice: number
    cartItem: CartItem[]
    increaseQty: (id: string) => void
    decreaseQty: (id: string) => void
    addCartItem: (item: CartItem) => void
    removeCartItem: (id: string) => void
    clearCart: () => void
}
export const useShoppingContext = () => {
    return useContext(ShoppingContext)
}
//useContext có chứa Consumer để giúp chúng ta có thể nhận được dữ liệu
//từ Provider bằng cách chuyền shoppingContext vào useContext 
//Bây giờ ShoppingContext.Provider có value là gì thì useShoppingContext
//sẽ nhận được nó ở đây
const ShoppingContext = createContext<ShoppingContextType>({} as ShoppingContextType)
//createContext tạo ra một cái object chứa Provider,Consumer để giúp chúng ta 
//có thể cung cấp gữ liệu và nhận giữ liệu (Provider,Consumer nó là react component)
export const ShoppingContextProvider = ({ children }: ShoppingContextProviderProps) => {
    const [cartItem, setCartItem] = useState<CartItem[]>(() => {
        const jsonCartData = localStorage.getItem('shopping_cart')
        return jsonCartData ? JSON.parse(jsonCartData) : []
    })

    useEffect(() => {
        localStorage.setItem('shopping_cart', JSON.stringify(cartItem))
    }, [cartItem])
    const cartQty = cartItem.length
    const totalPrice = cartItem.reduce((total, item) => total + item.quantity * item.price, 0)
    const increaseQty = (id: string) => {
        console.log("increaseQty => ", id);
        const currentCartItem = cartItem.find(item => item._id === id)
        if (currentCartItem) {
            const newItems = cartItem.map((item) => {
                if (item._id === id) {
                    return { ...item, quantity: item.quantity + 1 }

                } else {
                    return item
                }
            })
            setCartItem(newItems)

        }
    }
    const decreaseQty = (id: string) => {
        console.log("increaseQty => ", id);
        const currentCartItem = cartItem.find(item => item._id === id)
        if (currentCartItem?.quantity == 1) {
            removeCartItem(id)
        } else {
            const newItems = cartItem.map((item) => {
                if (item._id === id) {
                    return { ...item, quantity: item.quantity - 1 }

                } else {
                    return item
                }
            })
            setCartItem(newItems)
        }
    }
    const addCartItem = (product: CartItem) => {
        console.log("product", product)
        if (product) {
            const currentCartItem = cartItem.find((item) => item._id == product._id)
            if (currentCartItem) {
                const newItems = cartItem.map((item) => {
                    if (item._id === product._id) {
                        return { ...item, quantity: item.quantity + product.quantity }

                    } else {
                        return item
                    }
                })
                setCartItem(newItems)

            } else {
                const newItem = { ...product }
                setCartItem([...cartItem, newItem])
            }

        }
    }
    const removeCartItem = (id: string) => {
        console.log("removeCartItem =>", id);
        const currentCartItemIndex = cartItem.findIndex((item) => item._id == id)
        const newItem = [...cartItem]
        newItem.splice(currentCartItemIndex, 1)
        setCartItem(newItem)
    }
    const clearCart = () => {
        console.log("clearCart =>");
        setCartItem([])

    }
    return (
        <ShoppingContext.Provider value={{ cartItem, cartQty, totalPrice, increaseQty, decreaseQty, addCartItem, clearCart, removeCartItem }}>
            {children}
        </ShoppingContext.Provider>
    )

}
//Tạo ta một cái Provider có props tên là value nó nhận một cái dữ liệu gì đó,
//Tất cả những cái children của cái Provider đều có thể nhận được dữ liệu trong value
//
export default ShoppingContext