// src/screens/admin/UserEditScreen.jsx
import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetUserDetailsQuery, useUpdateUserMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import "../../styles/UserEditScreen.css"; // Import custom styling

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin }).unwrap();
      toast.success("User updated successfully");
      refetch();
      // Delay navigation by 2 seconds to allow the toast to be visible
      setTimeout(() => {
        navigate("/admin/userlist");
      }, 2000);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container user-edit-container">
      <Card className="shadow-lg p-4 modern-useredit-card">
        <Card.Body>
          <Link to="/admin/userlist" className="btn modern-go-back">
            ← Back to Users
          </Link>
          <h1 className="text-center mb-4">Edit User</h1>
          {loadingUpdate && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error?.data?.message || error.error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="form-floating mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter user name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Form.Label>Name</Form.Label>
              </Form.Group>

              <Form.Group controlId="email" className="form-floating mb-3">
                <Form.Control
                  type="email"
                  placeholder="Enter user email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Form.Label>Email Address</Form.Label>
              </Form.Group>

              <Form.Group controlId="isAdmin" className="form-check mb-3">
                <Form.Check
                  type="checkbox"
                  label="Administrator Access"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="modern-checkbox"
                />
              </Form.Group>

              <Button type="submit" className="w-100 modern-useredit-btn">
                Update User
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserEditScreen;