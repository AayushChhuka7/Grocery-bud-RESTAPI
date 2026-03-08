import SingleItem from "./SingleItem";
import "./Items.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Items = ({ items, removeItem, editCompleted, setEditId }) => {
  return (
    <div className="items">
      {items.map((item) => {
        return (
          <SingleItem
            key={item.id}
            item={item}
            removeItem={removeItem}
            editCompleted={editCompleted}
            setEditId={setEditId}
          />
        );
      })}
    </div>
  );
};

export default Items;
