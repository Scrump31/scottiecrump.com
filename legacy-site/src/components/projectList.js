import React from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Project from './project';
import MyProjects from '../myProjects';
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
  const projectData = MyProjects.map(project =>
    (<Project
      key={project.name}
      name={project.name}
      image={project.image}
      description={project.description}
      link={project.link}
      code={project.code}
    />));
  return (
    <div>
      <Container className="project-list">
        <Row style={row} />
        {projectData}
      </Container>
    </div>
  );
}
