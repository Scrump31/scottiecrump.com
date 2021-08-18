import React from 'react';
import Col from 'muicss/lib/react/col';
import Button from 'muicss/lib/react/button';
import '../sass/project.scss';
import { white, logoBG, orange } from './componentStyles/colors';

const styles = {
  column: {
    marginBottom: '3%',
  },
  imageStyle: {
    width: '100%',
  },
  p: {
    color: white,
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
    top: '90%',
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
  descriptionStyle: {
    color: white,
    textAlign: 'center',
  },
};
const { column, imageStyle, p, viewBtn, a, gitBtn, descriptionStyle } = styles;

export default function Project(props) {
  const { name, description, image, link, code } = props;
  return (
    <div>
      <Col style={column} md="4">
        <div className="project">
          <div className="overlay">
            <div>
              <p className="project-paragraph" style={p}>{description}</p>
              <Button style={viewBtn}>
                <a
                  style={a}
                  target="_blank"
                  rel="noreferrer noopener"
                  href={link}
                >
                  View Project
                </a>
              </Button>
            </div>
          </div>
          <img style={imageStyle} src={image} alt={name} />
        </div>
        <div style={descriptionStyle}>
          <h3>{name}</h3>
          <Button style={gitBtn} size="small">
            <a
              style={a}
              target="_blank"
              rel="noreferrer noopener"
              href={code}
            >
              <i className="fa fa-github" />
            </a>
          </Button>
        </div>
      </Col>
    </div>
  );
}
