import React from 'react';
import Col from 'muicss/lib/react/col';
import Button from 'muicss/lib/react/button';
import '../sass/project.scss';
import { white, logoBG, orange } from './componentStyles/colors';

const styles = {
  column: {
    marginBottom: '3%',
  },
  image: {
    width: '100%',
  },
  h2: {
    color: white,
    fontSize: '20px',
    left: '50%',
    overflow: 'hidden',
    position: 'absolute',
    top: '30%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    textAlign: 'center',
  },
  viewBtn: {
    background: logoBG,
    fontSize: '1.5em',
    left: '50%',
    overflow: 'hidden',
    position: 'absolute',
    top: '60%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    cursor: 'pointer',
  },
  gitBtn: {
    background: orange,
    cursor: 'pointer',
  },
  a: {
    color: white,
  },
  description: {
    color: white,
    textAlign: 'center',
    lineHeight: '1.6',
  },
};
const { column, image, h2, viewBtn, a, gitBtn, description } = styles;


export default function Project() {
  return (
    <div>
      <Col style={column} md="4">
        <div className="project">
          <div className="overlay">
            <div>
              <h2 style={h2}>Project Name</h2>
              <Button style={viewBtn}>
                <a
                  style={a}
                  target="_blank"
                  rel="noreferrer noopener"
                  href="http://www.msn.com"
                >
                  View Project
                </a>
              </Button>
            </div>
          </div>
          <img style={image} src="http://lorempixel.com/305/304" alt="placeholder" />
        </div>
        <div style={description}>
          <p>
            Dovetail is a free, open source member management app for
            coworking spaces I built with Vince Hodges. Over 1,070 coworking
            spaces worldwide have created accounts.
            Built with: React, SASS, etc.
          </p>
          <Button style={gitBtn} size="small">
            <a
              style={a}
              target="_blank"
              rel="noreferrer noopener"
              href="http://www.msn.com"
            >
              <i className="fa fa-github" />
            </a>
          </Button>
        </div>
      </Col>
    </div>
  );
}
