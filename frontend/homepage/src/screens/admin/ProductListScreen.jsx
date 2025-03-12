// src/screens/admin/ProductListScreen.jsx
import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Card } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
import "../../styles/ProductListScreen.css"; // Import the new CSS file

const ProductListScreen = () => {
  const navigate = useNavigate();

  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Create a new sample product?")) {
      try {
        await createProduct().unwrap();
        toast.success("Sample Product Created");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container product-list-container">
      <Card className="shadow-lg p-4 modern-productlist-card">
        <Card.Body>
          <Row className="align-items-center mb-4">
            <Col>
              <h1 className="text-center">Product Management</h1>
            </Col>
            <Col className="text-end">
              <Button className="modern-create-btn" onClick={createProductHandler} disabled={loadingCreate}>
                <FaPlus /> Create Product
              </Button>
            </Col>
          </Row>

          {loadingDelete && <Loader />}
          {loadingCreate && <Loader />}

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
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>STOCK</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>
                      <span className={product.countInStock > 0 ? "status-instock" : "status-outofstock"}>
                        {product.countInStock}
                      </span>
                    </td>
                    <td className="product-actions">
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button className="btn-sm modern-edit-btn">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button className="btn-sm modern-delete-btn" onClick={() => deleteHandler(product._id)}>
                        <FaTrash />
                      </Button>
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

export default ProductListScreen;