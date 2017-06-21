import React from 'react';
import { NavLink } from 'react-router-dom';
import Appbar from 'muicss/lib/react/appbar';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { white, orange, boxShadow, logoBG } from './componentStyles/colors';
import '../sass/navbar.scss';

const styles = {
  row: {
    textAlign: 'center',
    fontSize: '3rem',
    paddingTop: 4,
  },
  muiColMd2: {
    marginTop: 3,
  },
  a: {
    textDecoration: 'none',
    color: white,
  },
  logoA: {
    color: orange,
    boxShadow,
    padding: 5,
    background: logoBG,
    textDecoration: 'none',
  },
  active: {
    fontWeight: 'bold',
    color: orange,
  },
};
const { row, a, logoA, active, muiColMd2 } = styles;

export default function NavBar() {
  return (
    <div>
      <Appbar>
        <Container fluid>
          <Row style={row}>
            <Col style={muiColMd2} md="2">
              <NavLink style={logoA} to="/">SC</NavLink>
            </Col>
            <Col md="2" md-offset="4">
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
