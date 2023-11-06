import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState, useEffect } from "react";
import lambdaCall from "../helper/LambdaCall";

function UpdateEventMenuForm(props) {
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [allMenuCategory, setAllMenuCategory] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [selectedMenuCategories, setSelectedMenuCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [selectedItemsBoxOne, setSelectedItemsBoxOne] = useState([]);
  const [selectedItemsBoxTwo, setSelectedItemsBoxTwo] = useState([]);
  const [selectedItemsBoxThree, setSelectedItemsBoxThree] = useState([]);
  const [selectedItemsBoxFour, setSelectedItemsBoxFour] = useState([]);

  useEffect(() => {
    async function fetchMenuCategories() {
      var eventMenuDataResponse = await lambdaCall({
        service: "selectEventColumn",
        columns: ["menu"],
        id: props.eventId,
      });
      var menuDataResponse = await lambdaCall({ service: "getAllMenuItems" });
      menuDataResponse = menuDataResponse.data;
      setAllMenuItems(menuDataResponse);
      let eventMenuData = eventMenuDataResponse.data[0]["menu"];
      let menuCategories = menuDataResponse.map((item) => item.category);
      menuCategories = [...new Set(menuCategories)];
      setAllMenuCategory(menuCategories.sort());
      if (eventMenuData) {
        eventMenuData = Object.keys(eventMenuData);
        let filterMenuCategories = menuCategories.filter(
          (x) => !eventMenuData.includes(x)
        );
        setSelectedMenuCategories(eventMenuData.sort());
        setMenuCategories(filterMenuCategories.sort());
      } else {
        setMenuCategories(menuCategories.sort());
      }
    }
    fetchMenuCategories();
  }, [props.eventId]);

  const formatResult = () => {
    var allMenu = {};
    for (let i = 0; i < selectedMenuItems.length; i++) {
      var category = selectedMenuItems[i]["category"];
      var item = selectedMenuItems[i]["item"];
      if (Object.keys(allMenu).includes(category)) {
        allMenu[category].push(item);
      } else {
        allMenu[category] = [item];
      }
    }

    if (Object.keys(allMenu).length > 0) {
      return JSON.stringify(allMenu);
    }
    return "";
  };
  const handleMenuRight = () => {
    let selectedCategories = [...selectedMenuCategories];
    for (const option of selectedItemsBoxOne) {
      selectedCategories.push(option);
    }
    let categories = allMenuCategory;
    categories = categories.filter((x) => !selectedCategories.includes(x));
    setMenuCategories(categories.sort());
    setSelectedMenuCategories(selectedCategories.sort());
    setSelectedItemsBoxOne([]);
    document.getElementById("selected_menu_categories").selectedIndex = -1;
    document.getElementById("menu_categories").selectedIndex = -1;
  };
  const handleMenuLeft = () => {
    setMenuItems([]);
    let selectedCategories = [...selectedMenuCategories];
    for (const option of selectedItemsBoxTwo) {
      selectedCategories.splice(selectedCategories.indexOf(option), 1);
    }
    let categories = allMenuCategory;
    categories = categories.filter((x) => !selectedCategories.includes(x));
    setMenuCategories(categories.sort());
    setSelectedMenuCategories(selectedCategories.sort());
    setSelectedItemsBoxTwo([]);
    document.getElementById("selected_menu_categories").selectedIndex = -1;
    document.getElementById("menu_categories").selectedIndex = -1;
  };
  const handleMultiSelectOne = (e) => {
    document.getElementById("selected_menu_categories").selectedIndex = -1;
    document.getElementById("all_menu_items").selectedIndex = -1;
    document.getElementById("selected_menu_items").selectedIndex = -1;
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
    document.getElementById("menu_categories").selectedIndex = -1;
    document.getElementById("all_menu_items").selectedIndex = -1;
    document.getElementById("selected_menu_items").selectedIndex = -1;
    let options = e.target.options;
    let selectedItemsBoxTwo = [];
    for (const option of options) {
      if (option.selected) {
        selectedItemsBoxTwo.push(option.value);
      }
    }
    setSelectedItemsBoxTwo(selectedItemsBoxTwo);
    let selectedOption = e.target.value;
    let allItems = [...allMenuItems];
    allItems = allItems.filter((item) => item.category === selectedOption);
    allItems.sort((a, b) => a.item.localeCompare(b.item));
    setMenuItems(allItems.sort());
    setSelectedMenu(selectedOption);
  };
  const handleMultiSelectThree = (e) => {
    document.getElementById("menu_categories").selectedIndex = -1;
    document.getElementById("selected_menu_items").selectedIndex = -1;
    document.getElementById("selected_menu_categories").selectedIndex = -1;
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
    document.getElementById("menu_categories").selectedIndex = -1;
    document.getElementById("all_menu_items").selectedIndex = -1;
    document.getElementById("selected_menu_categories").selectedIndex = -1;
    let options = e.target.options;
    let selectedItemsBoxFour = [];
    for (const option of options) {
      if (option.selected) {
        selectedItemsBoxFour.push(JSON.parse(option.value));
      }
    }
    setSelectedItemsBoxFour(selectedItemsBoxFour);
  };
  const handleItemRight = () => {
    var selectedItems = [...selectedMenuItems];
    for (const option of selectedItemsBoxThree) {
      selectedItems.push(option);
    }
    let allItems = [...allMenuItems];
    allItems = allItems.filter(
      (item) =>
        item.category === selectedMenu &&
        !selectedItems.some((i) => i.id === item.id)
    );
    console.log(allItems);
    allItems.sort((a, b) => a.item.localeCompare(b.item));
    setMenuItems(allItems);
    setSelectedMenuItems(
      selectedItems.sort((a, b) => a.item.localeCompare(b.item))
    );

    document.getElementById("all_menu_items").selectedIndex = -1;
    document.getElementById("selected_menu_items").selectedIndex = -1;
  };
  const handleItemLeft = () => {
    var selectedItems = [...selectedMenuItems];
    console.log(selectedItems);
    selectedItems = selectedItems.filter(
      (item) => !selectedItemsBoxFour.some((i) => i.id === item.id)
    );
    let allItems = [...allMenuItems];
    allItems = allItems.filter(
      (item) =>
        item.category === selectedMenu &&
        !selectedItems.some((i) => i.id === item.id)
    );
    allItems.sort((a, b) => a.item.localeCompare(b.item));
    setMenuItems(allItems);
    setSelectedMenuItems(
      selectedItems.sort((a, b) => a.item.localeCompare(b.item))
    );

    document.getElementById("all_menu_items").selectedIndex = -1;
    document.getElementById("selected_menu_items").selectedIndex = -1;
  };
  return (
    <>
      <Container>
        <Row xs="auto">
          <Col>
            <Form.Control type="text" placeholder="Search" />
            <Form.Select
              aria-label="Default select example"
              multiple
              style={{ height: "300px" }}
              id="menu_categories"
              onChange={(e) => {
                handleMultiSelectOne(e);
              }}
            >
              {menuCategories &&
                menuCategories.length > 0 &&
                menuCategories.map((item, itemIndex) => (
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
                onClick={() => handleMenuRight()}
              >
                <path
                  fill-rule="evenodd"
                  d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                />
                <path
                  fill-rule="evenodd"
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
                onClick={() => handleMenuLeft()}
              >
                <path
                  fill-rule="evenodd"
                  d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
                <path
                  fill-rule="evenodd"
                  d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </Row>
          </Col>
          <Col>
            <Form.Control type="text" placeholder="Search" />
            <Form.Select
              aria-label="Default select example"
              multiple
              style={{ height: "300px" }}
              id="selected_menu_categories"
              onChange={(e) => {
                handleMultiSelectTwo(e);
              }}
            >
              {selectedMenuCategories &&
                selectedMenuCategories.length > 0 &&
                selectedMenuCategories.map((item, itemIndex) => (
                  <option key={itemIndex} value={item}>
                    {item}
                  </option>
                ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Control type="text" placeholder="Search" />
            <Form.Select
              aria-label="Default select example"
              multiple
              style={{ height: "300px" }}
              id="all_menu_items"
              onChange={(e) => handleMultiSelectThree(e)}
            >
              {menuItems &&
                menuItems.length > 0 &&
                menuItems.map((item, itemIndex) => (
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
                onClick={() => handleItemRight()}
              >
                <path
                  fill-rule="evenodd"
                  d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                />
                <path
                  fill-rule="evenodd"
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
                onClick={() => handleItemLeft()}
              >
                <path
                  fill-rule="evenodd"
                  d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
                <path
                  fill-rule="evenodd"
                  d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </Row>
          </Col>
          <Col>
            <Form.Control type="text" placeholder="Search" />
            <Form.Select
              aria-label="Default select example"
              multiple
              style={{ height: "300px" }}
              id="selected_menu_items"
              onChange={(e) => handleMultiSelectFour(e)}
            >
              {selectedMenuItems &&
                selectedMenuItems.length > 0 &&
                selectedMenuItems.map((item, itemIndex) => (
                  <option key={itemIndex} value={JSON.stringify(item)}>
                    {item.item}
                  </option>
                ))}
            </Form.Select>
          </Col>
        </Row>
        {selectedMenuItems && (
          <Form.Control
            as="textarea"
            rows={4}
            onChange={() => console.log("")}
            value={formatResult()}
            readOnly
          />
        )}
      </Container>
    </>
  );
}

export default UpdateEventMenuForm;
