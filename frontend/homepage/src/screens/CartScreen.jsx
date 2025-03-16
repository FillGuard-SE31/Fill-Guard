import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Row>
      <h1 style={{ marginBottom: '20px', textAlign: 'center', marginTop: '50px'}}>Shopping Cart</h1>
      <Col md={8}>        
        {cartItems.length === 0 ? (
            <div style={{ 
              backgroundColor: '#605c5c', 
              padding: '15px', 
              borderRadius: '5px',
              marginBottom: '20px',
              color: 'white'
            }}>
              Your cart is empty <Link to='/shop' style={{ color: 'white' }}>Go To Shop</Link>
            </div>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
                <ListGroup.Item style={{ border: 'none', padding: '20px', textAlign: 'left' }}>
                  {/* First Row - Item Count & Total Price */}
                  <div style={{
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    marginBottom: '10px'
                  }}>
                    <span>Item ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                    <span>US ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                  </div>

                  {/* Second Row - Subtotal Text & Price */}
                  <div style={{
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    marginBottom: '15px'
                  }}>
                    <span>Subtotal</span>
                    <span>US ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      padding: "12px",
                      border: "none",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      borderRadius: "30px",
                      fontSize: "18px",
                      width: "100%",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#ffc300")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
                  >
                    Go to checkout
                  </Button>
                </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>

    </Row>
  );
};

export default CartScreen;