import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import React, { useState, useEffect } from "react";
import lambdaCall from "../helper/LambdaCall";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function UpdateEventIngredientsForm(props) {
  const [ingredientsObj, setIngredientsObj] = useState([]);
  const [allIngredientCategoriesCache, setAllIngredientCategoriesCache] =
    useState([]);
  const [allIngredientCategories, setAllIngredientCategories] = useState([]);

  const [filteredAllIngredientCategories, setFilteredAllIngredientCategories] =
    useState([]);
  const [selectedIngredientCategories, setSelectedIngredientCategories] =
    useState([]);
  const [
    filteredSelectedIngredientCategories,
    setFilteredSelectedIngredientCategories,
  ] = useState([]);

  const [allIngredientItems, setAllIngredientItems] = useState([]);
  const [filteredAllIngredientItems, setFilteredAllIngredientItems] = useState(
    []
  );
  const [selectedIngredientItems, setSelectedIngredientItems] = useState([]);
  const [filteredSelectedIngredientItems, setFilteredSelectedIngredientItems] =
    useState([]);
  const [selectedItemsBoxOne, setSelectedItemsBoxOne] = useState([]);
  const [selectedItemsBoxTwo, setSelectedItemsBoxTwo] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  const [selectedItemsBoxThree, setSelectedItemsBoxThree] = useState([]);
  const [selectedItemsBoxFour, setSelectedItemsBoxFour] = useState([]);
  useEffect(() => {
    async function fetchIngredients() {
      var ingredientResponse = await lambdaCall({
        service: "selectEventColumn",
        columns: ["ingredient"],
        id: props.eventId,
      });
      var ingredientObjResponse = await lambdaCall({
        service: "selectAllIngeridient",
      });
      var ingredientCategoryResponse = await lambdaCall({
        service: "get_unique_ingredient_categories",
      });
      let uniqueCategories = ingredientCategoryResponse.data.map(
        (item) => item.category
      );
      setAllIngredientCategoriesCache(uniqueCategories.sort());
      setIngredientsObj(ingredientObjResponse.data);
      let eventIngredientData = ingredientResponse.data[0]["ingredient"];
      if (eventIngredientData) {
        setSelectedIngredientItems(eventIngredientData);
        uniqueCategories = uniqueCategories.filter((item) =>
          eventIngredientData.some((i) => i.category !== item)
        );
        let selectedCategories = eventIngredientData.map((a) => a.category);
        selectedCategories = [...new Set(selectedCategories)];
        setSelectedIngredientCategories(selectedCategories.sort());
        setSelectedIngredientItems(
          eventIngredientData.sort((a, b) => a.item.localeCompare(b.item))
        );
        setAllIngredientCategories(uniqueCategories.sort());
      } else {
        setAllIngredientCategories(uniqueCategories.sort());
      }
    }
    fetchIngredients();
  }, [props.eventId]);
  useEffect(() => {
    setFilteredAllIngredientCategories(allIngredientCategories);
  }, [allIngredientCategories]);
  useEffect(() => {
    setFilteredSelectedIngredientCategories(selectedIngredientCategories);
  }, [selectedIngredientCategories]);
  useEffect(() => {
    setFilteredAllIngredientItems(allIngredientItems);
  }, [allIngredientItems]);
  useEffect(() => {
    setFilteredSelectedIngredientItems(selectedIngredientItems);
  }, [selectedIngredientItems]);

  const allIngredientCategoriesFilter = (e) => {
    var value = e.target.value.toLowerCase();
    var allItems = allIngredientCategories;
    var filteredItems = [];

    if (value === "") {
      setFilteredAllIngredientCategories(allIngredientCategories);
    } else {
      filteredItems = allItems.filter((x) => x.toLowerCase().includes(value));
      setFilteredAllIngredientCategories(filteredItems);
    }
  };

  const selectedIngredientCategoriesFilter = (e) => {
    var value = e.target.value.toLowerCase();
    var allItems = selectedIngredientCategories;
    var filteredItems = [];
    if (value === "") {
      setFilteredSelectedIngredientCategories(selectedIngredientCategories);
    } else {
      filteredItems = allItems.filter((x) => x.toLowerCase().includes(value));
      setFilteredSelectedIngredientCategories(filteredItems);
    }
  };
  const allIngredientItemsFilter = (e) => {
    var value = e.target.value.toLowerCase();
    var allItems = allIngredientItems;
    var filteredItems = [];
    if (value === "") {
      setFilteredAllIngredientItems(allIngredientItems);
    } else {
      filteredItems = allItems.filter((x) =>
        x.item.toLowerCase().includes(value)
      );
      setFilteredAllIngredientItems(filteredItems);
    }
  };
  const selectedIngredientItemsFilter = (e) => {
    var value = e.target.value.toLowerCase();
    var allItems = selectedIngredientItems;
    var filteredItems = [];
    if (value === "") {
      setFilteredSelectedIngredientItems(selectedIngredientItems);
    } else {
      filteredItems = allItems.filter((x) =>
        x.item.toLowerCase().includes(value)
      );
      setFilteredSelectedIngredientItems(filteredItems);
    }
  };
  const handleRightOne = () => {
    let selectedCategories = [...selectedIngredientCategories];
    for (const option of selectedItemsBoxOne) {
      selectedCategories.push(option);
    }
    let categories = allIngredientCategoriesCache;
    categories = categories.filter((x) => !selectedCategories.includes(x));
    setAllIngredientCategories(categories.sort());
    setSelectedIngredientCategories(selectedCategories.sort());
    setSelectedItemsBoxOne([]);
    document.getElementById("selected_ingredients_categories").selectedIndex =
      -1;
    document.getElementById("ingredient_categories").selectedIndex = -1;
  };
  const handleMultiSelectOne = (e) => {
    document.getElementById("selected_ingredients_categories").selectedIndex =
      -1;
    document.getElementById("all_ingredient_items").selectedIndex = -1;
    document.getElementById("selected_ingredient_items").selectedIndex = -1;
    let options = e.target.options;
    let selectedItemsBoxOne = [];
    for (const option of options) {
      if (option.selected) {
        selectedItemsBoxOne.push(option.value);
      }
    }
    setSelectedItemsBoxOne(selectedItemsBoxOne);
  };
  const handleLeftOne = () => {
    setAllIngredientItems([]);
    let selectedCategories = [...selectedIngredientCategories];
    let selectedItems = [...selectedIngredientItems];
    for (const option of selectedItemsBoxTwo) {
      selectedCategories.splice(selectedCategories.indexOf(option), 1);
    }
    let categories = allIngredientCategoriesCache;
    categories = categories.filter((x) => !selectedCategories.includes(x));
    categories = categories.filter((x) => !selectedCategories.includes(x));
    selectedItems = selectedItems.filter((x) =>
      selectedItemsBoxTwo.some((y) => y !== x.category)
    );
    selectedItems.sort((a, b) => a.item.localeCompare(b.item));
    // setSelectedMenuTableData(formatResult(selectedItems));
    setSelectedIngredientItems(selectedItems);
    setAllIngredientCategories(categories.sort());
    setSelectedIngredientCategories(selectedCategories.sort());
    setSelectedItemsBoxTwo([]);
    document.getElementById("selected_ingredients_categories").selectedIndex =
      -1;
    document.getElementById("ingredient_categories").selectedIndex = -1;
  };
  const handleMultiSelectTwo = (e) => {
    document.getElementById("ingredient_categories").selectedIndex = -1;
    document.getElementById("all_ingredient_items").selectedIndex = -1;
    document.getElementById("selected_ingredient_items").selectedIndex = -1;
    let options = e.target.options;
    let selectedOption = e.target.value;
    let selectedItemsBoxTwo = [];
    for (const option of options) {
      if (option.selected) {
        selectedItemsBoxTwo.push(option.value);
      }
    }
    let allIngredients = [...ingredientsObj];
    allIngredients = allIngredients.filter(
      (item) =>
        item.category === selectedOption &&
        !selectedIngredientItems.some((i) => i.id === item.id)
    );
    setAllIngredientItems(allIngredients);
    setSelectedItemsBoxTwo(selectedItemsBoxTwo);
    setSelectedOption(selectedOption);
  };
  const handleRightTwo = () => {
    var selectedItems = [...selectedIngredientItems];
    for (const option of selectedItemsBoxThree) {
      option["quantity"] = "";
      selectedItems.push(option);
    }
    let allItems = [...ingredientsObj];
    allItems = allItems.filter(
      (item) =>
        item.category === selectedOption &&
        !selectedItems.some((i) => i.id === item.id)
    );
    allItems.sort((a, b) => a.item.localeCompare(b.item));
    setAllIngredientItems(allItems);
    setSelectedIngredientItems(
      selectedItems.sort((a, b) => a.item.localeCompare(b.item))
    );
    setSelectedItemsBoxThree([]);
    document.getElementById("all_ingredient_items").selectedIndex = -1;
    document.getElementById("selected_ingredient_items").selectedIndex = -1;
  };
  const handleMultiSelectThree = (e) => {
    document.getElementById("ingredient_categories").selectedIndex = -1;
    document.getElementById("selected_ingredient_items").selectedIndex = -1;
    document.getElementById("selected_ingredients_categories").selectedIndex =
      -1;
    let options = e.target.options;
    let selectedItemsBoxThree = [];
    for (const option of options) {
      if (option.selected) {
        selectedItemsBoxThree.push(JSON.parse(option.value));
      }
    }
    setSelectedItemsBoxThree(selectedItemsBoxThree);
  };
  const handleMultiSelectFour = (e) => {
    document.getElementById("ingredient_categories").selectedIndex = -1;
    document.getElementById("selected_ingredients_categories").selectedIndex =
      -1;
    document.getElementById("all_ingredient_items").selectedIndex = -1;
    let options = e.target.options;
    let selectedItemsBoxFour = [];
    for (const option of options) {
      if (option.selected) {
        selectedItemsBoxFour.push(JSON.parse(option.value));
      }
    }
    setSelectedItemsBoxFour(selectedItemsBoxFour);
  };
  const handleLeftTwo = () => {
    var selectedItems = [...selectedIngredientItems];
    selectedItems = selectedItems.filter(
      (item) => !selectedItemsBoxFour.some((i) => i.id === item.id)
    );
    let allItems = [...ingredientsObj];
    allItems = allItems.filter(
      (item) =>
        item.category === selectedOption &&
        !selectedItems.some((i) => i.id === item.id)
    );
    allItems.sort((a, b) => a.item.localeCompare(b.item));
    setAllIngredientItems(allItems);
    setSelectedIngredientItems(
      selectedItems.sort((a, b) => a.item.localeCompare(b.item))
    );

    setSelectedItemsBoxFour([]);
    document.getElementById("all_ingredient_items").selectedIndex = -1;
    document.getElementById("selected_ingredient_items").selectedIndex = -1;
  };
  const handleSubmit = async () => {
    for (const record of selectedIngredientItems) {
      if (record.rate_per_unit === "" || record.quantity === "") {
        alert("Please ensure all items are filled before submitting.");
        return false;
      }
    }
    await lambdaCall({
      service: "update_event",
      newEventData: {
        ingredient: selectedIngredientItems,
      },
      id: props.eventId,
    });
    alert("Updated Ingredients  successfully");
  };
  const handleChange = (e, index, field) => {
    const updatedIngredientItems = {
      ...selectedIngredientItems[index],
      [field]: e.target.value,
    };
    setSelectedIngredientItems([
      ...selectedIngredientItems.slice(0, index),
      updatedIngredientItems,
      ...selectedIngredientItems.slice(index + 1),
    ]);
  };
  return (
    <>
      <Container>
        <Stack gap={2}>
          <div className="col-md-6 mx-auto">
            <h1>View/Update Ingredients</h1>
          </div>
          <Row xs="auto">
            <Col>
              <Form.Control
                type="text"
                placeholder="Search"
                onKeyUp={(e) => allIngredientCategoriesFilter(e)}
              />
              <Form.Select
                aria-label="Default select example"
                multiple
                style={{ height: "300px" }}
                id="ingredient_categories"
                onChange={(e) => {
                  handleMultiSelectOne(e);
                }}
              >
                {filteredAllIngredientCategories &&
                  filteredAllIngredientCategories.length > 0 &&
                  filteredAllIngredientCategories.map((item, itemIndex) => (
                    <option key={itemIndex} value={item}>
                      {item}
                    </option>
                  ))}
              </Form.Select>
            </Col>
            <Col>
              <Row>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-double-right"
                  viewBox="0 0 16 16"
                  onClick={() => handleRightOne()}
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
                  onClick={() => handleLeftOne()}
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
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Search"
                onKeyUp={(e) => selectedIngredientCategoriesFilter(e)}
              />
              <Form.Select
                aria-label="Default select example"
                multiple
                style={{ height: "300px" }}
                id="selected_ingredients_categories"
                onChange={(e) => {
                  handleMultiSelectTwo(e);
                }}
              >
                {filteredSelectedIngredientCategories &&
                  filteredSelectedIngredientCategories.length > 0 &&
                  filteredSelectedIngredientCategories.map(
                    (item, itemIndex) => (
                      <option key={itemIndex} value={item}>
                        {item}
                      </option>
                    )
                  )}
              </Form.Select>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Search"
                onKeyUp={(e) => allIngredientItemsFilter(e)}
              />
              <Form.Select
                aria-label="Default select example"
                multiple
                style={{ height: "300px" }}
                id="all_ingredient_items"
                onChange={(e) => {
                  handleMultiSelectThree(e);
                }}
              >
                {filteredAllIngredientItems &&
                  filteredAllIngredientItems.length > 0 &&
                  filteredAllIngredientItems.map((item, itemIndex) => (
                    <option key={itemIndex} value={JSON.stringify(item)}>
                      {item.item}
                    </option>
                  ))}
              </Form.Select>
            </Col>
            <Col>
              <Row>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-double-right"
                  viewBox="0 0 16 16"
                  onClick={() => handleRightTwo()}
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
                  onClick={() => handleLeftTwo()}
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
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Search"
                onKeyUp={(e) => selectedIngredientItemsFilter(e)}
              />
              <Form.Select
                aria-label="Default select example"
                multiple
                style={{ height: "300px" }}
                id="selected_ingredient_items"
                onChange={(e) => {
                  handleMultiSelectFour(e);
                }}
              >
                {filteredSelectedIngredientItems &&
                  filteredSelectedIngredientItems.length > 0 &&
                  filteredSelectedIngredientItems.map((item, itemIndex) => (
                    <option key={itemIndex} value={JSON.stringify(item)}>
                      {item.item}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
          {selectedIngredientItems && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Serial No</th>
                  <th>Category</th>
                  <th>Item</th>
                  <th>Unit</th>
                  <th>Rate Per Unit</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {selectedIngredientItems.map((record, recordIndex) => (
                  <tr key={recordIndex}>
                    <td>{recordIndex + 1}</td>
                    <td>{record.category}</td>
                    <td>{record.item}</td>
                    <td>{record.unit}</td>
                    <td>
                      <input
                        type="text"
                        value={record.rate_per_unit}
                        onChange={(e) =>
                          handleChange(e, recordIndex, "rate_per_unit")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={record.quantity}
                        onChange={(e) =>
                          handleChange(e, recordIndex, "quantity")
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <Button
            className="col-md-2 mx-auto"
            as="input"
            type="submit"
            value="submit"
            onClick={handleSubmit}
          />{" "}
        </Stack>
      </Container>
    </>
  );
}

export default UpdateEventIngredientsForm;
