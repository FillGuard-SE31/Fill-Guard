import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { useForgotPasswordMutation } from "../slices/usersApiSlice";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      toast.success("Password reset link sent! Check your email.");
    } catch (error) {
      toast.error(error?.data?.message || "Error sending email.");
    }
  };

  return (
    <FormContainer>
      <Card className="shadow-lg p-4">
        <Card.Body>
          <h1 className="text-center mb-4">Forgot Password</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default ForgotPasswordScreen;
