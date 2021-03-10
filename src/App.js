import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import { getUserFromFirebase } from "./helpers/firebaseGetUser";

import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import UserHistory from "./pages/user/UserHistory";
import PrivateUserRoute from "./components/routes/PrivateUserRoute";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = getUserFromFirebase(dispatch);
    // cleanup
    return () => getCurrentUser();
  }, [dispatch]);

  return (
    <>
      <Header />
      <ToastContainer />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />

        <PrivateUserRoute exact path="/user/history" component={UserHistory} />
      </Switch>
    </>
  );
};

export default App;
