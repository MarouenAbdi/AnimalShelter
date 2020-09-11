import React, { useState, useContext } from "react";
import { Card, Button, Icon } from "semantic-ui-react";

import AnimalsContext from "../../contexts/Animals/AnimalsContext";
import WorkersContext from "../../contexts/Workers/WorkersContext";
import SheltersContext from "../../contexts/Shelters/SheltersContext";

import AdoptionModal from "./Modals/AdoptionModal";
import PersonModal from "./Modals/PersonModal";
import AnimalModal from "./Modals/AnimalModal";

const MyCard = () => {
  // State to control show/hide Person Modal
  const [setPerson, setPersonState] = useState(false);
  const ClosePerson = () => setPersonState(false);

  // State to control show/hide Animal Modal
  const [setAnimal, setAnimalState] = useState(false);
  const CloseAnimal = () => setAnimalState(false);

  // State to control show/hide Adoption Modal
  const [setAdoption, setAdoptionState] = useState(false);
  const CloseAdoption = () => setAdoptionState(false);

  //Contexts init
  const AnimalList = useContext(AnimalsContext);
  const WorkersList = useContext(WorkersContext);
  const ShelterList = useContext(SheltersContext);

  // Click handler to display modals and fire up the contexts to get data
  const handleClick = (msg) => {
    if (msg === 1) {
      setPersonState(true);
    } else if (msg === 2) {
      setAnimalState(true);
    } else {
      setAdoptionState(true);
      AnimalList.GetAnimals();
      WorkersList.GetPeople();
      ShelterList.GetShelters();
    }
  };
  return (
    <>
      {/* Add Person Modal  */}

      <PersonModal
        setPerson={setPerson}
        ClosePerson={ClosePerson}
      ></PersonModal>

      {/* Add Animal Modal */}
      <AnimalModal
        setAnimal={setAnimal}
        CloseAnimal={CloseAnimal}
      ></AnimalModal>

      {/* Adoption Modal  */}

      <AdoptionModal
        setAdoption={setAdoption}
        CloseAdoption={CloseAdoption}
      ></AdoptionModal>

      {/* Card with buttons to show the modals   */}

      <Card fluid>
        <Card.Content>
          <Card.Header>Activities</Card.Header>
        </Card.Content>
        <Card.Content>
          <Button
            fluid
            icon
            labelPosition="left"
            color="red"
            onClick={() => handleClick(1)}
          >
            Add a Person
            <Icon name="user" />
          </Button>
        </Card.Content>
        <Card.Content>
          <Button
            fluid
            icon
            labelPosition="left"
            color="blue"
            onClick={() => handleClick(2)}
          >
            Add an Animal
            <Icon name="paw" />
          </Button>
        </Card.Content>
        <Card.Content>
          <Button
            fluid
            icon
            labelPosition="left"
            color="green"
            onClick={() => handleClick(3)}
          >
            Add an Adoption
            <Icon name="like" />
          </Button>
        </Card.Content>
      </Card>
    </>
  );
};

export default MyCard;
