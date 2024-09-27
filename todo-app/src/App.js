import React from 'react';
import TaskList from './component/TaskList';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container className="mt-5">
      <h1>Tasks</h1>
      <TaskList />
    </Container>
  );
}

export default App;
