import React, { useState, useRef } from "react";
import { Alert, Button, Container, Row, Col } from "react-bootstrap";

const WORLD_TIME_API_ENDPOINT = "https://worldtimeapi.org/api";

const Timezones = () => {
  const [timezones, setTimezones] = useState([]);
  const [error, setError] = useState(false);
  const clicked = useRef(false);

  const getTimezones = () => {
    clicked.current = true;
    fetch(`${WORLD_TIME_API_ENDPOINT}/timezone/Europe`)
      .then(response => response.json())
      .then((data) => {
        setTimezones(data);
        setError(false);
      })
      .catch(() => {
        setTimezones([]);
        setError(true);
      });
  };

  const renderContent = () => {
    if (error) {
      return <Alert variant="danger"> Something went wrong </Alert>;
    }

    if (clicked.current && timezones.length === 0) {
      return <Alert variant="warning"> No results were returned </Alert>;
    }

    const listItems = timezones.map((item) => <li key={item}>{item}</li>);
    return <ul>{listItems}</ul>;
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Button variant="primary" onClick={getTimezones}>Get timezones</Button>
        </Col>
      </Row>
      <Row>
        <Col className="content" md="auto" sm="auto" lg="auto" xlg="auto" xs="auto">
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
}

export default Timezones;
