import React, { useState, useEffect } from "react";
import "./Register";
import Modal from "react-modal";
import useLogin from "../../hooks/useLogin";
import { useDispatch, useSelector } from "react-redux";
import useSignup from "../../hooks/useSignup";
Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const Register = ({ modalIsOpen, openModal, closeModal, afterOpenModal }) => {
  const [email, setEmail] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const { loading, signup } = useSignup();
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    await signup({ email, password, confirmPassword });
    window.location.reload();
  };

  return (
    <div>
      <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <button onClick={closeModal}>close</button>
        <div className="auth-form">
          <div className="auth-form__container">
            <div className="auth-form__header">
              <h3 className="auth-form__heading">Đăng ký </h3>
              <span className="auth-form__switch-btn">Đăng nhập</span>
            </div>

            <div className="auth-form__form">
              <div className="auth-form__group">
                <input type="text" className="auth-form__input" placeholder="Email ?" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="auth-form__group">
                <input
                  type="password"
                  className="auth-form__input"
                  placeholder="Password ?"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="auth-form__group">
                <input
                  type="confirmPassword"
                  className="auth-form__input"
                  placeholder="confirm Password ?"
                  value={confirmPassword}
                  onChange={(e) => SetConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-form__aside">
              <p className="auth-form__policy-text">
                Bằng việc đăng kí, bạn đã đồng ý với F8-Shop về
                <span className="auth-form__text-link">Điều khoản dịch vụ</span> &<span className="auth-form__text-link">Chính sách bảo mật</span>
              </p>
            </div>

            <div className="auth-form__controls">
              <button className="btn btn--normal auth-form__controls-back">TRỞ LẠI</button>
              <button className="btn btn--primary" onClick={handleSubmit}>
                {loading ? <span className="loading loading-spinner "></span> : " ĐĂNG KÝ"}
              </button>
            </div>
          </div>

          <div className="auth-form__socials">
            <a className="auth-form__socials--facebook btn btn--size-s btn--with-icon">
              <i className="auth-form__socials-icon fab fa-facebook-square"></i>
              <span className="auth-form__socials-title"> Kết nối với Facebook </span>
            </a>
            <a className="auth-form__socials--google btn btn--size-s btn--with-icon">
              <i className="auth-form__socials-icon fab fa-google"></i>
              <span className="auth-form__socials-title"> Kết nối với Google </span>
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Register;
