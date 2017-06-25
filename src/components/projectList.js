import React from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Project from './project';
import '../sass/projectList.scss';

const styles = {
  row: {
    marginTop: '15px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
};

const { row } = styles;

export default function ProjectList() {
  return (
    <div>
      <Container className="project-list">
        <Row style={row}>
          <Project />
          <Project />
          <Project />
          <Project />
          <Project />
          <Project />
        </Row>
      </Container>
    </div>
  );
}
