import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainerNew"; // Ensure it's the same styled container as RegisterScreen
import "../styles/ForgotPasswordScreen.css"; // Add new CSS file for consistent styling
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
      <Card className="shadow-lg p-4 modern-forgot-card">
        <Card.Body>
          <h1 className="text-center mb-4">Forgot Password</h1>
          <p className="text-muted text-center mb-3">
            Enter your email, and we'll send you a password reset link.
          </p>
          <Form onSubmit={submitHandler}>
            <Form.Group className="form-floating mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Label>Email Address</Form.Label>
            </Form.Group>

            <Button type="submit" className="w-100 modern-forgot-btn" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <a href="/login" className="back-to-login">Back to Login</a>
          </div>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default ForgotPasswordScreen;
