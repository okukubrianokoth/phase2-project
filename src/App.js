import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ItemList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";
import Footer from "./components/Footer";
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  // Fetch items from json-server on mount
  useEffect(() => {
    fetch("https://json-server-2-28ko.onrender.com/")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  // Function to add new item to state after POST
  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  // Function to delete an item from the server and state
  const deleteItem = (id) => {
    fetch(`https://json-server-2-28ko.onrender.com/item/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  return (
    <div className="App">
      <Header />
      <AddItemForm onAddItem={addItem} />
      <ItemList items={items} onDeleteItem={deleteItem} />
      <Footer />
    </div>
  );
}

export default App;
