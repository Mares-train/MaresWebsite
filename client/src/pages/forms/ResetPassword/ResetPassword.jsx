import "./ResetPassword.css";
import { toast } from "react-toastify";
import { useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("Password is required");

    console.log({ password });
  };

  return (
    <section className="form-container">
      <h1 className="form-title">إعادة تعيين كلمة المرور</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="password" className="form-label">
          البريد الإلكتروني
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="email"
            id="email"
            placeholder="ادخل البريد الإلكتروني"
            className="form-input"
          />
        </div>
        <button type="submit" className="form-btn">
        إرسال
        </button>
      </form>
    </section>
  );
};

export default ResetPassword;
