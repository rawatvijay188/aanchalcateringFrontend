import MenuAndIngredients from "./MenuAndIngredients";
import { useState } from "react";
import Event from "./Event";
import NavigationBar from "./NavigationBar";
import MenuTable from "./menuTable";
import IngredientTable from "./ingredientsTable";
<<<<<<< HEAD
import EventDetails from "./Report";

function Home() {
  const [tabValue, setTabValue] = useState(0);


=======
import AddEventForm from "./AddEventForm";
import UpdateEventForm from "./UpdateEventForm";
import UpdateEventMenuForm from "./UpdateEventMenuForm";

function Home() {
  const [tabValue, setTabValue] = useState(0);
  const [eventId, setEventId] = useState(null);
>>>>>>> e343d98bb0440006db0bd5f74a9081c09467d9f7
  return (
    <>
      <NavigationBar setTabValue={setTabValue} />
      <br />
<<<<<<< HEAD
      <div>
        {/* {tabValue === 0 && <MenuAndIngredients setTabValue={setTabValue} /> } */}
        {tabValue === 0 && <EventDetails  />}
        {tabValue === 1 && <Event />}
=======
      <div className="container">
        {tabValue === 0 && <MenuAndIngredients setTabValue={setTabValue} />}
        {tabValue === 1 && <Event setTabValue={setTabValue} />}
>>>>>>> e343d98bb0440006db0bd5f74a9081c09467d9f7
        {tabValue === 2 && <MenuTable />}
        {tabValue === 3 && <IngredientTable />}
        {tabValue === 4 && <AddEventForm />}
        {tabValue === 5 && (
          <UpdateEventForm setTabValue={setTabValue} setEventId={setEventId} />
        )}
        {tabValue === 6 && <UpdateEventMenuForm eventId={eventId} />}
      </div>
    </>
  );
}

export default Home;
