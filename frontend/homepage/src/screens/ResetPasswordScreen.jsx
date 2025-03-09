import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
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
      <Card className="shadow-lg p-4">
        <Card.Body>
          <h1 className="text-center mb-4">Reset Password</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default ResetPasswordScreen;