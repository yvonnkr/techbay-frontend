import React from "react";
import UserNav from "../../components/nav/UserNav";

const WishList = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-8 ">
          <h4 className="text-center mt-3">User Wish List</h4>
        </div>
      </div>
    </div>
  );
};

export default WishList;
