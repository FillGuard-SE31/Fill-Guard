// src/screens/admin/UserEditScreen.jsx
import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

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
      toast.success('User updated');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' className='my-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter user name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email' className='my-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter user email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='isAdmin' className='my-2'>
            <Form.Check
              type='checkbox'
              label='Is Admin'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </Form.Group>

          <Button type='submit' variant='primary' className='my-2'>
            Update
          </Button>
        </Form>
      )}
    </>
  );
};

export default UserEditScreen;
