import "./SingleItem.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleItem = ({ item, removeItem, editCompleted, setEditId }) => {
  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => editCompleted(item.id)} // Calls the toggle API
      />
      <p
        style={{
          textTransform: "capitalize",
          textDecoration: item.completed && "line-through",
        }}
      >
        {item.name}
      </p>
      <div className="btn-container">
        <button
          className="btn edit-btn"
          type="button"
          onClick={() => setEditId(item.id)}
        >
          edit
        </button>
        <button
          className="btn remove-btn"
          type="button"
          onClick={() => removeItem(item.id)} // Calls the delete API
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
