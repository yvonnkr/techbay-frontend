import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import { auth } from "./firebase";

import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { currentUser } from "./actions/authActions";

const App = () => {
  const dispatch = useDispatch();

  //check firebase auth state and set user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);
        // console.log("token", idTokenResult);

        dispatch(currentUser(user, idTokenResult));
      }
    });

    // Cleanup
    return () => unsubscribe();
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
      </Switch>
    </>
  );
};

export default App;
