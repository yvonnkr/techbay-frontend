import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { isValidEmail } from "../../helpers/validation";
import { redirectUserBasedOnRole } from "../../helpers/userRedirect";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  const user = useSelector((state) => state.user);

  useEffect(() => {
    redirectUserBasedOnRole(user, history);
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await auth.sendSignInLinkToEmail(email, config);

      toast.success(
        `Email has been sent to ${email}. Click the link to complete your registration.`
      );

      window.localStorage.setItem("emailForRegistration", email);

      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        autoFocus
      />

      <br />
      <button type="submit" className="btn btn-raised">
        Register
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>REGISTER</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
