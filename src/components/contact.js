import React from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Button from 'muicss/lib/react/button';
import { orange, logoBG, white } from './componentStyles/colors';
import '../sass/contact.scss';

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
  },
  h1: {
    color: white,
    fontSize: '4rem',
  },
};

const { row, btn, a, h1 } = styles;
export default function Contact() {
  return (
    <div>
      <Container className="view-height-fix">
        <Row style={row}>
          <Col md="12">
            <h1 style={h1}>Feel free to contact me below by email.</h1>
            <Button style={btn} size="large">
              <a style={a} href="mailto:sncrump29@gmail.com">sncrump29@gmail.com</a>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
