import React, { useState } from 'react';
import { Table, Dropdown, Button, Pagination, Modal, Form } from 'react-bootstrap';

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, assignedTo: 'User 1', status: 'Play', dueDate: '12/10/2024', priority: 'Low', comments: 'This task is good' },
    { id: 2, assignedTo: 'User 2', status: 'Art', dueDate: '14/09/2024', priority: 'High', comments: 'This task is pending' },
    { id: 3, assignedTo: 'User 3', status: 'Get', dueDate: '18/08/2024', priority: 'Low', comments: 'This task is pending' },
    { id: 4, assignedTo: 'User 4', status: 'BBB', dueDate: '12/06/2024', priority: 'Normal', comments: 'This task is good' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Delete confirmation modal state
  const [taskToDelete, setTaskToDelete] = useState(null); // Store the task ID to be deleted
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({ assignedTo: '', status: '', dueDate: '', priority: '', comments: '' });

  // Handle closing the modal
  const handleClose = () => {
    setEditingTask(null);
    setShowModal(false);
  };

  // Handle opening the add/edit modal
  const handleShow = (task = null) => {
    if (task) {
      setEditingTask(task);
      setNewTask(task);
    } else {
      setNewTask({ assignedTo: '', status: '', dueDate: '', priority: '', comments: '' });
    }
    setShowModal(true);
  };

  // Handle adding new tasks
  const handleNewTaskSubmit = () => {
    if (editingTask) {
      setTasks(tasks.map(task => (task.id === editingTask.id ? newTask : task)));
    } else {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    }
    handleClose();
  };

  // Open delete confirmation modal
  const handleDeleteConfirm = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  };

  // Handle task deletion
  const handleDelete = () => {
    setTasks(tasks.filter(task => task.id !== taskToDelete));
    setShowDeleteModal(false); // Close modal after deletion
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <Button variant="primary" onClick={() => handleShow()}>New Task</Button>
        <Button variant="secondary" onClick={() => window.location.reload()}>Refresh</Button>
      </div>

      <input type="text" placeholder="Search" className="form-control mb-3" />

      <Table bordered>
        <thead>
          <tr>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.comments}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Actions
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleShow(task)}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDeleteConfirm(task.id)}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>

      {/* Modal for Add/Edit Task */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingTask ? 'Edit Task' : 'New Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Assigned To</Form.Label>
              <Form.Control
                type="text"
                value={newTask.assignedTo}
                onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option>Low</option>
                <option>Normal</option>
                <option>High</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                value={newTask.comments}
                onChange={(e) => setNewTask({ ...newTask, comments: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleNewTaskSubmit}>
            {editingTask ? 'Update Task' : 'Add Task'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Delete Confirmation */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this task?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>No</Button>
          <Button variant="danger" onClick={handleDelete}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;
