import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Button from 'muicss/lib/react/button';
import '../sass/home.scss';
import { white, logoBG, orange } from './componentStyles/colors';

const styles = {
  row: {
    marginTop: '10%',
    textAlign: 'center',
    color: white,
  },
  btn: {
    background: logoBG,
  },
  a: {
    color: orange,
    textTransform: 'capitalize',
  },
  i: {
    display: 'block',
    position: 'relative',
    top: '-20px',
    fontSize: '1.4em',
    color: white,
  },
};
const { row, btn, a, i } = styles;
export default function Home() {
  return (
    <div>
      <Container className="home view-height-fix">
        <Row style={row}>
          <Col md="12"><h1>Hi, I&rsquo;m Scottie Crump</h1></Col>
          <Col md="12"><h3>I build modern, responsive websites.</h3></Col>
          <Col md="12">
            <Button size="large" style={btn}>
              <Link style={a} to="/projects">View Projects</Link>
              <i className="fa fa-angle-down" style={i} />
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
