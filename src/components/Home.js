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
import UpdateEventIngredientsForm from "./UpdateEventIngredientsForm";
// import bg_image from "../static/images/bg_image.jpg";

function Home() {
  const [tabValue, setTabValue] = useState(0);
  const [eventId, setEventId] = useState(null);

  // const containerStyle = {
  //   backgroundImage: `url("${bg_image}")`, // Replace with the path to your image
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'no-repeat',
  //   height: '100vh', // Adjust as needed
  // };
  const containerStyle = {
    backgroundColor: 'white', // Replace with your desired color code
    height: '100vh', // Adjust as needed
    marginTop:"50px"
  };
  return (
    <>
      <NavigationBar setTabValue={setTabValue} />
      <div  style={containerStyle} >
        {tabValue === 0 && <MenuAndIngredients setTabValue={setTabValue} />}
        {tabValue === 1 && <Event setTabValue={setTabValue} />}
        {tabValue === 2 && <MenuTable />}
        {tabValue === 3 && <IngredientTable />}
        {tabValue === 4 && <AddEventForm />}
        {tabValue === 5 && (
          <UpdateEventForm setTabValue={setTabValue} setEventId={setEventId} />
        )}
        {tabValue === 6 && <UpdateEventMenuForm eventId={eventId} />}
        {tabValue === 7 && <EventDetails />}
        {tabValue === 8 && <UpdateEventIngredientsForm eventId={eventId} />}
      </div>
    </>
  );
}

export default Home;
