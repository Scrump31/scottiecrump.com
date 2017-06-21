import React from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Panel from 'muicss/lib/react/panel';
import NavBar from './navbar';
import Footer from './footer';

const styles = {
  panel: {
    marginTop: 20,
    textAlign: 'center',
  },
  img: {
    width: '100%',
  },
};
const { panel, img } = styles;

export default function About() {
  return (
    <div>
      <NavBar />
      <Container>
        <Row>
          <Col md="4" md-offset="4">
            <Panel style={panel}>
              <img style={img} src={'http://lorempixel.com/200/200/people/'} alt={'1'} />
            </Panel>
          </Col>
        </Row>
      </Container>
      <Footer />

    </div>
  );
}
