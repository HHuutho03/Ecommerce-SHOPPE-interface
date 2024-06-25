import React, { useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Login from "../../pages/Login/Login";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";
import Register from "../../pages/register/Register";

const Header = () => {
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();
  const [modalIsOpenLogin, setIsOpenLogin] = useState(false);
  const [modalIsOpenRegister, setIsOpenRegister] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const handleLogout = async (e) => {
    await logout();
    window.location.reload();
  };
  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const openModalLogin = () => {
    setIsOpenLogin(true);
  };
  const afterOpenModalLogin = () => {};

  const closeModalLogin = () => {
    setIsOpenLogin(false);
  };

  const openModalRegister = () => {
    setIsOpenRegister(true);
  };
  const afterOpenModalRegister = () => {};

  const closeModalRegister = () => {
    setIsOpenRegister(false);
  };

  return (
    <>
      {" "}
      <Login
        ariaHideApp={false}
        modalIsOpen={modalIsOpenLogin}
        openModal={openModalLogin}
        afterOpenModal={afterOpenModalLogin}
        closeModal={closeModalLogin}
      />
      <Register
        ariaHideApp={false}
        modalIsOpen={modalIsOpenRegister}
        openModal={openModalRegister}
        afterOpenModal={afterOpenModalRegister}
        closeModal={closeModalRegister}
      />
      <header className="header text-white">
        <div className="container">
          <div className="header-cnt">
            <div className="header-cnt-top fs-13 py-2 flex align-center justify-between">
              <div className="header-cnt-top-l">
                <ul className="flex top-links align-center">
                  <li>
                    {/* dummy links */}
                    <Link to="/seller">Seller Center</Link>
                  </li>
                  <li className="vert-line"></li>
                  <li>
                    {/* dummy links */}
                    <Link to="/download">Download</Link>
                  </li>
                  <li className="vert-line"></li>
                  <li className="flex align-center">
                    <span className="fs-13">Follow us on</span>
                    <ul className="social-links flex align-center">
                      <li className="mx-2">
                        <a href="www.facebook.com" className="fs-15">
                          <i className="fab fa-facebook"></i>
                        </a>
                      </li>
                      <li className="mx-2">
                        <a href="www.instagram.com" className="fs-15">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="header-cnt-top-r">
                <ul className="top-links flex align-center">
                  <li>
                    <Link to="/" className="top-link-itm">
                      <span className="top-link-itm-ico mx-2">
                        <i className="fa-solid fa-circle-question"></i>
                      </span>
                      <span className="top-link-itm-txt">Support</span>
                    </Link>
                  </li>
                  <li className="vert-line"></li>
                  {authUser ? (
                    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                      <Link to="/" className="top-link-itm show-menu-user" style={{ display: "flex" }}>
                        <img
                          src={`https://avatar.iran.liara.run/public/boy?username=${authUser?.email}`}
                          alt=""
                          className="header__navbar-user-img"
                          style={{ position: "relative" }}
                        />
                        <span className="top-link-itm-txt">{authUser?.email}</span>
                      </Link>
                      <ul className="header__navbar-user-menu" style={{ display: isHover ? "block" : "none" }}>
                        <li className="header__navbar-user-item">
                          <button>Tài khoản của tôi</button>
                        </li>
                        <li className="header__navbar-user-item">
                          <button>Địa chỉ của tôi</button>
                        </li>
                        <li className="header__navbar-user-item">
                          <button>Đơn mua</button>
                        </li>
                        <li className="header__navbar-user-item header__navbar-user-item--separate">
                          <button onClick={handleLogout}>Đăng xuất</button>
                        </li>
                      </ul>
                    </li>
                  ) : (
                    <>
                      {" "}
                      <li>
                        <span className="top-link-itm-txt" onClick={openModalRegister}>
                          Register
                        </span>
                      </li>
                      <li className="vert-line"></li>
                      <li>
                        <span className="top-link-itm-txt" onClick={openModalLogin}>
                          Log in
                        </span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="header-cnt-bottom">
              <Navbar />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
