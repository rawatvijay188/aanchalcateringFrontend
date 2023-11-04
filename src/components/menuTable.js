import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import lambdaCall from "../helper/LambdaCall";

const MenuTable = () => {
  const [editableRow, setEditableRow] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [menuData, setMenuData] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [updatedMenuDataList, setUpdateMenuDataList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [oldItem, setOldItem] = useState("");

  useEffect(() => {
    async function fetchMenuCategories() {
      var response = await lambdaCall({
        service: "get_unique_menu_categories",
      });
      setMenuCategories(response.data);
    }
    fetchMenuCategories();
  }, []);
  async function fetchMenuData(selectedCategory) {
    setSelectedCategory(selectedCategory);
    setEditableRow(null);
    var response = await lambdaCall({
      service: "get_menu_items_by_category",
      category: selectedCategory,
    });
    reset();
    setMenuData(response.data);
  }
  const reset = () => {
    setUpdateMenuDataList([]);
    setOldItem("");
  };
  const toggleEdit = (categoryIndex) => {
    setEditableRow({ categoryIndex });
    setOldItem(menuData[categoryIndex]["item"]);
  };
  const handleInputChange = (e, categoryIndex) => {
    const updatedData = [...menuData];
    updatedData[categoryIndex].item = e.target.value;
    setMenuData(updatedData);
  };
  const handleRemoveItem = (categoryIndex) => {
    let updatedDataList = [...updatedMenuDataList];
    let removedData = { ...menuData[categoryIndex] };
    let checkFlag = false;
    let updatedMenuData = [...menuData];
    updatedMenuData.splice(categoryIndex, 1);
    setMenuData(updatedMenuData);
    if (Object.keys(menuData[categoryIndex]).includes("id")) {
      removedData["service"] = "delete_menu_item";
      for (let i = 0; i < updatedDataList.length; i++) {
        if (updatedDataList[i]["id"] === removedData["id"]) {
          updatedDataList[i] = removedData;
          checkFlag = true;
          break;
        }
      }
      if (!checkFlag) {
        updatedDataList.push(removedData);
      }
    } else {
      for (let i = 0; i < updatedDataList.length; i++) {
        if (
          Object.keys(updatedDataList[i]).includes("categoryIndex") &&
          updatedDataList[i]["categoryIndex"] === categoryIndex
        ) {
          updatedDataList.splice(i, 1);
          break;
        }
      }
    }
    for (let i = 0; i < updatedDataList.length; i++) {
      if (
        Object.keys(updatedDataList[i]).includes("categoryIndex") &&
        updatedDataList[i]["categoryIndex"] > categoryIndex
      ) {
        updatedDataList[i]["categoryIndex"] =
          updatedDataList[i]["categoryIndex"] - 1;
      }
    }
    setUpdateMenuDataList(updatedDataList);
  };
  const handleSave = (categoryIndex) => {
    let updatedDataList = [...updatedMenuDataList];
    let updatedData = { ...menuData[categoryIndex] };
    let checkFlag = false;
    if (oldItem === updatedData["item"]) {
      console.log("no changes have been done.");
      setEditableRow(null);
      return;
    }
    let duplicateData = menuData.filter(
      (element, i) =>
        i !== categoryIndex && element["item"] === updatedData["item"]
    );
    if (duplicateData.length > 0) {
      alert("Menu Item already exists.");
      return;
    }

    if (Object.keys(menuData[categoryIndex]).includes("id")) {
      updatedData["service"] = "update_menu_item";
      for (let i = 0; i < updatedDataList.length; i++) {
        if (updatedDataList[i]["id"] === updatedData["id"]) {
          updatedDataList[i] = updatedData;
          checkFlag = true;
          break;
        }
      }
      if (!checkFlag) {
        updatedDataList.push(updatedData);
      }
    } else {
      updatedData["categoryIndex"] = categoryIndex;
      updatedData["service"] = "add_menu_item";

      for (let i = 0; i < updatedDataList.length; i++) {
        if (
          Object.keys(updatedDataList[i]).includes("categoryIndex") &&
          updatedDataList[i]["categoryIndex"] === categoryIndex
        ) {
          updatedDataList[i] = updatedData;
          checkFlag = true;
          break;
        }
      }
      if (!checkFlag) {
        updatedDataList.push(updatedData);
      }
    }
    setUpdateMenuDataList(updatedDataList);
    console.log(updatedMenuDataList);
    setEditableRow(null);
  };
  const handleSortItems = () => {
    const sortedMenuData = [...menuData];
    sortedMenuData.sort((a, b) =>
      sortDirection === "asc"
        ? a.item.localeCompare(b.item)
        : b.item.localeCompare(a.item)
    );
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setMenuData(sortedMenuData);
  };
  const handleAddRow = () => {
    const updatedData = [...menuData];
    updatedData.push({ category: selectedCategory, item: "" });
    setMenuData(updatedData);
  };
  async function updateAll() {
    for (let i = 0; i < updatedMenuDataList.length; i++) {
      await lambdaCall(updatedMenuDataList[i]);
    }
  }
  const handleSubmit = async () => {
    console.log(updatedMenuDataList);
    const isEditing = editableRow !== null;
    const isEmptyItem = menuData.some((category) => category.item === "");
    if (isEditing) {
      alert("Please save or cancel the current edit before submitting.");
      return;
    }
    if (isEmptyItem) {
      alert("Please ensure all items are filled before submitting.");
      return;
    }
    if (updatedMenuDataList.length === 0) {
      alert("No changes have been done. So, there is nothing to update.");
      return;
    }
    await updateAll();
    fetchMenuData(selectedCategory);
    alert("Form submitted successfully!");
  };
  const cancelEdit = (categoryIndex) => {
    const updatedData = [...menuData];
    updatedData[categoryIndex].item = oldItem;
    setMenuData(updatedData);
    setEditableRow(null);
  };
  return (
    <Stack gap={2}>
      <Form.Select
        aria-label="Default select example"
        onChange={(e) => {
          e.preventDefault();

          fetchMenuData(e.target.value);
        }}
      >
        <option>Select Menu Category</option>
        {menuCategories &&
          menuCategories.length > 0 &&
          menuCategories.map((category, categoryIndex) => (
            <option key={categoryIndex} value={category.category}>
              {category.category}
            </option>
          ))}
      </Form.Select>
      {menuData && menuData.length > 0 && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Serial No</th>
                <th>Category</th>
                <th>
                  Item
                  <button
                    onClick={handleSortItems}
                    disabled={
                      updatedMenuDataList.length > 0 || editableRow !== null
                    }
                  >
                    {sortDirection === "asc" ? "↑" : "↓"}
                  </button>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {menuData.map((category, categoryIndex) => (
                <tr key={categoryIndex}>
                  <td>{categoryIndex + 1}</td>
                  {categoryIndex === 0 && (
                    <td
                      rowSpan={menuData.length}
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                      }}
                    >
                      {category.category}
                    </td>
                  )}
                  <td>
                    {editableRow &&
                    editableRow.categoryIndex === categoryIndex ? (
                      <input
                        type="text"
                        value={category.item}
                        onChange={(e) => handleInputChange(e, categoryIndex)}
                      />
                    ) : (
                      category.item
                    )}
                  </td>
                  <td>
                    {editableRow &&
                    editableRow.categoryIndex === categoryIndex ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-check-lg"
                          viewBox="0 0 16 16"
                          onClick={() => handleSave(categoryIndex)}
                        >
                          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-x-circle"
                          viewBox="0 0 16 16"
                          onClick={() => cancelEdit(categoryIndex)}
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                          onClick={() => toggleEdit(categoryIndex)}
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                          onClick={() => handleRemoveItem(categoryIndex)}
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      <Stack direction="horizontal" gap={2} className="col-md-2 mx-auto">
        <Button as="input" type="button" value="Add" onClick={handleAddRow} />{" "}
        <Button
          as="input"
          type="submit"
          value="Submit"
          onClick={handleSubmit}
        />{" "}
      </Stack>
    </Stack>
  );
};

export default MenuTable;
