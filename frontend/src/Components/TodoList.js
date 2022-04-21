import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Row, Col } from "react-bootstrap";
import Add from "../Images/add.png";
import Delete from "../Images/delete.png";
import Todo from "../Images/todo.png";

import {
  AddTodoThunk,
  EditTodoThunk,
  DeleteTodoThunk,
  GetTodosThunk,
  GetInfoThunk,
} from "../Redux/todos/actions";

export default function TodoList() {
  const [title, setTitle] = useState("");
  const [editedTitle, setEditedTitle] = useState("");

  const todosFromRedux = useSelector((state) => state.todoStore.todos);
  const nameFromRedux = useSelector((state) => state.todoStore.name);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetTodosThunk());
    dispatch(GetInfoThunk());
  }, []);

  const submitTodo = (e) => {
    e.preventDefault();
    const newTodo = { title };
    title.length > 0 && dispatch(AddTodoThunk(newTodo));
    setTitle("");
  };

  const editTodoTitle = (e, id) => {
    e.preventDefault();
    editedTitle.length > 0 &&
      dispatch(EditTodoThunk({ title: editedTitle, id: id }));
    setEditedTitle("");
  };

  const deleteTodo = (e, i) => {
    dispatch(DeleteTodoThunk(i));
  };

  return (
    <div className="container-fluid">
      <h1>Todo - List</h1>
      <h3>Welcome back {nameFromRedux}</h3>

      <Form onSubmit={submitTodo}>
        <Row className="justify-content-center mb-5">
          <Col lg={6} md={8} xs={10}>
            <Form.Control
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              name="text"
              placeholder="Enter Your Todo"
            />
          </Col>

          <Col xs={1}>
            <Button color="primary" type="submit">
              <img
                src={Add}
                alt="+"
                style={{ height: "50px", width: "50px" }}
              />
            </Button>
          </Col>
        </Row>
      </Form>

      <div>
        {todosFromRedux && todosFromRedux.length >= 1
          ? todosFromRedux.map((todo) => (
              <div key={todo.id}>
                <Row className="mb-3 justify-content-center">
                  <Col lg={6} md={8} xs={10}>
                    <Form.Control
                      id={todo.id}
                      type="text"
                      defaultValue={todo.title}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      onBlur={(e) => {
                        editTodoTitle(e, todo.id);
                      }}
                    />
                  </Col>
                  <Col xs={1}>
                    <Button
                      color="danger"
                      onClick={(e) => deleteTodo(e, todo.id)}
                    >
                      <img
                        src={Delete}
                        alt="-"
                        style={{ height: "50px", width: "50px" }}
                      />
                    </Button>
                  </Col>
                </Row>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
