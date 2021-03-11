import React from "react";
import UserNav from "../../components/nav/UserNav";

const UserHistory = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center ">
          <h4 className="mt-3">
            User Purchase Orders
            {/* TODO: {orders.length > 0 ? "User Purchase Orders" : "No Purchase Orders"} */}
          </h4>
          {/* TODO: {showEachOrders()} */}
          orders
        </div>
      </div>
    </div>
  );
};

export default UserHistory;
