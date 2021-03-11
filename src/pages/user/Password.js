import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import Spin from "antd/lib/spin";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await auth.currentUser.updatePassword(password);

      setLoading(false);
      setPassword("");
      toast.success("Password updated");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter new password"
          disabled={loading}
          value={password}
          autoFocus
        />
        <button
          className="btn btn-outline-info btn-raised mt-3"
          disabled={!password || password.length < 6 || loading}
        >
          Submit
        </button>
      </div>
    </form>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col ">
          {loading ? (
            <Spin tip="loading" />
          ) : (
            <h4 className="text-center mt-3">Password Update</h4>
          )}
          <br />
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
