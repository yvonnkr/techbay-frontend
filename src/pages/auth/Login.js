import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import Button from "antd/lib/button";
import Spin from "antd/lib/spin";
import MailOutlined from "@ant-design/icons/MailOutlined";
import GoogleOutlined from "@ant-design/icons/GoogleOutlined";

import { auth, googleAuthProvider } from "../../firebase";
import { createOrUpdateUser } from "../../actions/authActions";
import { isValidEmail } from "../../helpers/validation";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch(createOrUpdateUser(idTokenResult));

      history.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Invalid Email or Password");
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch(createOrUpdateUser(idTokenResult));

      history.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Invalid Email or Password");
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type="button"
        className="mb-3 btn btn-outline-info btn-raised "
        block
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading && <Spin />}

          <h4>LOGIN</h4>
          <br />

          {loginForm()}

          <Button
            onClick={googleLogin}
            type="button"
            className="mb-3 btn btn-outline-danger btn-raised "
            block
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>

          <Link to="/forgot/password" className="float-right text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
