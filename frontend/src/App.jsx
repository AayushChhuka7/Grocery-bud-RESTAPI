import Items from "./components/Items";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Form from "./components/Form";

// Vite exposes variables prefixed with VITE_ via import.meta.env
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/grocery";

const App = () => {
  // Updated initial items state to be an empty list
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const inputRef = useRef(null);

  // Focus input when editing
  useEffect(() => {
    if (editId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editId]);

  // Load initial data list from server on component mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${BASE_URL}/`);
        if (!res.ok) throw new Error("Failed to fetch items");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        toast.error("Could not load grocery list");
      }
    };
    fetchItems();
  }, []);

  // Updated addItem function to use POST request
  const addItem = async (itemName) => {
    try {
      const res = await fetch(`${BASE_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: itemName, completed: false }),
      });
      if (!res.ok) throw new Error();
      const newItem = await res.json();
      setItems((prev) => [...prev, newItem.data]);
      toast.success("Grocery item added");
    } catch {
      toast.error("Could not add item");
    }
  };

  // Updated editCompleted function to use the toggle endpoint
  const editCompleted = async (itemId) => {
    try {
      const res = await fetch(`${BASE_URL}/${itemId}/toggle/`, {
        method: "POST",
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setItems((prev) =>
        prev.map((item) => (item.id === itemId ? updated.data : item)),
      );
    } catch {
      toast.error("Could not update item");
    }
  };

  // Updated removeItem function to use DELETE request
  const removeItem = async (itemId) => {
    try {
      const res = await fetch(`${BASE_URL}/${itemId}/`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((item) => item.id !== itemId));
      toast.success("Item deleted");
    } catch {
      toast.error("Could not delete item");
    }
  };

  // Updated updateItemName function to use PATCH request
  const updateItemName = async (newName) => {
    try {
      const res = await fetch(`${BASE_URL}/${editId}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setItems((prev) =>
        prev.map((item) => (item.id === editId ? updated.data : item)),
      );
      setEditId(null);
      toast.success("Item updated");
    } catch {
      toast.error("Could not update item");
    }
  };

  return (
    <section className="section-center">
      <ToastContainer position="top-center" />
      <Form
        addItem={addItem}
        updateItemName={updateItemName}
        editItemId={editId}
        itemToEdit={items.find((item) => item.id === editId)}
        inputRef={inputRef}
      />
      <Items
        items={items}
        editCompleted={editCompleted}
        removeItem={removeItem}
        setEditId={setEditId}
      />
    </section>
  );
};

export default App;
