import React from 'react';
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
    fontSize: '4rem',
  },
};
const { row, a } = styles;

export default function Footer() {
  return (
    <div>
      <Appbar>
        <Container fluid>
          <Row style={row}>
            <Col md="3">
              <a
                style={a}
                target="_blank"
                rel="noreferrer noopener"
                href="https://www.linkedin.com/in/scottiecrump/"
              >
                <i className="fa fa-linkedin-square" />
              </a>
            </Col>
            <Col md="3">
              <a
                style={a}
                target="_blank"
                rel="noreferrer noopener"
                href="https://github.com/Scrump31/"
              >
                <i className="fa fa-github-square" />
              </a>
            </Col>
            <Col md="3">
              <a
                style={a}
                target="_blank"
                rel="noreferrer noopener"
                href="https://www.youtube.com/channel/UCNLKKASf6kkiBu5ewsv7jwQ"
              >
                <i className="fa fa-youtube-square" />
              </a>
            </Col>
            <Col md="3">
              <a
                style={a}
                target="_blank"
                rel="noreferrer noopener"
                href="https://twitter.com/ScottieCrump"
              >
                <i className="fa fa-twitter-square" />
              </a>
            </Col>
          </Row>
        </Container>
      </Appbar>
    </div>
  );
}
