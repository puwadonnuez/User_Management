import { useState, useEffect } from "react";
import { create, update, get } from "../../../services/user";
import moment from "moment";

const useForm = (id, base64, setTempImg) => {
  const [state, setState] = useState(initialState);
  const [response, setResponse] = useState(null);
  useEffect(() => {
    if (id) {
      get(id)
        .then((data) => {
          const currentPath = data?.data?.data?.user_data;
          console.log(`currentPath: `, currentPath);
          setState(currentPath);
          if (currentPath.image) {
            setTempImg(`http://localhost:2887${currentPath.image}`);
          }
        })
        .catch((error) => setResponse(error.response));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setState((preValues) => ({
      ...preValues,
      [e.target.name]: val,
    }));
  };

  const handleDateChange = (val) => {
    setState((preValues) => ({
      ...preValues,
      birth_date: val,
    }));
  };

  const handleSubmit = () => {
    const request = {
      ...state,
    };
    if (state.birth_date) {
      request.birth_date = moment(state.birth_date).format(`YYYY-MM-DD`);
    }
    if (base64) {
      request.image = base64;
    } else {
      request.image = null;
    }
    if (state?.id) {
      update(state.id, request)
        .then((data) => {
          setResponse(data);
        })
        .catch((error) => setResponse(error.response));
    } else {
      create(request)
        .then((data) => setResponse(data))
        .catch((error) => setResponse(error.response));
    }
  };
  return [
    state,
    handleDateChange,
    handleInputChange,
    handleSubmit,
    response,
    setResponse,
  ];
};

const initialState = {
  first_name: "",
  last_name: "",
  gender: "",
  image: "",
};

export default useForm;
