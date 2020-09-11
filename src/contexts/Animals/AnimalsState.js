import React, { useReducer } from "react";
import axios from "axios";

import AnimalsContext from "./AnimalsContext";
import AnimalsReducer from "./AnimalsReducer";

import { GET_ANIMALS } from "../types";

const AnimalsState = ({ children }) => {
  const initialState = {
    animals: [],
  };
  //Get the animals from DB
  const GetAnimals = async () => {
    const res = await axios
      .get("http://localhost:8000/animals/", {
        auth: {
          username: "xgeeks",
          password: "xgeeks",
        },
      })
      .then((result) =>  result.data.results);

    dispatch({
      type: GET_ANIMALS,
      payload: res,
    });
  };

  const [state, dispatch] = useReducer(AnimalsReducer, initialState);

  return (
    <AnimalsContext.Provider value={{ animals: state.animals, GetAnimals }}>
      {children}
    </AnimalsContext.Provider>
  );
};
export default AnimalsState;
