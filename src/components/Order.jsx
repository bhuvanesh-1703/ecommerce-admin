import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";

const Order = () => {
  const [orders, setOrders] = useState([]);

  const getOrder = async () => {
    try {
      const response = await axios.get("http://localhost:5100/admin/order");
      setOrders(response.data.data);
    } catch (error) {
      console.log('Failed to fetch orders', error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div style={{ marginLeft: "25%", marginTop: "5%" }}>
      <h2>Orders</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Total</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Delete Orders</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.deliveryAddress.fullname}</td>
              <td>
                {order.products.map((product, i) => (
                  <div key={i}>
                    {product.productId?.productname} (Qty: {product.quantity})
                  </div>
                ))}
              </td>
              <td>
                {order.deliveryAddress.address}, {order.deliveryAddress.city}
              </td>
              <td>{order.deliveryAddress.pincode}</td>
              <td>{order.totalPrice}</td>
              <td>{new Date(order.date).toLocaleString()}</td>
              <td>{order.status}</td>
              <td>{order.paymentMethod}</td>
              <td><MdDeleteForever size={25} style={{color:"red",cursor:"pointer"}}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
