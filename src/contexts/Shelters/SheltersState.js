import React, { useReducer } from "react";
import axios from "axios";

import SheltersContext from "./SheltersContext";
import SheltersReducer from "./SheltersReducer";

import { GET_SHELTERS } from "../types";

const SheltersState = ({ children }) => {
  const initialState = {
    shelters: [],
  };
  //Get the Shelters
  const GetShelters = async () => {
    const res = await axios
      .get("http://localhost:8000/shelters/", {
        auth: {
          username: "xgeeks",
          password: "xgeeks",
        },
      })
      .then((result) =>  result.data.results);

    dispatch({
      type: GET_SHELTERS,
      payload: res,
    });
  };

  const [state, dispatch] = useReducer(SheltersReducer, initialState);

  return (
    <SheltersContext.Provider value={{ shelters: state.shelters, GetShelters }}>
      {children}
    </SheltersContext.Provider>
  );
};
export default SheltersState;
