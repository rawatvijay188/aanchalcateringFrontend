import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import lambdaCall from "../helper/LambdaCall";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { Container, Row, Col } from "react-bootstrap";
import MultiSelectWithSearch from "./MultiSelectWithSearch";

function EventDetails() {
  const [formData, setFormData] = useState(null);
  // const [eventData, setEventData] = useState([]);
  const [eventTitles, setEventTitles] = useState([]);
  const [ingredientCategories, setIngredientCategories] = useState([]);
  const getEventData = async (data) => {
    let resultData = data;
    // setEventData(resultData);
    let titles = Array.from(
      new Set(resultData.map((event) => event.event_title))
    );
    const items = new Set();
    resultData.forEach((event) => {
      if (event.ingredient) {
        event.ingredient.forEach((ingredient) => {
          if (ingredient.category) {
            items.add(ingredient.category);
          }
        });
      }
    });
    setEventTitles(titles);
    setIngredientCategories(Array.from(items));
  };
  useEffect(() => {
    async function setData() {
      var response = await lambdaCall({
        service: "eventFilter",
      });
      let resultData = response.data;
      getEventData(resultData);
    }
    setData();
  }, []);
  const handleFormChange = (id, value) => {
    if (value) {
      setFormData({ ...formData, [id]: value });
    } else {
      var formDataCopy = { ...formData };
      delete formDataCopy[id];
      setFormData(formDataCopy);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="from_date">
              <Form.Label>From Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => {
                  handleFormChange(e.target.id, e.target.value);
                }}
                placeholder="From Date"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="to_date">
              <Form.Label>To Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => {
                  handleFormChange(e.target.id, e.target.value);
                }}
                placeholder="To Date"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <MultiSelectWithSearch
              options={eventTitles || []}
              leftLabel={"Event Title"}
              id="event_title"
              rightLabel={"Selected Event Title"}
              onSelectionChange={(id, selectedValues) => {
                handleFormChange(id, selectedValues);
              }}
            />
          </Row>
          <Row className="mb-3">
            <MultiSelectWithSearch
              options={ingredientCategories || []}
              leftLabel={"Ingredient Categories"}
              id="ingredient_categories"
              rightLabel={"Selected Selected Ingredient Categories"}
              onSelectionChange={(id, selectedValues) => {
                handleFormChange(id, selectedValues);
              }}
            />
          </Row>

          <Stack gap={2} direction="horizontal" className="col-md-2 mx-auto">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="primary">Clear</Button>
          </Stack>
        </Form>
      </Container>
    </div>
  );
}

export default EventDetails;
