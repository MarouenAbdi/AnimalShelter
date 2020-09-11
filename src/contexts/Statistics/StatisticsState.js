import React, { useReducer } from "react";
import axios from "axios";

import StatisticsContext from "./StatisticsContext";
import StatisticsReducer from "./StatisticsReducer";

import { GET_STATISTICS } from "../types";

const StatisticsState = ({ children }) => {
  const initialState = {
    statics: [],
  };
  //Get the Statistics
  const GetStatistics = async () => {
    const res = await axios
      .get("http://localhost:8000/statistics", {
        auth: {
          username: "xgeeks",
          password: "xgeeks",
        },
      })
      .then((result) => result.data);

    //Getting just the values from the response so the table will be compatible with ChartJS

    dispatch({
      type: GET_STATISTICS,
      payload: Object.values(res[0]),
    });
  };

  const [state, dispatch] = useReducer(StatisticsReducer, initialState);

  return (
    <StatisticsContext.Provider
      value={{ statics: state.statics, GetStatistics }}
    >
      {children}
    </StatisticsContext.Provider>
  );
};
export default StatisticsState;
