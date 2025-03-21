// import { useState, useEffect } from 'react';
// import { Form, Button, Col, Card} from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import FormContainer from '../components/FormContainer';
// import CheckoutSteps from '../components/CheckoutSteps';
// import { savePaymentMethod } from '../slices/cartSlice';

// const PaymentScreen = () => {
//   const navigate = useNavigate();
//   const cart = useSelector((state) => state.cart);
//   const { shippingAddress } = cart;

//   useEffect(() => {
//     if (!shippingAddress.address) {
//       navigate('/shipping');
//     }
//   }, [navigate, shippingAddress]);

//   const [paymentMethod, setPaymentMethod] = useState('PayPal');

//   const dispatch = useDispatch();

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(savePaymentMethod(paymentMethod));
//     navigate('/placeorder');
//   };

//   return (
//     <FormContainer>
//       <CheckoutSteps step1 step2 step3 />
//       <Card className="shadow-lg p-4">
//         <Card.Body>
//         <h2 className="text-center mb-3">Payment</h2>
//       <Form onSubmit={submitHandler}>
//         <Form.Group>
//           <Form.Label as='legend'>Select Your Payment Method</Form.Label>
//           <Col>
//             <Form.Check
//               className='my-2'
//               type='radio'
//               label='PayPal or Credit Card'
//               id='PayPal'
//               name='paymentMethod'
//               value='PayPal'
//               checked
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             ></Form.Check>
//           </Col>
//         </Form.Group>

//         <div className="text-center mt-3">
//         <Button type="submit" variant="primary" style={{
//                        backgroundColor: "black",
//                        color: "white",
//                        padding: "12px",
//                        border: "none",
//                        cursor: "pointer",
//                        transition: "background-color 0.3s ease",
//                        borderRadius: "30px",
//                        fontSize: "18px",
//                        width: "25%"
//                      }}
//                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#ffc300")}
//                      onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}>
//                   Continue
//                </Button>
//                </div>
//       </Form>
//       </Card.Body>
//       </Card>
//       <span style={{ marginBottom: "250px", display: "block" }}></span>
//     </FormContainer>
//   );
// };

// export default PaymentScreen;

import { useState, useEffect } from 'react';
import { Form, Button, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaCcPaypal, FaCreditCard } from 'react-icons/fa';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <Card className="shadow-lg p-4">
          <Card.Body>
            <h2 className="text-center mb-3">Payment</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label as='legend'>Select Your Payment Method</Form.Label>
                <Col>
                  <Card className="p-3 mb-2" onClick={() => setPaymentMethod('PayPal')} style={{ cursor: 'pointer', border: paymentMethod === 'PayPal' ? '2px solid #ffc300' : '' }}>
                    <Form.Check
                      type='radio'
                      label={<><FaCcPaypal size={20} className="me-2" color="#003087"/> PayPal</>}
                      id='PayPal'
                      name='paymentMethod'
                      value='PayPal'
                      checked={paymentMethod === 'PayPal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                  </Card>
                  <Card className="p-3" onClick={() => setPaymentMethod('CreditCard')} style={{ cursor: 'pointer', border: paymentMethod === 'CreditCard' ? '2px solid #ffc300' : '' }}>
                    <Form.Check
                      type='radio'
                      label={<><FaCreditCard size={20} className="me-2" color="#FFA500"/> Credit Card</>}
                      id='CreditCard'
                      name='paymentMethod'
                      value='CreditCard'
                      checked={paymentMethod === 'CreditCard'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                  </Card>
                </Col>
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
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
                >
                  Continue
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </FormContainer>
    </div>
  );
};

export default PaymentScreen;
