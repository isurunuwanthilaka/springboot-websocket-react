import React, { useState } from "react";
import SockJsClient from "react-stomp";

import { Card, Form, Button, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header/Header";

const SOCKET_URL = "http://localhost:8080/notification";
const GENERAL_TOPIC = "/topic/general";

const App = () => {
  let generalClientRef;
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");

  const onConnected = () => {
    console.log("Connected.");
  };
  const onDisconnected = () => {
    console.log("Disconnected.");
  };

  const onMessageReceived = (msg) => {
    setMessage(msg.message);
  };

  const sendMessage = (msg) => {
    generalClientRef.sendMessage(
      GENERAL_TOPIC,
      JSON.stringify({ message: msg })
    );
  };
  const textChangeHandler = (event) => {
    setText(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
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
        topics={[GENERAL_TOPIC]}
        onConnect={onConnected}
        onDisconnect={onDisconnected}
        onMessage={(msg) => onMessageReceived(msg)}
        debug={false}
        ref={(client) => {
          generalClientRef = client;
        }}
      />
      <Header />
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
              <Form.Label column sm="3" className="cbg">
                General Message
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  type="text"
                  placeholder="type a message to send to the general chanel"
                  onChange={textChangeHandler}
                  style={{
                    borderColor: "rgb(0,0,0)",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderRadius: "4px",
                  }}
                />
              </Col>
              <Button
                sm="2"
                className="cbg"
                type="submit"
                onClick={submitHandler}
              >
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
                backgroundColor: "#008b8b",
                margin: "0rem 10rem .5em 10rem",
                padding: "4px",
              }}
              className="cbg"
            >
              Messages on General Channel
            </Card.Title>
            <Card.Text
              style={{
                margin: "0rem 10rem 0rem 10rem",
                padding: "4px",
              }}
              className="cbg"
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
