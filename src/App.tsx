import { appStyles } from "./assets/styles/StyleIndex";
import Pantry from "./components/Pantry/Pantry";
import GroceryList from "./components/GroceryList/GroceryList";
import Header from "./components/Header/Header";
import { useState } from "react";

function App() {
  // TODO: Add dark mode

  const[isAuthed, setIsAuthed] = useState(false);

  return (
    <div style={appStyles}>
      <Header />
      <h1 className="text-3xl">Pantry App 2025</h1>

      {/* Want to display different pages
        - Pantry - Add ingredients to pantry, see ingredients in pantry, 
        - Grocery List - Add ingredients to grocery list, see ingredients on grocery list

      */}

      <Pantry />
      <GroceryList />
    </div>
  );
}

export default App;
