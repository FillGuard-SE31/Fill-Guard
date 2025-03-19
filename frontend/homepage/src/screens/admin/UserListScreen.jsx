// src/screens/admin/UserListScreen.jsx
import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Card } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetUsersQuery, useDeleteUserMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import "../../styles/UserListScreen.css"; // Import the new CSS file

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const res = await deleteUser(id).unwrap();
        toast.success(res.message);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container user-list-container">
      <Card className="shadow-lg p-4 modern-userlist-card">
        <Card.Body>
          <h1 className="text-center mb-4">User Management</h1>
          {loadingDelete && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error?.data?.message || error.error}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-modern">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`} className="user-email">
                        {user.email}
                      </a>
                    </td>
                    <td>
                      <span className={user.isAdmin ? "admin-badge" : "user-badge"}>
                        {user.isAdmin ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="user-actions">
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button className="btn-sm modern-edit-btn">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      {!user.isAdmin && (
                        <Button className="btn-sm modern-delete-btn" onClick={() => deleteHandler(user._id)}>
                          <FaTrash />
                        </Button>
                      )}
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

export default UserListScreen;