import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spin from "antd/lib/spin";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { isValidEmail } from "../../helpers/validation";
import { redirectUserBasedOnRole } from "../../helpers/userRedirect";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    redirectUserBasedOnRole(user, history);
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    try {
      await auth.sendPasswordResetEmail(email, config);

      toast.success("Check your email for password reset link");

      setEmail("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const forgotPasswordForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        autoFocus
      />
      <br />
      <button
        className="btn btn-raised"
        disabled={!email || !isValidEmail(email)}
      >
        Submit
      </button>
    </form>
  );

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? <Spin /> : <h4>Forgot Password ?</h4>}

      {forgotPasswordForm()}
    </div>
  );
};

export default ForgotPassword;
