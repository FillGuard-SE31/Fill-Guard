// src/screens/admin/OrderListScreen.jsx
import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Card } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import "../../styles/OrderListScreen.css"; // Import the new CSS file

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="container order-list-container">
      <Card className="shadow-lg p-4 modern-orderlist-card">
        <Card.Body>
          <h1 className="text-center mb-4">Order Management</h1>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error?.data?.message || error.error}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-modern">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      <span className={order.isPaid ? "status-paid" : "status-unpaid"}>
                        {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                      </span>
                    </td>
                    <td>
                      <span className={order.isDelivered ? "status-delivered" : "status-pending"}>
                        {order.isDelivered ? order.deliveredAt.substring(0, 10) : "No"}
                      </span>
                    </td>
                    <td className="order-actions">
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm modern-details-btn">Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrderListScreen;