import { useState, useRef } from "react";
import RecordCard from "../components/RecordCard";
import "../css/Form.css";

export default function Form() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [record, setRecord] = useState([]);
  const [edit, setEdit] = useState(null);
  const inputFocus = useRef(null);

  function nameInput(e) {
    return setName(e.target.value.replace(/[ 　]/g, ""));
  }

  function weightInput(e) {
    return setWeight(e.target.value.replace(/[ 　]/g, ""));
  }

  function handleEdit(item) {
    setName(item.name);
    setWeight(item.weight);
    setEdit(item.id);
  }

  function handleDelete(id) {
    setRecord(
      record.filter((record) => {
        return record.id !== id;
      }),
    );

    if (edit === id) {
      setName("");
      setWeight("");
      setEdit(null);
    }
  }

  return (
    <main className="form-page">
      <div className="form-container">
        <header className="form-header">
          <span className="form-subtitle">WORKOUT TRACKER</span>
          <h1>トレーニング記録</h1>
          <p>今日のトレーニングを記録しよう。</p>
        </header>

        <section className="form-card">
          <h2>NEW RECORD</h2>

          <div className="form-group">
            <label htmlFor="exercise-name">種目名</label>

            <input
              id="exercise-name"
              type="text"
              placeholder="例：ベンチプレス"
              value={name}
              ref={inputFocus}
              onChange={nameInput}
            />

            {name.trim() === "" && (
              <p className="form-error">種目名を入力してください</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="exercise-weight">重量（kg）</label>

            <input
              id="exercise-weight"
              type="number"
              placeholder="例：60"
              value={weight}
              onChange={weightInput}
            />

            {weight.trim() === "" && (
              <p className="form-error">重量を入力してください</p>
            )}
          </div>

          <button
            className="form-submit"
            onClick={() => {
              edit === null
                ? setRecord([
                    ...record,
                    { id: crypto.randomUUID(), name, weight },
                  ])
                : setRecord(
                    record.map((record) => {
                      if (record.id === edit) {
                        return { ...record, name, weight };
                      }
                      return record;
                    }),
                  );

              setName("");
              setWeight("");
              setEdit(null);
            }}
            disabled={name.trim() === "" || weight.trim() === ""}
          >
            {edit === null ? "＋ 記録を追加" : "保存する"}
          </button>
        </section>

        <section className="record-section">
          <div className="record-section-header">
            <div>
              <span className="form-subtitle">YOUR WORKOUTS</span>
              <h2>トレーニング一覧</h2>
            </div>

            <span className="record-count">{record.length} RECORDS</span>
          </div>

          <Record
            record={record}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            inputFocus={inputFocus}
          />
        </section>
      </div>
    </main>
  );
}

function Record({ record, handleEdit, handleDelete, inputFocus }) {
  return (
    <div className="record-list">
      {record.length === 0 ? (
        <div className="record-empty">
          <p>まだ記録がありません。</p>
          <span>最初のトレーニングを記録してみましょう！</span>
          <button
            type="button"
            className="record-empty-add"
            onClick={() => inputFocus.current.focus()}
          >
            ＋
          </button>
        </div>
      ) : (
        record.map((item) => {
          return (
            <RecordCard
              key={item.id}
              item={item}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })
      )}
    </div>
  );
}
