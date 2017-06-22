import React from 'react';
import { NavLink } from 'react-router-dom';
import Appbar from 'muicss/lib/react/appbar';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Button from 'muicss/lib/react/button';
import { white, orange, gray, logoBG } from './componentStyles/colors';
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
    fontSize: '2rem',
  },
  logoA: {
    color: orange,
    padding: 23,
    background: logoBG,
    textDecoration: 'none',
    fontSize: 30,
  },
  logoBtn: {
    margin: 0,
    height: 48,
    padding: 0,
    borderLeft: `3px solid ${gray}`,
  },
  active: {
    fontWeight: 'bold',
    color: orange,
  },
};
const { row, a, logoA, logoBtn, active, muiColMd2 } = styles;

export default function NavBar() {
  return (
    <div>
      <Appbar>
        <Container fluid>
          <Row style={row}>
            <Col style={muiColMd2} xs="12" md="2">
              <Button style={logoBtn} variant="raised" color="primary">
                <NavLink style={logoA} to="/">SC</NavLink>
              </Button>
            </Col>
            <Col xs="4" md="2" md-offset="4">
              <NavLink
                style={a}
                to="/about"
                activeStyle={active}
              >About</NavLink>
            </Col>
            <Col xs="4" md="2">
              <NavLink style={a} to="/projects" activeStyle={active}>Projects</NavLink>
            </Col>
            <Col xs="4" md="2">
              <NavLink style={a} to="/contact"activeStyle={active}>Contact</NavLink>
            </Col>
          </Row>
        </Container>
      </Appbar>
    </div>
  );
}
