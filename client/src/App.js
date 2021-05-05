import React, { useState } from "react";
import SockJsClient from "react-stomp";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";

const SOCKET_URL = "http://localhost:8080/socket";
const TOPIC = "/topic/message";

const App = () => {
  let clientRef;
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");

  const onConnected = () => {
    console.log("Connected.");
  };

  const onMessageReceived = (msg) => {
    setMessage(msg.message);
  };

  const sendMessage = (msg) => {
    clientRef.sendMessage(TOPIC, JSON.stringify({ "message": msg }));
  };
  const textChangeHandler = (event) => {
    setText(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(text);
    sendMessage(text);
  };

  return (
    <Card
      border="dark"
      style={{
        margin: "2rem auto",
        width: "60rem",
      }}
      className="bg-info"
    >
      <SockJsClient
        url={SOCKET_URL}
        topics={[TOPIC]}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected.")}
        onMessage={(msg) => onMessageReceived(msg)}
        debug={false}
        ref={(client) => {
          clientRef = client;
        }}
      />
      <Header/>
      <Row>
        <Card
          border="dark"
          style={{
            margin: "1rem auto",
            width: "50rem",
            padding: "2rem",
          }}
          className="bg-info text-white"
        >
          <Form>
            <Form.Group as={Row} controlId="formPlaintextMessage">
              <Form.Label column sm="2"
                style={{
                backgroundColor:"#008b8b",
                borderColor: "rgb(0,0,0)",
                borderStyle: "solid",
                borderWidth: "1px",
                  borderRadius: "4px",
              }}
              >
                Message
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  placeholder="type a message to send to the topic"
                  onChange={textChangeHandler}
                  style={{
                borderColor: "rgb(0,0,0)",
                borderStyle: "solid",
                borderWidth: "1px",
                borderRadius: "4px",
              }}
                />
              </Col>
              <Button sm="2"
                style={{
                borderColor: "rgb(0,0,0)",
                borderStyle: "solid",
                backgroundColor:"#008b8b",
                }}
                type="submit" onClick={submitHandler}>
              Send
            </Button>
            </Form.Group>
          </Form>
        </Card>
      </Row>
      <Row>
        <Card
          border="dark"
          style={{
            margin: "1rem auto",
            width: "50rem",
          }}
          className="text-center bg-info text-white"
        >
          <Card.Body>
            <Card.Title
              style={{
                backgroundColor:"#008b8b",
                margin: "0rem 10rem .5em 10rem",
                borderColor: "rgb(0,0,0)",
                borderStyle: "solid",
                borderWidth: "1px",
                borderRadius: "4px",
                padding:"4px",
              }}
            >Messages on **{TOPIC}**</Card.Title>
            <Card.Text
              style={{
                margin: "0rem 10rem 0rem 10rem",
                borderColor: "rgb(0,0,0)",
                borderStyle: "solid",
                borderWidth: "1px",
                borderRadius: "4px",
                backgroundColor: "#008b8b",
                padding:"4px",
              }}
            >
              {message}
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Card>
  );
};

export default App;
