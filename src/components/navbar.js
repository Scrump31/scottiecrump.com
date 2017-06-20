import React from 'react';
import { NavLink } from 'react-router-dom';
import Appbar from 'muicss/lib/react/appbar';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';


const styles = {
  row: {
    textAlign: 'center',
    fontSize: '3rem',
    paddingTop: 4,
  },
  a: {
    color: '#fff',
    textDecoration: 'none',
  },
  active: {
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
};
const { row, a, active } = styles;

export default function NavBar() {
  return (
    <div>
      <Appbar>
        <Container fluid>
          <Row style={row}>
            <Col md="3">
              <NavLink style={a} to="/">Scottie Crump</NavLink>
            </Col>
            <Col md="2" md-offset="3">
              <NavLink
                style={a}
                to="/about"
                activeStyle={active}
              >About</NavLink>
            </Col>
            <Col md="2">
              <NavLink style={a} to="/projects" activeStyle={active}>Projects</NavLink>
            </Col>
            <Col md="2">
              <NavLink style={a} to="/contact"activeStyle={active}>Contact</NavLink>
            </Col>
          </Row>
        </Container>
      </Appbar>
    </div>
  );
}
