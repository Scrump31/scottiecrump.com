import React from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import NavBar from './navbar';
import Footer from './footer';

const styles = {
  textCenter: {
    textAlign: 'center',
  },
};
const { textCenter } = styles;
export default function Home() {
  return (
    <div>
      <NavBar />
      <Container>
        <Row style={textCenter}>
          <Col md="12"><h1>Hi, I&rsquo;m Scottie Crump</h1></Col>
          <Col md="12"><h3>I build modern, responsive websites.</h3></Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
