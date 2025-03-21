// // src/screens/PlaceOrderScreen.jsx
// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import Message from "../components/Message";
// import CheckoutSteps from "../components/CheckoutSteps";
// import Loader from "../components/Loader";
// import { useCreateOrderMutation } from "../slices/ordersApiSlice";
// import { clearCartItems } from "../slices/cartSlice";

// const PlaceOrderScreen = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);

//   // Destructure computed price values (which are stored as strings)
//   const { itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;

//   const [createOrder, { isLoading, error }] = useCreateOrderMutation();

//   useEffect(() => {
//     if (!cart.shippingAddress.address) {
//       navigate("/shipping");
//     } else if (!cart.paymentMethod) {
//       navigate("/payment");
//     }
//   }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

//   const placeOrderHandler = async () => {
//     try {
//       const orderItems = cart.cartItems.map((item) => ({
//         product: item.product, // product field is already set in the cart
//         name: item.name,
//         qty: item.qty,
//         image: item.image,
//         price: item.price,
//       }));

//       const res = await createOrder({
//         orderItems,
//         shippingAddress: cart.shippingAddress,
//         paymentMethod: cart.paymentMethod,
//         itemsPrice: Number(itemsPrice),
//         shippingPrice: Number(shippingPrice),
//         taxPrice: Number(taxPrice),
//         totalPrice: Number(totalPrice),
//       }).unwrap();

//       dispatch(clearCartItems());
//       navigate(`/order/${res._id}`);
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to place order");
//     }
//   };

//   return (
//     <>
//       <CheckoutSteps step1 step2 step3 step4 />
//       <Row>
//         <Col md={8}>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <h2>Shipping</h2>
//               <p>
//                 <strong>Address: </strong>
//                 {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
//                 {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
//               </p>
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <h2>Payment Method</h2>
//               <strong>Method: </strong>
//               {cart.paymentMethod}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <h2>Order Items</h2>
//               {cart.cartItems.length === 0 ? (
//                 <Message>Your cart is empty</Message>
//               ) : (
//                 <ListGroup variant="flush">
//                   {cart.cartItems.map((item, i) => (
//                     <ListGroup.Item key={i}>
//                       <Row className="align-items-center">
//                         <Col md={1}>
//                           <Image src={item.image} alt={item.name} fluid rounded />
//                         </Col>
//                         <Col>
//                           <Link to={`/product/${item.product}`}>
//                             {item.name}
//                           </Link>
//                         </Col>
//                         <Col md={4}>
//                           {item.qty} x ${item.price} ={" "}
//                           <strong>${(item.qty * item.price).toFixed(2)}</strong>
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )}
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>
//         <Col md={4}>
//           <Card>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <h2>Order Summary</h2>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Items</Col>
//                   <Col>${Number(itemsPrice).toFixed(2)}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Shipping</Col>
//                   <Col>
//                     {Number(shippingPrice) === 0
//                       ? "Free"
//                       : `$${Number(shippingPrice).toFixed(2)}`}
//                   </Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Tax</Col>
//                   <Col>${Number(taxPrice).toFixed(2)}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>
//                     <strong>Total</strong>
//                   </Col>
//                   <Col>
//                     <strong>${Number(totalPrice).toFixed(2)}</strong>
//                   </Col>
//                 </Row>
//               </ListGroup.Item>
//               {error && (
//                 <ListGroup.Item>
//                   <Message variant="danger">
//                     {error?.data?.message ||
//                       error?.error ||
//                       "An error occurred"}
//                   </Message>
//                 </ListGroup.Item>
//               )}
//               <ListGroup.Item>
//                 <Button
//                   type="button"
//                   className="btn btn-primary w-100"
//                   disabled={cart.cartItems.length === 0}
//                   onClick={placeOrderHandler}
//                 >
//                   Place Order
//                 </Button>
//                 {isLoading && <Loader />}
//               </ListGroup.Item>
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default PlaceOrderScreen;

// src/screens/PlaceOrderScreen.jsx


// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import Message from "../components/Message";
// import CheckoutSteps from "../components/CheckoutSteps";
// import Loader from "../components/Loader";
// import { useCreateOrderMutation } from "../slices/ordersApiSlice";
// import { clearCartItems } from "../slices/cartSlice";

// const PlaceOrderScreen = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);

//   // Destructure computed price values (which are stored as strings)
//   const { itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;

//   const [createOrder, { isLoading, error }] = useCreateOrderMutation();

//   useEffect(() => {
//     if (!cart.shippingAddress.address) {
//       navigate("/shipping");
//     } else if (!cart.paymentMethod) {
//       navigate("/payment");
//     }
//   }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

//   const placeOrderHandler = async () => {
//     try {
//       const orderItems = cart.cartItems.map((item) => ({
//         product: item.product, // product field is already set in the cart
//         name: item.name,
//         qty: item.qty,
//         image: item.image,
//         price: item.price,
//       }));

//       const res = await createOrder({
//         orderItems,
//         shippingAddress: cart.shippingAddress,
//         paymentMethod: cart.paymentMethod,
//         itemsPrice: Number(itemsPrice),
//         shippingPrice: Number(shippingPrice),
//         taxPrice: Number(taxPrice),
//         totalPrice: Number(totalPrice),
//       }).unwrap();

