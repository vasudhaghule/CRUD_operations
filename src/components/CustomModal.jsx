import React from "react";
import { useSelector } from "react-redux";
import "./Custo.css";

const CustomModal = ({ id, setpopup }) => {
  const allusers = useSelector((state) => state.app.users);

  const singleUser = allusers.filter((ele) => ele.id === id);
  console.log("singleuser", singleUser);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => setpopup
            (false)}>Close</button>
        <h2>{singleUser[0].name}</h2>
        <h3>{singleUser[0].email}</h3>
        <h4>{singleUser[0].age}</h4>
        <p>{singleUser[0].gender}</p>
      </div>
    </div>
  );
};

export default CustomModal;
