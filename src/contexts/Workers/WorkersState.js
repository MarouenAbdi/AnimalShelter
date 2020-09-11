import React, { useReducer } from "react";
import axios from "axios";

import WorkersContext from "./WorkersContext";
import WorkersReducer from "./WorkersReducer";

import { GET_WORKERS, GET_NON_WORKERS, GET_PEOPLE } from "../types";

export const WorkersState = ({ children }) => {
  const initialState = {
    workers: [],
    nonWorkers: [],
    people: [],
  };

  const GetPeople = async () => {
    const persons = await axios
      .get("http://localhost:8000/people/", {
        auth: {
          username: "xgeeks",
          password: "xgeeks",
        },
      })
      .then((res) => res.data.results);

    dispatch({
      type: GET_PEOPLE,
      payload: persons,
    });
  };

  const GetWorkers = async () => {
    const persons = await axios
      .get("http://localhost:8000/people/", {
        auth: {
          username: "xgeeks",
          password: "xgeeks",
        },
      })
      .then((res) => res.data.results);

    const shelter = await axios
      .get("http://localhost:8000/shelter-workers/", {
        auth: {
          username: "xgeeks",
          password: "xgeeks",
        },
      })
      .then((res) => res.data.results);

    // eslint-disable-next-line
    persons.map((shWorker) => {
      const test = (el) => el.id === shWorker.id;
      if (shelter.some(test)) {
        initialState.workers.push(shWorker);
      }
    });

    await dispatch({
      type: GET_WORKERS,
      payload: initialState.workers,
    });

  };

  const GetNonWorkers = async () => {
    const persons = await axios
      .get("http://localhost:8000/people/", {
        auth: {
          username: "xgeeks",
          password: "xgeeks",
        },
      })
      .then((res) => res.data.results);

    const shelter = await axios
      .get("http://localhost:8000/shelter-workers/", {
        auth: {
          username: "xgeeks",
          password: "xgeeks",
        },
      })
      .then((res) => res.data.results);

    // eslint-disable-next-line
    persons.map((shWorker) => {
      const test = (el) => el.id === shWorker.id;
      if (shelter.some(test)) {
        return null
      } else {
        initialState.nonWorkers.push(shWorker);
      }
    });

    dispatch({
      type: GET_NON_WORKERS,
      payload: initialState.nonWorkers,
    });
  };

  const [state, dispatch] = useReducer(WorkersReducer, initialState);

  return (
    <WorkersContext.Provider
      value={{ people: state.people, nonWorkers: state.nonWorkers, workers: state.workers, GetPeople, GetWorkers, GetNonWorkers }}
    >
      {children}
    </WorkersContext.Provider>
  );
};

export default WorkersState;
