import "../css/RecordCard.css";

export default function RecordCard({ item, handleEdit, handleDelete }) {
  return (
    <div className="record-card">
      <div className="record-card-info">
        <span className="record-card-label">EXERCISE</span>
        <h3>{item.name}</h3>
      </div>

      <div className="record-card-weight">
        <span>{item.weight}</span>
        <small>kg</small>
      </div>

      <div className="record-card-actions">
        <button
          className="record-edit-button"
          onClick={() => {
            handleEdit(item);
          }}
        >
          EDIT
        </button>

        <button
          className="record-delete-button"
          onClick={() => {
            handleDelete(item.id);
          }}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}
