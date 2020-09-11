import React, { useState, useContext } from "react";
import { Button, Icon, Segment, Header } from "semantic-ui-react";

//Importing contexts
import AnimalsContext from "../../contexts/Animals/AnimalsContext";
import WorkersContext from "../../contexts/Workers/WorkersContext";

import AnimalTable from "./AnimalTable";
import WorkersTable from "./WorkersTable";

const Tables = () => {
  // State to control the displayed table
  const [setTable, setTableState] = useState(0);

  //Contexts init
  const AnimalList = useContext(AnimalsContext);
  const WorkersList = useContext(WorkersContext);

  // Click handler to call the component needed to display the data
  const handleClick = async (msg) => {
    switch (msg) {
      case 1:
        AnimalList.GetAnimals();
        setTableState(1);
        break;
      case 2:
        WorkersList.GetNonWorkers();
        setTableState(2);

        break;
      case 3:
        WorkersList.GetWorkers();
        setTableState(3);
        break;
      default:
    }
  };

  return (
    <>
      {/* Button to select which list the user wants to see  */}
      <Button.Group>
        <Button animated color="purple" onClick={() => handleClick(1)}>
          <Button.Content visible>Animals</Button.Content>
          <Button.Content hidden>
            <Icon name="paw" />
          </Button.Content>
        </Button>
        <Button animated color="pink" onClick={() => handleClick(2)}>
          <Button.Content visible>Non-Workers</Button.Content>
          <Button.Content hidden>
            <Icon name="ban" />
          </Button.Content>
        </Button>
        <Button animated color="violet" onClick={() => handleClick(3)}>
          <Button.Content visible>Workers</Button.Content>
          <Button.Content hidden>
            <Icon name="users" />
          </Button.Content>
        </Button>
      </Button.Group>

      {setTable === 0 && (
        <Segment placeholder>
          <Header icon>
            <Icon name="arrow circle up" />
            You can select what you want to see from the buttons above.
          </Header>
        </Segment>
      )}

      {/* The Animals Table */}

      {setTable === 1 && <AnimalTable animals={AnimalList.animals} />}

      {/* The Workers Table */}

      {setTable === 2 && (
        <WorkersTable workers={WorkersList.nonWorkers}></WorkersTable>
      )}

      {/* The non-workers table */}

      {setTable === 3 && (
        <WorkersTable workers={WorkersList.workers}></WorkersTable>
      )}
    </>
  );
};

export default Tables;
