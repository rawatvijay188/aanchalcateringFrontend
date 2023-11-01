import MenuAndIngredients from "./MenuAndIngredients";
import { useState } from "react";
import Event from "./Event";
import NavigationBar from "./NavigationBar";
import MenuTable from "./menuTable";
import IngredientTable from "./ingredientsTable";

function Home() {
  const [tabValue, setTabValue] = useState(0);
  return (
    <>
      <NavigationBar setTabValue={setTabValue} />
      <br />
      <div>
        {tabValue === 0 && <MenuAndIngredients setTabValue={setTabValue} />}
        {tabValue === 1 && <Event />}
        {tabValue === 2 && <MenuTable />}
        {tabValue === 3 && <IngredientTable />}
      </div>
    </>
  );
}

export default Home;
