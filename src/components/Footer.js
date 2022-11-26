import React from "react";

/* react bootstrap */
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; https://github.com/YishaiHaim</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
