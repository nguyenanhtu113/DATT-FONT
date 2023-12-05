import { Routes, Route } from "react-router-dom";
import "./App.css";
import UsersLayout from "./components/Layout/UsersLayout";
import HomePage from "./Pages/HomePage";
import DetailPage from "./Pages/DetailPage";
import PayPage from "./Pages/PayPage";
import CartPage from "./Pages/CartPage";
import BlogPage from "./Pages/BlogPage";
import Login from "./Pages/Login";
import Admin from "./components/Layout/Admin";
import Dashboard from "./Pages/Admin/dashboard";
import CommentManagement from "./Pages/Admin/Comment/CommentManagement";
import Message from "./Pages/Admin/Comment/Message";
import ListCategories from "./Pages/Admin/Categories/ListCategories";
import AddCategories from "./Pages/Admin/Categories/AddCategories";
import UpdateCategories from "./Pages/Admin/Categories/UpdateCategories";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import ListVouchers from "./Pages/Admin/Vouchers/ListVouchers";
import AddVouchers from "./Pages/Admin/Vouchers/AddVouchers";
import UpdateVouchers from "./Pages/Admin/Vouchers/UpdateVouchers";
import ProductPage from "./Pages/ProductPage";
import ListUsers from "./Pages/Admin/Users/ListUsers";
import ProductManager from "./Pages/Admin/Product/ProductManager";
import AddProduct from "./Pages/Admin/Product/AddProduct";
import UpdateProduct from "./Pages/Admin/Product/UpdateProduct";
import OrderHistory from "./Pages/OrderHistory";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UsersLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:productId" element={<DetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/purchase" element={<OrderHistory />} />
          <Route path="/pay" element={<PayPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="messages" element={<CommentManagement />} />{" "}
          {/* Thêm đường dẫn mới tại đây */}
          <Route path="messages/comment/:productId" element={<Message />} />
          <Route path="vouchers" element={<ListVouchers />} />
          <Route path="vouchers/add" element={<AddVouchers />} />
          <Route path="vouchers/update/:id" element={<UpdateVouchers />} />
          <Route path="Categories" element={<ListCategories />} />
          <Route path="Categories/add" element={<AddCategories />} />
          <Route path="Categories/update/:id" element={<UpdateCategories />} />
          <Route path="users" element={<ListUsers />} />
          <Route path="products" element={<ProductManager />} />
          <Route path="products/addProduct" element={<AddProduct />} />
          <Route path="products/update/:id" element={<UpdateProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
