import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import lambdaCall from "../helper/LambdaCall";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { Container, Row, Col } from "react-bootstrap";
import MultiSelectWithSearch from "./MultiSelectWithSearch";
import CombinedReportTable from "./CombinedReportTable";
import SegregatedReportTable from "./SegregatedReportTable";

function Report() {
  const [formData, setFormData] = useState(null);
  const [eventTitles, setEventTitles] = useState([]);
  const [ingredientCategories, setIngredientCategories] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [reportType, setReportType] = useState("combined");

  const getEventData = async (data) => {
    let resultData = data;
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

  const handleFormChange = (id, value) => {
    if (value) {
      setFormData({ ...formData, [id]: value });
    } else {
      var formDataCopy = { ...formData };
      delete formDataCopy[id];
      setFormData(formDataCopy);
    }
  };

  const handleDateChange = async (fromDate, toDate) => {
    if (fromDate && toDate) {
      var response = await lambdaCall({
        service: "eventFilter",
        from_date: fromDate,
        to_date: toDate,
        date_type: "date_of_function",
      });
      getEventData(response.data);
    }
  };
  const clearForm = async () => {
    setFormData([]);
    setEventTitles([]);
    setIngredientCategories([]);
    var response = await lambdaCall({
      service: "eventFilter",
    });
    let resultData = response.data;
    getEventData(resultData);
    setReportData([]);
    document.getElementById("from_date").value = "";
    document.getElementById("to_date").value = "";
  };
  useEffect(() => {
    console.log("clearing report data");
    setReportData([]);
  }, [reportType]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.from_date) {
      alert("Please enter a valid start date");
      return;
    }
    if (!formData.to_date) {
      alert("Please enter a valid end date");
      return;
    }
    if (!("event_title" in formData) || formData.event_title?.length === 0) {
      alert("Please enter a valid event name");
      return;
    }
    var body = {};
    if (reportType === "combined") {
      if (
        !("ingredient_categories" in formData) ||
        formData.ingredient_categories?.length === 0
      ) {
        alert("Please enter valid ingredients");
        return;
      }
      body = { ...formData };
      body["service"] = "combined_report_filter";
    } else {
      body = {
        from_date: formData.from_date,
        to_date: formData.to_date,
        event_title: formData.event_title,
        service: "segregated_report_filter",
      };
    }
    var response = await lambdaCall(body);
    let resultData = response.data;
    console.log(resultData);
    setReportData(resultData);
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
                  var toDate =
                    formData && Object.keys(formData).includes("to_date")
                      ? formData["to_date"]
                        ? formData["to_date"]
                        : ""
                      : "";
                  handleDateChange(e.target.value, toDate);
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
                  var fromDate =
                    formData && Object.keys(formData).includes("from_date")
                      ? formData["from_date"]
                        ? formData["from_date"]
                        : ""
                      : "";
                  handleDateChange(fromDate, e.target.value);
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
            <Form.Group controlId="report_type">
              <Form.Label>Report Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setReportType(e.target.value);
                  setReportData([]);
                }}
              >
                <option value="combined">Combined Report</option>
                <option value="segregated">Segregated Report</option>
              </Form.Select>
            </Form.Group>
          </Row>
          {reportType === "combined" && (
            <Row className="mb-3">
              <MultiSelectWithSearch
                options={ingredientCategories || []}
                leftLabel={"Ingredient Categories"}
                id="ingredient_categories"
                rightLabel={"Selected Ingredient Categories"}
                onSelectionChange={(id, selectedValues) => {
                  handleFormChange(id, selectedValues);
                }}
              />
            </Row>
          )}
          <Stack gap={2} direction="horizontal" className="col-md-4 mx-auto">
            <Button variant="primary" type="submit">
              Fetch
            </Button>
            <Button variant="primary" onClick={() => clearForm()}>
              Clear
            </Button>
          </Stack>
        </Form>
        {reportData && reportData.length > 0 && reportType === "combined" && (
          <CombinedReportTable data={reportData} />
        )}
        {reportData && reportData.length > 0 && reportType === "segregated" && (
          <SegregatedReportTable data={reportData} />
        )}
      </Container>
    </div>
  );
}

export default Report;
