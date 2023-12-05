import React, { useState } from 'react';

const Signup = () => {
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();


    if (!lastName || !email || !phone || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const phoneRegex = /^0\d{9}$/;
    if (!phone.match(phoneRegex)) {
      setError('Số điện thoại không hợp lệ.');
      return;
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!email.match(emailRegex)) {
      setError('Định dạng email không hợp lệ');
      return;
    }

    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email);
    localStorage.setItem('phone', phone);
    localStorage.setItem('password', password);

    setLastName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setError('');

    alert('Đăng ký thành công!');
  };

  return (
    <section>
      <div className="grid__item large--one-half medium--one-half small--one-whole pd-left110 text-left ">
        <div className="width-80">
          <h1 className="text-2xl font-bold leading-9 text-black">Đăng ký</h1>
          <div className="desc_login">
            Hãy đăng ký ngay để tích lũy điểm thành viên và nhận được những ưu đãi tốt hơn!
          </div>
          <div className="form-vertical">
            <form acceptCharset="UTF-8" action="/account" id="create_customer" method="post">
              <input name="form_type" type="hidden" value="create_customer" />
              <input name="utf8" type="hidden" value="✓" />
              <label htmlFor="username">Tên</label>
              <input
                type="text"
                name="last_name"
                id="username"
                className="input-full"
                placeholder="Tên"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <label htmlFor="Email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="input-full"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="Phone">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="input-full"placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <label htmlFor="CreatePassword">Mật khẩu</label>
              <input
                type="password"
                name="password"
                id="CreatePassword"
                className="input-full"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div id="verified_email" className="clearfix large_form">
                <input type="checkbox" /> Đăng ký nhận bản tin
              </div>

              <div id="verified_policy" className="clearfix large_form">
                <input type="checkbox" /> Tôi đồng ý với các <a href="">điều khoản</a> của TND
              </div>

              {error && <p className="error">{error}</p>}

              <p>
              <input
              type="submit"
              className="bg-black text-white w-full py-2 px-4 rounded-none"
              value="Đăng ký"
              onClick={handleSignup}
              />
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;