//       dispatch(clearCartItems());
//       navigate(`/order/${res._id}`);
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to place order");
//     }
//   };

//   return (
//     <>
//       <CheckoutSteps step1 step2 step3 step4 />  
//         <Row className="justify-content-center mt-4">
//           <Col md={8}>
//           <Card className="p-4 shadow" style={{ borderRadius: "12px", border: "none" }}>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <h2>Shipping</h2>
//                   <p className="text-center">
//                     <strong>Address: </strong>
//                       {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
//                       {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
//                   </p>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                   <h2>Payment Method</h2>
//                   <p className="text-center">
//                     <strong >Method: </strong>
//                      {cart.paymentMethod}
//                   </p>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <h2>Order Items</h2>
//                   {cart.cartItems.length === 0 ? (
//                     <Message>Your cart is empty</Message>
//                       ) : (
//                       <ListGroup variant="flush">
//                        {cart.cartItems.map((item, i) => (
//                         <ListGroup.Item key={i}>
//                           <Row className="align-items-center">
//                             <Col md={1}>
//                                 <Image src={item.image} alt={item.name} fluid rounded />
//                             </Col>

//                             <Col>
//                               <Link to="/shop">{item.name}</Link>
//                             </Col>

//                             <Col md={4}>
//                               {item.qty} x ${item.price} ={" "}
//                                 <strong>${(item.qty * item.price).toFixed(2)}</strong>
//                             </Col>
//                           </Row>
//                         </ListGroup.Item>
//                       ))}
//                       </ListGroup>
//                   )}
//                </ListGroup.Item>
//               </ListGroup>
//             </Card>
//           </Col>
//         </Row>

//         <Col md={4}>
//           <Card>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <h2>Order Summary</h2>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Items</Col>
//                   <Col>${Number(itemsPrice).toFixed(2)}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Shipping</Col>
//                   <Col>
//                     {Number(shippingPrice) === 0
//                       ? "Free"
//                       : `$${Number(shippingPrice).toFixed(2)}`}
//                   </Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Tax</Col>
//                   <Col>${Number(taxPrice).toFixed(2)}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>
//                     <strong>Total</strong>
//                   </Col>
//                   <Col>
//                     <strong>${Number(totalPrice).toFixed(2)}</strong>
//                   </Col>
//                 </Row>
//               </ListGroup.Item>
//               {error && (
//                 <ListGroup.Item>
//                   <Message variant="danger">
//                     {error?.data?.message ||
//                       error?.error ||
//                       "An error occurred"}
//                   </Message>
//                 </ListGroup.Item>
//               )}
//               <ListGroup.Item>
//                 <Button
//                   type="button"
//                   className="btn btn-primary w-100"
//                   disabled={cart.cartItems.length === 0}
//                   onClick={placeOrderHandler}
//                 >
//                   Place Order
//                 </Button>
//                 {isLoading && <Loader />}
//               </ListGroup.Item>
//             </ListGroup>
//           </Card>
//         </Col>
      
//     </>
//   );
// };

// export default PlaceOrderScreen;


import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Pencil } from "lucide-react";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const orderItems = cart.cartItems.map((item) => ({
        product: item.product,
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
      }));

      const res = await createOrder({
        orderItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: Number(itemsPrice),
        shippingPrice: Number(shippingPrice),
        taxPrice: Number(taxPrice),
        totalPrice: Number(totalPrice),
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to place order");
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row className="justify-content-center mt-4 gap-4">
        <Col md={8}>
          <Card className="p-4 shadow mx-auto" style={{ borderRadius: "12px", border: "none" }}>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <h2>Shipping</h2>
                <Pencil style={{ cursor: "pointer" }} onClick={() => navigate("/shipping")} />
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Address: </strong>{cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </ListGroup.Item>
              
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <h2>Payment Method</h2>
                <Pencil style={{ cursor: "pointer" }} onClick={() => navigate("/payment")} />
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Method: </strong>{cart.paymentMethod}
              </ListGroup.Item>
              
              <ListGroup.Item>
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, i) => (
                      <ListGroup.Item key={i} className="d-flex align-items-center">
                        <Image src={item.image} alt={item.name} fluid rounded width={50} />
                        <Col className="ms-3">
                          <Link to="/shop">{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = <strong>${(item.qty * item.price).toFixed(2)}</strong>
                        </Col>
                        <Pencil style={{ cursor: "pointer" }} onClick={() => navigate("/cart")} />
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="shadow mx-auto" style={{ borderRadius: "12px", border: "none" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${Number(itemsPrice).toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{Number(shippingPrice) === 0 ? "Free" : `$${Number(shippingPrice).toFixed(2)}`}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${Number(taxPrice).toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col><strong>Total</strong></Col>
                  <Col><strong>${Number(totalPrice).toFixed(2)}</strong></Col>
                </Row>
              </ListGroup.Item>
              {error && (
                <ListGroup.Item>
                  <Message variant="danger">{error?.data?.message || error?.error || "An error occurred"}</Message>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button type="button" className="btn btn-primary w-100" disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}
                 style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "12px",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  borderRadius: "30px",
                  fontSize: "18px",
                  width: "25%",
                  position: "center"
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#ffc300")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}>
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <span style={{ marginBottom: "25px", display: "block" }}></span>
    </>
  );
};

export default PlaceOrderScreen;
