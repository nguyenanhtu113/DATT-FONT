import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useShoppingContext } from '../context/ShoppingCartContext';
const Header: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState(false);


    const menuRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    const { cartQty } = useShoppingContext()

    return (
        <header className="bg-white shadow-md relative">
            <div className="text-center bg-black text-white">
                <p className="text-[12px] pt-1 pb-1">Miễn Phí Đổi Hàng 30 Ngày</p>
            </div>
            <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
                <div className="text-2xl font-semibold text-gray-800">
                    <a href=""> <img src="image-removebg-preview 1.png" alt="" /></a>
                </div>

                <nav className="hidden md:flex space-x-4 mr-8 lg:flex lg:items-center lg:justify-end lg:gap-8 uppercase text-sm text-gray-500 font-medium">
                    <a href="/" className="cursor-pointer py-1 hover: transform hover:scale-110 transition-transform hover:text-gray-800 relative after:absolute after:bottom-0 after:left-0 after:bg-slate-900 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300">Trang chủ</a>
                    <a href="#" className="cursor-pointer py-1 hover: transform hover:scale-110 transition-transform hover:text-gray-800 relative after:absolute after:bottom-0 after:left-0 after:bg-slate-900 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300">Sản phẩm</a>
                    <a href="#" className="cursor-pointer py-1 hover: transform hover:scale-110 transition-transform hover:text-gray-800 relative after:absolute after:bottom-0 after:left-0 after:bg-slate-900 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300">LookBook</a>
                    <a href="#" className="cursor-pointer py-1 hover: transform hover:scale-110 transition-transform hover:text-gray-800 relative after:absolute after:bottom-0 after:left-0 after:bg-slate-900 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300">Dịp/Sự Kiện</a>
                    <a href="#" className="cursor-pointer py-1 hover: transform hover:scale-110 transition-transform hover:text-gray-800 relative after:absolute after:bottom-0 after:left-0 after:bg-slate-900 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300">Blog</a>
                    <a href="#" className="cursor-pointer py-1 hover: transform hover:scale-110 transition-transform hover:text-gray-800 relative after:absolute after:bottom-0 after:left-0 after:bg-slate-900 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300">Cửa Hàng</a>
                </nav>

                <div className="flex items-center space-x-4 relative">
                    <i className="fas fa-search text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => setShowSearch(prev => !prev)}></i>

                    {/* Cửa sổ tìm kiếm trượt ra */}
                    {showSearch && (
                        <div className="absolute top-full right-0 mt-2 w-72 bg-white border rounded-md shadow-lg p-4 z-10 transition-transform transform hover:scale-105">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onBlur={() => setShowSearch(false)}
                                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                                autoFocus
                            />
                        </div>
                    )}
                    <Link to={'/cart'}>
                        <div className="relative group">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>

                            <span className="absolute -top-1  -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center group-hover:bg-red-600">
                                {cartQty}
                            </span>
                        </div>
                    </Link>

                    <i className="fas fa-user text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => setShowMenu(!showMenu)}></i>
                    {showMenu && (
                        <div className={"absolute -right-11 mt-28 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 "} ref={menuRef}>
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                >
                                    Đăng kí
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                >
                                    Đăng nhập
                                </a>
                            </div>
                        </div>
                    )}
                    <div className="md:hidden">
                        <i className="fas fa-bars text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => setMenuOpen(true)}></i>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ${menuOpen ? 'translate-x-0 w-64' : 'translate-x-full w-0'} z-50 p-4 overflow-y-auto`}
                ref={menuRef}
            >
                <nav className="space-y-4 font-medium">
                    <a href="#" className="block text-gray-600 hover:text-red-400">Trang Chủ</a>
                    <a href="#" className="block text-gray-600 hover:text-red-400">Sản Phẩm</a>
                    <a href="#" className="block text-gray-600 hover:text-red-400">LookBook</a>
                    <a href="#" className="block text-gray-600 hover:text-red-400">Dịp/Sự Kiện</a>
                    <a href="#" className="block text-gray-600 hover:text-red-400">Blog</a>
                    <a href="#" className="block text-gray-600 hover:text-red-400">Cửa Hàng</a>
                </nav>
                <i className="fas fa-times text-gray-600 hover:text-gray-800 cursor-pointer absolute top-4 right-4" onClick={() => setMenuOpen(false)}></i>
            </div>
        </header>
    );
}

export default Header;