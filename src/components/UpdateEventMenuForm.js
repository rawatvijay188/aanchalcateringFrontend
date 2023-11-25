import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import React, { useState, useEffect } from "react";
import lambdaCall from "../helper/LambdaCall";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function UpdateEventMenuForm(props) {
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [allMenuCategory, setAllMenuCategory] = useState([]);

  const [menuCategories, setMenuCategories] = useState([]);
  const [filteredMenuCategories, setFilteredMenuCategories] = useState([]);

  const [selectedMenuCategories, setSelectedMenuCategories] = useState([]);
  const [filteredSelectedMenuCategories, setfilteredSelectedMenuCategories] = useState([]);

  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);

  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  const [filteredSelectedMenuItems, setFilteredSelectedMenuItems] = useState([]);

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
        menuCategories = menuCategories.filter((item) =>
          eventMenuData.some((i) => i.category !== item)
        );
        let selectedMenu = eventMenuData.map((a) => a.category);
        selectedMenu = [...new Set(selectedMenu)];
        setSelectedMenuCategories(selectedMenu.sort());
        setSelectedMenuItems(
          eventMenuData.sort((a, b) => a.item.localeCompare(b.item))
        );
        setMenuCategories(menuCategories.sort());
      } else {
        // let selectedCategories = [...selectedMenuCategories];
        // menuCategories = menuCategories.filter(
        //   (x) => !selectedCategories.includes(x)
        // );
        setMenuCategories(menuCategories.sort());
      }
    }
    fetchMenuCategories();
  }, [props.eventId]);
  useEffect(() => {
    setFilteredMenuCategories(menuCategories);
  }, [menuCategories])
  useEffect(() => {
    setfilteredSelectedMenuCategories(selectedMenuCategories);
  }, [selectedMenuCategories])
  useEffect(() => {
    setFilteredMenuItems(menuItems);
  }, [menuItems])
  useEffect(() => {
    setFilteredSelectedMenuItems(selectedMenuItems);
  }, [selectedMenuItems])

  const menuCategoriesFilter = (e) => {
    var value = e.target.value.toLowerCase()

    var allItems = menuCategories

    var filteredItems = [];
    if (value === "") {
      setFilteredMenuCategories(menuCategories);
    }
    else {
      filteredItems = allItems.filter(x => x.toLowerCase().includes(value));
      setFilteredMenuCategories(filteredItems);
    }
  }
  const selectedMenuCategoriesFilter = (e) => {
    var value = e.target.value.toLowerCase()
    var filteredItems = [];
    if (value === "") {
      setfilteredSelectedMenuCategories(selectedMenuCategories);
    }
    else {
      filteredItems = selectedMenuCategories.filter(x => x.toLowerCase().includes(value));
      setfilteredSelectedMenuCategories(filteredItems);
    }
  }
  const menuItemsFilter = (e) => {
    var value = e.target.value.toLowerCase()
    var filteredItems = [];
    if (value === "") {
      setFilteredMenuItems(menuItems);
    }
    else {
      filteredItems = menuItems.filter(x => x.item.toLowerCase().includes(value));
      setFilteredMenuItems(filteredItems);
    }
  }
  const selectedMenuItemsFilter = (e) => {
    var value = e.target.value.toLowerCase()
    var filteredItems = [];
    if (value === "") {
      setFilteredSelectedMenuItems(selectedMenuItems);
    }
    else {
      filteredItems = selectedMenuItems.filter(x => x.item.toLowerCase().includes(value));
      setFilteredSelectedMenuItems(filteredItems);
    }
  }
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
    let selectedItems = [...selectedMenuItems];
    for (const option of selectedItemsBoxTwo) {
      selectedCategories.splice(selectedCategories.indexOf(option), 1);
    }
    let categories = allMenuCategory;
    categories = categories.filter((x) => !selectedCategories.includes(x));
    selectedItems = selectedItems.filter((x) =>
      selectedItemsBoxTwo.some((y) => y !== x.category)
    );
    selectedItems.sort((a, b) => a.item.localeCompare(b.item));
    // setSelectedMenuTableData(formatResult(selectedItems));
    setSelectedMenuItems(selectedItems);
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
    allItems = allItems.filter(
      (item) =>
        item.category === selectedOption &&
        !selectedMenuItems.some((i) => i.id === item.id)
    );
    allItems.sort((a, b) => a.item.localeCompare(b.item));
    setMenuItems(allItems);
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
    allItems.sort((a, b) => a.item.localeCompare(b.item));
    setMenuItems(allItems);
    setSelectedMenuItems(
      selectedItems.sort((a, b) => a.item.localeCompare(b.item))
    );
    // setSelectedMenuTableData(formatResult(selectedItems));
    setSelectedItemsBoxThree([]);
    document.getElementById("all_menu_items").selectedIndex = -1;
    document.getElementById("selected_menu_items").selectedIndex = -1;
  };
  const handleItemLeft = () => {
    var selectedItems = [...selectedMenuItems];
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
    // setSelectedMenuTableData(formatResult(selectedItems));
    setSelectedItemsBoxFour([]);
    document.getElementById("all_menu_items").selectedIndex = -1;
    document.getElementById("selected_menu_items").selectedIndex = -1;
  };

  const handleSubmit = async () => {
    await lambdaCall({
      service: "update_event",
      newEventData: {
        menu: selectedMenuItems,
      },
      id: props.eventId,
    });
    alert("Updated Menu Items successfully");
  };
  return (
    <>
      <Container>
        <Stack gap={2}>
          <div className="col-md-4 mx-auto"><h1 >View/Update Menu</h1></div>
          <Row xs="auto">
            <Col>
              <Form.Control type="text" placeholder="Search" onKeyUp={(e) => menuCategoriesFilter(e)} />
              <Form.Select
                aria-label="Default select example"
                multiple
                style={{ height: "300px" }}
                id="menu_categories"
                onChange={(e) => {
                  handleMultiSelectOne(e);
                }}
              >
                {filteredMenuCategories &&
                  filteredMenuCategories.length > 0 &&
                  filteredMenuCategories.map((item, itemIndex) => (
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
                  onClick={() => handleMenuLeft()}
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
              <Form.Control type="text" placeholder="Search" onChange={(e) => selectedMenuCategoriesFilter(e)} />
              <Form.Select
                aria-label="Default select example"
                multiple
                style={{ height: "300px" }}
                id="selected_menu_categories"
                onChange={(e) => {
                  handleMultiSelectTwo(e);
                }}
              >
                {filteredSelectedMenuCategories &&
                  filteredSelectedMenuCategories.length > 0 &&
                  filteredSelectedMenuCategories.map((item, itemIndex) => (
                    <option key={itemIndex} value={item}>
                      {item}
                    </option>
                  ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Control type="text" placeholder="Search" onKeyUp={(e) => menuItemsFilter(e)} />
              <Form.Select
                aria-label="Default select example"
                multiple
                style={{ height: "300px" }}
                id="all_menu_items"
                onChange={(e) => handleMultiSelectThree(e)}
              >
                {filteredMenuItems &&
                  filteredMenuItems.length > 0 &&
                  filteredMenuItems.map((item, itemIndex) => (
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
                  onClick={() => handleItemLeft()}
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
              <Form.Control type="text" placeholder="Search" onKeyUp={(e) => selectedMenuItemsFilter(e)} />
              <Form.Select
                aria-label="Default select example"
                multiple
                style={{ height: "300px" }}
                id="selected_menu_items"
                onChange={(e) => handleMultiSelectFour(e)}
              >
                {filteredSelectedMenuItems &&
                  filteredSelectedMenuItems.length > 0 &&
                  filteredSelectedMenuItems.map((item, itemIndex) => (
                    <option key={itemIndex} value={JSON.stringify(item)}>
                      {item.item}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
          {selectedMenuItems && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Serial No</th>
                  <th>Category</th>
                  <th>Item</th>
                </tr>
              </thead>
              <tbody>
                {selectedMenuItems.map((record, recordIndex) => (
                  <tr key={recordIndex}>
                    <td>{recordIndex + 1}</td>
                    <td>{record.category}</td>
                    <td>{record.item}</td>
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

export default UpdateEventMenuForm;
