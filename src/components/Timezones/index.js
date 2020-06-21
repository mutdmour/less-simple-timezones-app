import React, { useState, useRef } from "react";
import { Alert, Button, Container, Row, Col } from "react-bootstrap";

const WORLD_TIME_API_ENDPOINT = "https://worldtimeapi.org/api";
const AREAS = ['America', 'Africa', 'Antarctica', 'Asia', 'Atlantic', 'Australia', 'Europe', 'Indian', 'Pacific'];
const DEFAULT_AREA = 'Europe';

const Timezones = () => {
  const [area, setArea] = useState(DEFAULT_AREA);
  const [timezones, setTimezones] = useState([]);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('');
  const clicked = useRef(false);

  const getTimezones = () => {
    clicked.current = true;
    fetch(`${WORLD_TIME_API_ENDPOINT}/timezone/${area}`)
      .then(response => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }

        setTimezones(data);
        setError(false);
        setFilter('');
      })
      .catch(() => {
        setTimezones([]);
        setError(true);
        setFilter('');
      });
  };

  const renderContent = () => {
    if (error) {
      return <Alert variant="danger"> Something went wrong </Alert>;
    }

    if (clicked.current && timezones.length === 0) {
      return <Alert variant="warning"> No results were returned </Alert>;
    }

    let listItems = timezones;;
    if (filter) {
      listItems = listItems.filter((item) => item.toLowerCase().match(filter));
    }
    listItems = listItems.map((item) => <li key={item}>{item}</li>);

    return <ul>{listItems}</ul>;
  };

  const updateArea = (e) => {
    setArea(e.target.value);
  };
  
  const updateFilter = (e) => {
    setFilter(e.target.value);
  }

  const areaOptions = AREAS.map((area) => <option value={area} key={area}>{area}</option>);
  return (
    <Container fluid>
      <Row>
        <Col>
          <select value={area} onChange={updateArea}>
            {areaOptions}
          </select>
          {
            clicked.current && timezones.length > 0 && <input type="text" value={filter} onChange={updateFilter}></input>
          }
        </Col>
      </Row>
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
