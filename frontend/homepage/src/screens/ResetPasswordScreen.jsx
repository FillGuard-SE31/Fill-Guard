import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainerNew"; 
import "../styles/ResetPasswordScreen.css"; 
import { useResetPasswordMutation } from "../slices/usersApiSlice";

const ResetPasswordScreen = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPassword({ token, password }).unwrap();
      toast.success("Password reset successful. You can now log in.");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || "Error resetting password.");
    }
  };

  return (
    <FormContainer>
      <Card className="shadow-lg p-4 modern-reset-card">
        <Card.Body>
          <h1 className="text-center mb-4">Reset Password</h1>
          <p className="text-muted text-center mb-3">
            Enter a new password for your account.
          </p>
          <Form onSubmit={submitHandler}>
            <Form.Group className="form-floating mb-3" controlId="password">
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Form.Label>New Password</Form.Label>
            </Form.Group>

            <Form.Group className="form-floating mb-3" controlId="confirmPassword">
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Form.Label>Confirm New Password</Form.Label>
            </Form.Group>

            <Button type="submit" className="w-100 modern-reset-btn" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
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

export default ResetPasswordScreen;