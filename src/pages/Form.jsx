import { useState } from "react";

export default function Form() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [record, setRecord] = useState([]);
  const [edit, setEdit] = useState(null);
  function nameInput(e) {
    return setName(e.target.value.replace(/[ 　]/g, ""));
  }
  function weightInput(e) {
    return setWeight(e.target.value.replace(/[ 　]/g, ""));
  }
  return (
    <>
      記録ページ
      <p>種目名</p>
      <input
        type="text"
        placeholder="種目名"
        value={name}
        onChange={nameInput}
      ></input>
      {name.trim() === "" && <p>種目名を入力してください</p>}
      <p>重量</p>
      <input
        type="number"
        placeholder="重量"
        value={weight}
        onChange={weightInput}
      ></input>
      {weight.trim() === "" && <p>重量を入力してください</p>}
      <p>
        <button
          onClick={() => {
            setRecord([...record, { id: crypto.randomUUID(), name, weight }]);
            setName("");
            setWeight("");
          }}
          disabled={name.trim() === "" || weight.trim === ""}
        >
          {edit === null ? "追加" : "保存"}
        </button>
      </p>
      <Record
        name={name}
        weight={weight}
        setName={setName}
        setWeight={setWeight}
        record={record}
        setRecord={setRecord}
        edit={edit}
        setEdit={setEdit}
      />
    </>
  );
}

function Record({
  name,
  weight,
  setName,
  setWeight,
  record,
  setRecord,
  edit,
  setEdit,
}) {
  return (
    <>
      {record.map((item) => {
        return (
          <RecordCard
            key={item.id}
            item={item}
            name={name}
            weight={weight}
            setName={setName}
            setWeight={setWeight}
            record={record}
            setRecord={setRecord}
            edit={edit}
            setEdit={setEdit}
          />
        );
      })}
    </>
  );
}

function RecordCard({
  item,
  name,
  weight,
  setName,
  setWeight,
  record,
  setRecord,
  edit,
  setEdit,
}) {
  return (
    <div key={item.id}>
      {item.name}/{item.weight}
      <button
        onClick={() => {
          setName(item.name);
          setWeight(item.weight);
          setEdit(item.id);
        }}
      >
        EDIT
      </button>
    </div>
  );
}
