import React from "react";

const UserHistory = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          {/* TODO: <UserNav /> */}
          User History Page
        </div>
        <div className="col text-center">
          <h4>
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
