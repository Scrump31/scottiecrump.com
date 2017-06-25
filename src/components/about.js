import React from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Panel from 'muicss/lib/react/panel';
import about from '../images/about-me-2.jpg';
import { contentBG } from './componentStyles/colors';
import '../sass/about.scss';

const styles = {
  panel: {
    textAlign: 'center',
    marginTop: '10%',
  },
  img: {
    width: '90%',
    marginTop: '15px',
  },
  content: {
    fontSize: '1.5em',
    lineHeight: '1.8em',
    marginBottom: '1.5em',
    background: contentBG,
    padding: '10px',
    textAlign: 'left',
    color: 'white',
  },
};
const { panel, img, content } = styles;

export default function About() {
  return (
    <div>
      <Container className="about">
        <Row>
          <Col md="8" md-offset="2">
            <Panel style={panel}>
              <Col md="4">
                <img style={img} src={about} alt={'scottie crump'} />
              </Col>
              <div style={content}>
                <p>
                  I am currently a Web Developer in the Charlotte, N.C. area looking
                  for exciting new IT opportunities to further my knowledge and
                  skill set.
                </p>
                <p>
                  What I love most about software development is being
                  apart of a passionate community full of resources and ideas
                  to build better products for people!
                </p>
                <p>
                  When I am not busy coding, you can find me spending time with
                  my new wife Vicki or staying fit at the gym. I love gymnastic
                  exercises especially pull-ups!
                </p>
              </div>
            </Panel>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
