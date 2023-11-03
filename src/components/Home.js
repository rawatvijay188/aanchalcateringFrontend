import MenuAndIngredients from "./MenuAndIngredients";
import { useState } from "react";
import Event from "./Event";
import NavigationBar from "./NavigationBar";
import MenuTable from "./menuTable";
import IngredientTable from "./ingredientsTable";
import AddEventForm from "./AddEventForm";

function Home() {
  const [tabValue, setTabValue] = useState(0);
  return (
    <>
      <NavigationBar setTabValue={setTabValue} />
      <br />
      <div className="container">
        {tabValue === 0 && <MenuAndIngredients setTabValue={setTabValue} />}
        {tabValue === 1 && <Event setTabValue={setTabValue}/>}
        {tabValue === 2 && <MenuTable />}
        {tabValue === 3 && <IngredientTable />}
        {tabValue === 4 && <AddEventForm  />}
      </div>
    </>
  );
}

export default Home;
