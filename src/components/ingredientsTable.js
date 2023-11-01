import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const IngredientTable = () => {
  const [editableRow, setEditableRow] = useState([]);
  const [ingredients, setIngredientData] = useState([]);
  const [ingredientsCategories, setIngredientsCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [updatedIngredientsDataList, setUpdatedIngredientsDataList] = useState(
    []
  );
  const [oldData, setOldData] = useState({});
  useEffect(() => {
    async function fetchIngredientsCategories() {
      var response = await axios({
        method: "POST",
        url: "http://localhost:3000/dev/cateringService",
        data: { service: "get_unique_ingredient_categories" },
      });
      setIngredientsCategories(response.data);
    }
    fetchIngredientsCategories();
  }, []);
  async function fetchIngredientsData(selectedCategory) {
    setSelectedCategory(selectedCategory);
    setEditableRow(null);
    var response = await axios({
      method: "POST",
      url: "http://localhost:3000/dev/cateringService",
      data: {
        service: "get_ingredients_by_category",
        category: selectedCategory,
      },
    });
    setUpdatedIngredientsDataList([]);
    setIngredientData(response.data);
  }

  const updateIngredient = (updatedData) => {
    setIngredientData(updatedData);
  };
  const toggleEdit = (index) => {
    setOldData({ ...ingredients[index] });
    setEditableRow({ index });
  };

  const handleSave = (ingredient, index) => {
    let updatedDataList = [...updatedIngredientsDataList];
    let updatedData = { ...ingredient };
    let checkFlag = false;
    if (JSON.stringify(oldData) === JSON.stringify(updatedData)) {
      console.log("no changes have been done.");
      setEditableRow(null);
      return;
    }
    let duplicateData = ingredients.filter(
      (element, i) =>
        i !== index &&
        element["item"] === updatedData["item"] &&
        element["rate_per_unit"] === updatedData["rate_per_unit"] &&
        element["unit"] === updatedData["unit"]
    );
    if (duplicateData.length > 0) {
      alert("Ingredient already exists.");
      return;
    }
    if (Object.keys(ingredients[index]).includes("id")) {
      updatedData["service"] = "update_ingeridient";
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
      updatedData["index"] = index;
      updatedData["service"] = "add_ingredient";
      for (let i = 0; i < updatedDataList.length; i++) {
        if (
          Object.keys(updatedDataList[i]).includes("index") &&
          updatedDataList[i]["index"] === index
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
    setUpdatedIngredientsDataList(updatedDataList);
    setEditableRow(null);
  };

  const handleChange = (e, index, field) => {
    const updatedIngredient = {
      ...ingredients[index],
      [field]: e.target.value,
    };
    updatedIngredient["category"] = selectedCategory;
    updateIngredient([
      ...ingredients.slice(0, index),
      updatedIngredient,
      ...ingredients.slice(index + 1),
    ]);
  };
  const handleRemove = (index) => {
    let updatedDataList = [...updatedIngredientsDataList];
    let removedData = { ...ingredients[index] };
    let checkFlag = false;
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    updateIngredient(updatedIngredients);
    if (Object.keys(ingredients[index]).includes("id")) {
      removedData["service"] = "delete_ingeridient";
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
          Object.keys(updatedDataList[i]).includes("index") &&
          updatedDataList[i]["index"] === index
        ) {
          updatedDataList.splice(i, 1);
          break;
        }
      }
    }
    for (let i = 0; i < updatedDataList.length; i++) {
      if (
        Object.keys(updatedDataList[i]).includes("index") &&
        updatedDataList[i]["index"] > index
      ) {
        updatedDataList[i]["index"] = updatedDataList[i]["index"] - 1;
      }
    }
    setUpdatedIngredientsDataList(updatedDataList);
  };

  const handleAddRow = () => {
    const newIngredient = {
      category: "",
      item: "",
      rate_per_unit: null,
      unit: "",
    };
    updateIngredient([...ingredients, newIngredient]);
  };
  async function updateAll() {
    for (let i = 0; i < updatedIngredientsDataList.length; i++) {
      await axios({
        method: "POST",
        url: "http://localhost:3000/dev/cateringService",
        data: updatedIngredientsDataList[i],
      });
    }
  }
  const handleItemSubmit = async () => {
    const isEmptyItem = ingredients.some((ingredient) => !ingredient.item);
    const isEditing = editableRow !== null;
    if (isEditing) {
      alert("Please save or cancel the current edit before submitting.");
      return;
    }
    if (isEmptyItem) {
      alert("Please ensure all items are filled before submitting.");
      return;
    }
    if (updatedIngredientsDataList.length === 0) {
      alert("No changes have been done. So, there is nothing to update.");
      return;
    }
    await updateAll();
    alert("Form submitted successfully!");
  };
  const cancelEdit = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = oldData;
    updateIngredient(updatedIngredients);
    setEditableRow(null);
  };
  return (
    <Stack gap={2}>
      <Form.Select
        aria-label="Default select example"
        onChange={(e) => {
          e.preventDefault();
          fetchIngredientsData(e.target.value);
        }}
      >
        <option>Select Menu Category</option>
        {ingredientsCategories &&
          ingredientsCategories.length > 0 &&
          ingredientsCategories.map((category, categoryIndex) => (
            <option key={categoryIndex} value={category.category}>
              {category.category}
            </option>
          ))}
      </Form.Select>
      {ingredients && ingredients.length > 0 && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Serial No</th>
                <th>Category</th>
                <th>Item</th>
                <th>Rate Per Unit</th>
                <th>Unit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {index === 0 && (
                    <td
                      rowSpan={ingredients.length}
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                      }}
                    >
                      {ingredient.category}
                    </td>
                  )}
                  <td>
                    {editableRow && editableRow.index === index ? (
                      <input
                        type="text"
                        value={ingredient.item}
                        onChange={(e) => handleChange(e, index, "item")}
                      />
                    ) : (
                      ingredient.item
                    )}
                  </td>
                  <td>
                    {editableRow && editableRow.index === index ? (
                      <input
                        type="number"
                        value={
                          ingredient.rate_per_unit
                            ? ingredient.rate_per_unit
                            : ""
                        }
                        onChange={(e) =>
                          handleChange(e, index, "rate_per_unit")
                        }
                      />
                    ) : (
                      ingredient.rate_per_unit
                    )}
                  </td>
                  <td>
                    {editableRow && editableRow.index === index ? (
                      <input
                        type="text"
                        value={ingredient.unit}
                        onChange={(e) => handleChange(e, index, "unit")}
                      />
                    ) : (
                      ingredient.unit
                    )}
                  </td>
                  <td>
                    {editableRow && editableRow.index === index ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-check-lg"
                          viewBox="0 0 16 16"
                          onClick={() => handleSave(ingredient, index)}
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
                          onClick={() => cancelEdit(index)}
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
                          onClick={() => toggleEdit(index)}
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
                          onClick={() => handleRemove(index)}
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
          onClick={handleItemSubmit}
        />{" "}
      </Stack>
    </Stack>
  );
};

export default IngredientTable;
