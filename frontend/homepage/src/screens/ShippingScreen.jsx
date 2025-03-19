import { useState } from "react";
import { Form, Button, Card, } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../slices/cartSlice";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <Card className="shadow-lg p-4 modern-shipping-card">
        <Card.Body>
      <h2 className="text-center mb-3">Shipping</h2>

      <Form onSubmit={submitHandler}>
        <Form.Group className="form-floating mb-3" controlId="address">
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
          <Form.Label>Address</Form.Label>
        </Form.Group>

        <Form.Group className="form-floating mb-3" controlId="city">
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
          <Form.Label>City</Form.Label>
        </Form.Group>

        <Form.Group className="form-floating mb-3" controlId="postalCode">
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
          <Form.Label>Postal Code</Form.Label>
        </Form.Group>

        <Form.Group className="form-floating mb-3" controlId="country">
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
          <Form.Label>Country</Form.Label>
        </Form.Group>

        <div className="text-center mt-3">
        <Button type="submit" variant="primary" style={{
                       backgroundColor: "black",
                       color: "white",
                       padding: "12px",
                       border: "none",
                       cursor: "pointer",
                       transition: "background-color 0.3s ease",
                       borderRadius: "30px",
                       fontSize: "18px",
                       width: "25%"
                     }}
                     onMouseEnter={(e) => (e.target.style.backgroundColor = "#ffc300")}
                     onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}>
                  Continue
               </Button>
            </div>
      </Form>
      </Card.Body>
      </Card>
      <span style={{ marginBottom: "85px", display: "block" }}></span>
    </FormContainer>
    
  );
};

export default ShippingScreen;