import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AddNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState("");

  const handleAddNote = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:5021/api/customers/${id}/notes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: note,
        }),
      },
    );
  };

  return (
    <>
      <h1>Add Note</h1>
      <form onSubmit={handleAddNote}>
        <div className="form-group">
          <label htmlFor="note">Note</label>
          <input
            id="fee"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter note..."
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Save Note
        </button>
      </form>
    </>
  );
}
