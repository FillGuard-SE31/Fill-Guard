// import { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import Loader from "../components/Loader";
// import FormContainer from "../components/FormContainer";

// import { useLoginMutation } from "../slices/usersApiSlice";
// import { setCredentials } from "../slices/authSlice";
// import { toast } from "react-toastify";
// import "../styles/LoginScreen.css"; 


// const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [login, { isLoading }] = useLoginMutation();

//   const { userInfo } = useSelector((state) => state.auth);

//   const { search } = useLocation();
//   const sp = new URLSearchParams(search);
//   const redirect = sp.get("redirect") || "/";

//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [navigate, redirect, userInfo]);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await login({ email, password }).unwrap();
//       dispatch(setCredentials({ ...res }));
//       navigate(redirect);
//     } catch (err) {
//       toast.error(err?.data?.message || err.error);
//     }
//   };

//   return (
//     <FormContainer className="FormContainer">
//       <h1>Sign In</h1>

//       <Form onSubmit={submitHandler}>
//         <Form.Group className="my-2" controlId="email">
//           <Form.Label>Email Address</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group className="my-2" controlId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Button className="button" disabled={isLoading} type="submit" variant="primary">
//           Sign In
//         </Button>

//         {isLoading && <Loader />}
//       </Form>

//       <Row className="py-3">
//         <Col>
//           New Customer?{" "}
//           <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
//             Register
//           </Link>
//         </Col>
//       </Row>
//     </FormContainer>
//   );
// };

// export default LoginScreen;

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainerNew";
// import FormContainer from "../components/FormContainer";
import "../styles/LoginScreen.css"; 

import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation(); // Removed isLoading to avoid warning

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      if (rememberMe) {
        localStorage.setItem("rememberMe", true);
      } else {
        localStorage.removeItem("rememberMe");
      }
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <Card className="shadow-lg p-4 modern-login-card">
        <Card.Body>
          <h1 className="text-center mb-4">Sign In</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="form-floating mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
              <Form.Label>Email Address</Form.Label>
            </Form.Group>

            <Form.Group className="form-floating mb-3" controlId="password">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <Form.Label>Password</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3 d-flex justify-content-between align-items-center" controlId="rememberMe">
              <Form.Check
                type="checkbox"
                label="Remember Me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Link to="/forgot-password" className="small">
                Forgot Password?
              </Link>
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100 mb-3 modern-login-btn">
              Sign In
            </Button>
          </Form>

          <Row className="py-3">
            <Col className="text-center">
              New Customer?{" "}
              <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default LoginScreen;