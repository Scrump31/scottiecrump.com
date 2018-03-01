import React from 'react';
import Appbar from 'muicss/lib/react/appbar';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { white, orange, boxShadow } from './componentStyles/colors';
import '../sass/footer.scss';

const styles = {
  appbar: {
    height: 186,
  },
  row: {
    textAlign: 'center',
    fontSize: '3rem',
    paddingTop: 20,
  },
  h4: {
    textAlign: 'center',
    fontSize: '2rem',
  },
  a: {
    color: white,
    textDecoration: 'none',
    fontSize: '4rem',
  },
  i: {
    background: orange,
    padding: '6px 10px',
    borderRadius: '50%',
    boxShadow,
  },
};
const { appbar, row, h4, a, i } = styles;

export default function Footer() {
  const getDate = () => new Date().getFullYear();
  return (
    <div>
      <Appbar style={appbar}>
        <Container fluid>
          <Row style={row}>
            <Col xs="6" md="3">
              <a
                style={a}
                target="_blank"
                rel="noreferrer noopener"
                href="https://www.linkedin.com/in/scottiecrump/"
              >
                <i style={i} className="fa fa-linkedin" />
              </a>
            </Col>
            <Col xs="6" md="3">
              <a
                style={a}
                target="_blank"
                rel="noreferrer noopener"
                href="https://github.com/Scrump31/"
              >
                <i style={i} className="fa fa-github" />
              </a>
            </Col>
            <Col xs="6" md="3">
              <a
                style={a}
                target="_blank"
                rel="noreferrer noopener"
                href="https://www.youtube.com/channel/UCNLKKASf6kkiBu5ewsv7jwQ"
              >
                <i style={i} className="fa fa-youtube" />
              </a>
            </Col>
            <Col xs="6" md="3">
              <a
                style={a}
                target="_blank"
                rel="noreferrer noopener"
                href="https://twitter.com/ScottieCrump"
              >
                <i style={i} className="fa fa-twitter" />
              </a>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12"><p style={h4}>© {getDate()} ScottieCrump.com</p></Col>
          </Row>
        </Container>
      </Appbar>
    </div>
  );
}
