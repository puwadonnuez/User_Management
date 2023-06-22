import React, { useState, useEffect } from "react";
import { getAll, del } from "../../services/user";
const useUserList = (page = 1, setCur) => {
  console.log(`page : `, page);
  const [userData, setUserData] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    getAll(page || 1)
      .then((res) => setUserData(res.data))
      .catch((error) => console.log(`error : `, error));
  }, [page]);

  const deleteUser = (id) => {
    del(id)
      .then((res) => {
        window.location.reload();
        // if(page === null) {
        //     setCur(1)
        // } else {
        //     setCur(null)
        // }
      })
      .catch((error) => console.log(`error : `, error));
  };

  return [userData, deleteUser, id, setId];
};

export default useUserList;
