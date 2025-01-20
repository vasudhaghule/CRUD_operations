import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {  showUser,deleteuser } from "../features/userDetailSlice";
import CustomModal from "./CustomModal";



const Read = () => {
  const dispatch = useDispatch();
 
  const [id,setId] = useState();

  const [showpopup,setpopup]=useState(false);

  const { users, loading } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showUser());
  }, []);

  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <div>
 {showpopup && <CustomModal id={id} showpopup={showpopup} setpopup={setpopup}/>}
      <h2>All data</h2>
  
      

      <div>
        {users &&
          users
            .map((ele) => (
              <div key={ele.id} className="card w-50 mx-auto my-2">
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                  <p className="card-text">{ele.gender}</p>
                <button className="card-lonk" onClick={()=>[setId(ele.id),setpopup(true)]}
                >View</button>
                  
                  <Link onClick={()=>dispatch(deleteuser(ele.id))} className="card-link">
                  Delete
                  </Link>
                  <Link to={`/edit/${ele.id}`} className="card-link">
  Edit
</Link>

                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Read;
