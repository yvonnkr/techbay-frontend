import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import Password from "./pages/user/Password";
import WishList from "./pages/user/WishList";
import PrivateAdminRoute from "./components/routes/PrivateAdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { redirectUserBasedOnRole } from "./helpers/userRedirect";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getCurrentUser = getUserFromFirebase(dispatch);

    // cleanup
    return () => getCurrentUser();
  }, [dispatch]);

  useEffect(() => {
    redirectUserBasedOnRole(user, history);
  }, [history, user]);

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
        <PrivateUserRoute exact path="/user/password" component={Password} />
        <PrivateUserRoute exact path="/user/wishlist" component={WishList} />
        <PrivateAdminRoute
          exact
          path="/admin/dashboard"
          component={AdminDashboard}
        />
      </Switch>
    </>
  );
};

export default App;
