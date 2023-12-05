import React, { useState } from 'react';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();


    if (!email || !password) {
      alert('Vui lòng điền đầy đủ email và mật khẩu');
      return;
    }

   
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

   
    if (email === storedEmail && password === storedPassword) {
      setIsLoggedIn(true);
      alert('Đăng nhập thành công!');
    } else {
      setIsLoggedIn(false);
      alert('Email hoặc mật khẩu không đúng!');
    }
  };

  if (isLoggedIn) {
   
    return <div>Đăng nhập thành công!</div>;
  }

  return (
    <section>
      <div className="grid__item large--one-half medium--one-half small--one-whole pd-left110 text-left br-right">
        <div className="width-80">
          <h1 className="text-2xl font-bold leading-9 text-black">Đăng nhập</h1>
          <div className="desc_login">Nếu bạn đã có tài khoản, hãy đăng nhập để tích lũy điểm thành viên và nhận được những ưu đãi tốt hơn!</div>
          <form className="form-vertical" onSubmit={handleLogin}>
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              id="Email"
              className="input-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="Password">Mật khẩu</label>
            <input
              type="password"
              id="Password"
              className="input-full"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="">Quên mật khẩu</a>
            <p>
              <input
                type="submit"
                className="bg-black text-white w-full py-2 px-4 rounded-none"
                value="Đăng nhập"
              />
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signin;