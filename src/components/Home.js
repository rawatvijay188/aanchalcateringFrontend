import { useState } from "react";
import Event from "./Event";
import NavigationBar from "./NavigationBar";
import MenuTable from "./menuTable";
import IngredientTable from "./ingredientsTable";
import EventDetails from "./Report";
import AddEventForm from "./AddEventForm";
import UpdateEventForm from "./UpdateEventForm";
import UpdateEventMenuForm from "./UpdateEventMenuForm";
import MenuAndIngredients from "./MenuAndIngredients";

function Home() {
  const [tabValue, setTabValue] = useState(0);
  const [eventId, setEventId] = useState(null);
  return (
    <>
      <NavigationBar setTabValue={setTabValue} />
      <br />
      <div className="container">
        {tabValue === 0 && <MenuAndIngredients setTabValue={setTabValue} />}
        {tabValue === 1 && <Event setTabValue={setTabValue} />}
        {tabValue === 2 && <MenuTable />}
        {tabValue === 3 && <IngredientTable />}
        {tabValue === 4 && <AddEventForm />}
        {tabValue === 5 && (
          <UpdateEventForm setTabValue={setTabValue} setEventId={setEventId} />
        )}
        {tabValue === 6 && <UpdateEventMenuForm eventId={eventId} />}
        {tabValue === 7 && <EventDetails  />}
      </div>
    </>
  );
}

export default Home;
