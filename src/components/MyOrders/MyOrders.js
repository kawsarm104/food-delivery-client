import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import MyOrder from './MyOrder/MyOrder';
import { useSelector } from 'react-redux';

// React toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyOrders = () => {
  const { user } = useAuth();
  const allOrders = useSelector((state) => state.cart.allOrders);

  const notify = () => toast.success('Order deleted successfully');

  const uniqUserOrder = allOrders.filter((order) => order.email === user.email);
  return (
    <div className="container ">
      <div className="row mt-5">
        <div className="table-responsive">
          <table className="shadow table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Item Name</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {uniqUserOrder.map((userData, index) => (
                <MyOrder
                  key={userData._id}
                  index={index}
                  userData={userData}
                ></MyOrder>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyOrders;
