import React from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Button from 'muicss/lib/react/button';
import NavBar from './navbar';
import Footer from './footer';
import { orange, logoBG } from './componentStyles/colors';

const styles = {
  row: {
    textAlign: 'center',
    padding: '15% 0',
  },
  btn: {
    background: logoBG,
    textTransform: 'none',
  },
  a: {
    color: orange,
    fontSize: '2.5rem',
  },
  h1: {
    color: logoBG,
  },
};

const { row, btn, a, h1 } = styles;
export default function Contact() {
  return (
    <div>
      <NavBar />
      <Container>
        <Row style={row}>
          <Col md="12">
            <h1 style={h1}>Feel free to contact me below by email.</h1>
            <Button style={btn} size="large">
              <a style={a} href="mailto:sncrump29@gmail.com">sncrump29@gmail.com</a>
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
