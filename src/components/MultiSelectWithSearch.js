import React, { useState, useEffect } from "react";
import { Form, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";

const MultiSelectWithSearch = ({
  options,
  leftLabel,
  rightLabel,
  onSelectionChange,
  id,
}) => {
  const multiSelectLeftID = leftLabel.replace(/\s/g, "") + "MultiSelectLeft";
  const multiSelectRightID = leftLabel.replace(/\s/g, "") + "MultiSelectRight";
  const [allOptions, setAllOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOptions, setSeltectedOptions] = useState([]);
  const [filteredSelectedOptions, setFilteredSelectedOptions] = useState([]);
  const [selectedItemsBoxOne, setSelectedItemsBoxOne] = useState([]);
  const [selectedItemsBoxTwo, setSelectedItemsBoxTwo] = useState([]);

  useEffect(() => {
    if (options && options.length > 0) {
      setAllOptions(options.slice().sort());
      setFilteredOptions(options.slice().sort());
    } else {
      setAllOptions([]);
      setFilteredOptions([]);
      setSeltectedOptions([]);
      setFilteredSelectedOptions([]);
      setSelectedItemsBoxOne([]);
      setSelectedItemsBoxTwo([]);
    }
  }, [options]);
  useEffect(() => {
    setFilteredSelectedOptions(selectedOptions);
  }, [selectedOptions]);

  const handleRight = () => {
    let selectedItems = [...selectedOptions];
    for (const option of selectedItemsBoxOne) {
      selectedItems.push(option);
    }
    let allItems = allOptions;
    allItems = allItems.filter((x) => !selectedItems.includes(x));
    setAllOptions(allItems.sort());
    setFilteredOptions(allItems.sort());
    setSeltectedOptions(selectedItems.sort());
    onSelectionChange(id, selectedItems);
    setSelectedItemsBoxOne([]);
    document.getElementById(multiSelectLeftID).selectedIndex = -1;
    document.getElementById(multiSelectRightID).selectedIndex = -1;
  };

  const handleLeft = () => {
    let selectedItems = [...selectedOptions];
    let allItems = allOptions;
    for (const option of selectedItemsBoxTwo) {
      selectedItems.splice(selectedItems.indexOf(option), 1);
      allItems.push(option);
    }
    setAllOptions(allItems.sort());
    setFilteredOptions(allItems.sort());
    setSeltectedOptions(selectedItems.sort());
    onSelectionChange(id, selectedItems);
    setSelectedItemsBoxTwo([]);
    document.getElementById(multiSelectLeftID).selectedIndex = -1;
    document.getElementById(multiSelectRightID).selectedIndex = -1;
  };

  const handleMultiSelectOne = (e) => {
    document.getElementById(multiSelectRightID).selectedIndex = -1;
    let options = e.target.options;
    let selectedItemsBoxOne = [];
    for (const option of options) {
      if (option.selected) {
        selectedItemsBoxOne.push(option.value);
      }
    }
    setSelectedItemsBoxOne(selectedItemsBoxOne);
  };

  const handleMultiSelectTwo = (e) => {
    document.getElementById(multiSelectLeftID).selectedIndex = -1;

    let options = e.target.options;
    let selectedItemsBoxTwo = [];
    for (const option of options) {
      if (option.selected) {
        selectedItemsBoxTwo.push(option.value);
      }
    }
    setSelectedItemsBoxTwo(selectedItemsBoxTwo);
  };

  const filterOptions = (e) => {
    var value = e.target.value.toLowerCase();
    var allItems = allOptions;
    var filteredItems = [];
    if (value === "") {
      setFilteredOptions(allOptions.sort());
    } else {
      filteredItems = allItems.filter((x) => x.toLowerCase().includes(value));
      setFilteredOptions(filteredItems.sort());
    }
  };

  const filterSelectedOptions = (e) => {
    var value = e.target.value.toLowerCase();
    var allItems = selectedOptions;
    var filteredItems = [];
    if (value === "") {
      setFilteredSelectedOptions(selectedOptions.sort());
    } else {
      filteredItems = allItems.filter((x) => x.toLowerCase().includes(value));
      setFilteredSelectedOptions(filteredItems.sort());
    }
  };

  return (
    <Container>
      <Stack gap={2} direction="horizontal">
        <div style={{ width: "800px" }}>
          <Form.Group controlId={"form" + multiSelectLeftID}>
            <Stack gap={2}>
              <Form.Label>{leftLabel}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search"
                onKeyUp={(e) => filterOptions(e)}
              />
              <Form.Select
                aria-label="Default select example"
                multiple
                style={{ height: "300px" }}
                id={multiSelectLeftID}
                onChange={(e) => {
                  handleMultiSelectOne(e);
                }}
              >
                {filteredOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Stack>
          </Form.Group>
        </div>
        <div>
          <Row>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-double-right"
              viewBox="0 0 16 16"
              onClick={() => handleRight()}
            >
              <path
                fillRule="evenodd"
                d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
              />
              <path
                fillRule="evenodd"
                d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </Row>
          <Row>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-double-left"
              viewBox="0 0 16 16"
              onClick={() => handleLeft()}
            >
              <path
                fillRule="evenodd"
                d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
              <path
                fillRule="evenodd"
                d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </Row>
        </div>
        <div style={{ width: "800px" }}>
          <Form.Group controlId={"form" + multiSelectRightID}>
            <Stack gap={2}>
              {" "}
              <Form.Label>{rightLabel}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search"
                onKeyUp={(e) => filterSelectedOptions(e)}
              />
              <Form.Select
                aria-label="Default select example"
                multiple
                style={{ height: "300px" }}
                id={multiSelectRightID}
                onChange={(e) => {
                  handleMultiSelectTwo(e);
                }}
              >
                {filteredSelectedOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Stack>
          </Form.Group>
        </div>
      </Stack>
    </Container>
  );
};

export default MultiSelectWithSearch;
