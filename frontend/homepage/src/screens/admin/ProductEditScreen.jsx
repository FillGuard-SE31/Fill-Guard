// src/screens/admin/ProductEditScreen.jsx
import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
import "../../styles/ProductEditScreen.css"; // Import new styling

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      }).unwrap();
      toast.success("Product updated successfully!");
      refetch();
      // Delay redirection by 2 seconds so the toast remains visible
      setTimeout(() => {
        navigate("/admin/productlist");
      }, 2000);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container product-edit-container">
      <Card className="shadow-lg p-4 modern-productedit-card">
        <Card.Body>
          <Link to="/admin/productlist" className="btn modern-go-back">
            ← Back to Products
          </Link>
          <h1 className="text-center mb-4">Edit Product</h1>
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
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Form.Label>Product Name</Form.Label>
              </Form.Group>

              <Form.Group controlId="price" className="form-floating mb-3">
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                />
                <Form.Label>Price ($)</Form.Label>
              </Form.Group>

              <Form.Group controlId="image" className="mb-3">
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <div className="upload-btn-wrapper">
                  <Button className="modern-upload-btn">Upload Image</Button>
                  <input type="file" onChange={uploadFileHandler} />
                </div>
                {loadingUpload && <Loader />}
              </Form.Group>

              <Form.Group controlId="brand" className="form-floating mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
                <Form.Label>Brand</Form.Label>
              </Form.Group>

              <Form.Group controlId="countInStock" className="form-floating mb-3">
                <Form.Control
                  type="number"
                  placeholder="Enter stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(Number(e.target.value))}
                  required
                />
                <Form.Label>Stock Quantity</Form.Label>
              </Form.Group>

              <Form.Group controlId="category" className="form-floating mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
                <Form.Label>Category</Form.Label>
              </Form.Group>

              <Form.Group controlId="description" className="form-floating mb-3">
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <Form.Label>Description</Form.Label>
              </Form.Group>

              <Button type="submit" className="w-100 modern-productedit-btn">
                Update Product
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductEditScreen;