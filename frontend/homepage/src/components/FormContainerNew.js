import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container className="d-flex align-items-center justify-content-center form-container">
      <Row className="justify-content-md-center w-100">
        <Col xs={12} sm={10} md={8} lg={5}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;