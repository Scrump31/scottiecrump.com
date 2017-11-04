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
    paddingTop: '4px',
  },
  logoCol: {
    marginTop: '3px',
  },
  linkCol: {
    marginTop: '5px',
  },
  a: {
    textDecoration: 'none',
    color: white,
    fontSize: '1.9rem',
  },
  logoA: {
    color: orange,
    padding: '23px',
    textDecoration: 'none',
    fontSize: '30px',
  },
  logoBtn: {
    background: logoBG,
    margin: 0,
    height: '48px',
    padding: 0,
    borderLeft: `3px solid ${gray}`,
  },
  logoSpan: {
    marginLeft: '7px',
    fontSize: '1.5rem',
  },
  active: {
    fontWeight: 'bold',
    color: orange,
  },
};
const { row, a, logoA, logoBtn, logoCol, logoSpan, linkCol, active } = styles;

export default function NavBar() {
  return (
    <div>
      <Appbar>
        <Container fluid>
          <Row style={row}>
            <Col style={logoCol} xs="12" md="4">
              <Button style={logoBtn} variant="raised" color="primary">
                <NavLink style={logoA} to="/">SC</NavLink>
              </Button>
              <span style={logoSpan}>Web Developer</span>
            </Col>
            <Col style={linkCol} xs="3" md="1" md-offset="3">
              <NavLink
                style={a}
                to="/about"
                activeStyle={active}
              >About</NavLink>
            </Col>
            <Col style={linkCol} xs="3" md="1">
              <NavLink style={a} to="/projects" activeStyle={active}>Projects</NavLink>
            </Col>
            <Col style={linkCol} xs="3" md="1">
              <a
                style={a}
                target="_blank"
                rel="noreferrer noopener"
                href="https://medium.com/@scottiecrump"
              >Blog</a>
            </Col>
            <Col style={linkCol} xs="3" md="1">
              <NavLink style={a} to="/contact"activeStyle={active}>Contact</NavLink>
            </Col>
          </Row>
        </Container>
      </Appbar>
    </div>
  );
}
