import React, { useState, useContext } from "react";
import { Button, Form, Dropdown, Message } from "semantic-ui-react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";

import AnimalsContext from "../../../contexts/Animals/AnimalsContext";
import SheltersContext from "../../../contexts/Shelters/SheltersContext";

const AdoptionModal = ({ setAdoption, CloseAdoption }) => {
  // Contexts init
  const AnimalList = useContext(AnimalsContext);
  const ShelterList = useContext(SheltersContext);

  // State to display the success message
  const [setSuccess, setSuccessState] = useState(false);

  // Final state for the post method object
  const [Final, setFinalOut] = useState({
    shelter_id: "",
    animal_id: "",
    person: {
      id_card: "",
      name: "",
      surname: "",
      email: "",
      phone_number: "",
      address: "",
      zipcode: "",
    },
  });
  // State to display the error message
  const [setError, setErrorState] = useState(false);
  // State for the error message content
  const [setErrorContent, setErrorContentState] = useState("");

  // Empty form validator
  const isFormEmpty = ({ id_card, name, surname, email, phone_number }) => {
    return (
      !id_card.length ||
      !name.length ||
      !surname.length ||
      !email.length ||
      !phone_number.length
    );
  };

  // Verify if the dropdown don't have a value

  const isDropNotSelected = (shelter_id, animal_id) => {
    if (shelter_id.length === 0 || animal_id.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  // Change handler for inputs and dropdowns
  const handleChange = (e, data) => {
    e.persist();
    if (data === undefined) {
      setFinalOut((prevFinal) => ({
        ...prevFinal,
        person: { ...prevFinal.person, [e.target.name]: e.target.value },
      }));
    } else if (data) {
      setFinalOut((prevFinal) => ({
        ...prevFinal,
        [data.name]: data.value,
      }));
    }
  };

  // Email validator
  const isEmailValid = (email) => {
    if (email !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        return false;
      } else {
        return true;
      }
    }
  };

  //Form validator
  const isFormValid = () => {
    if (isFormEmpty(Final.person)) {
      setErrorState(true);
      setErrorContentState("Fields cannot be empty!");
      setTimeout(() => {
        setErrorState(false);
      }, 3000);
      return false;
    } else if (isEmailValid(Final.person.email) === false) {
      setErrorState(true);
      setErrorContentState("Please enter a correct email!");
      setTimeout(() => {
        setErrorState(false);
      }, 3000);
      return false;
    } else if (isDropNotSelected(Final.shelter_id, Final.animal_id)) {
      setErrorState(true);
      setErrorContentState("Please Select a shelter and an animal");
      setTimeout(() => {
        setErrorState(false);
      }, 3000);
      return false;
    } else {
      return true;
    }
  };

  // Function launched when save changes button is clicked
  const SubmitForm = async () => {
    if (isFormValid()) {
      await axios.post("http://localhost:8000/adoptions/", Final, {
        auth: {
          username: "xgeeks",
          password: "xgeeks",
        },
      });
      setSuccessState(true);
      setTimeout(() => {
        setSuccessState(false);
      }, 5000);
    }
  };

  return (
    <Modal show={setAdoption} onHide={CloseAdoption}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Adoption</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Field
            required
            name="id_card"
            label="Card ID"
            placeholder="Card ID"
            control="input"
            type="text"
            value={Final.id_card}
            max={35}
            onChange={handleChange}
          />
          <Form.Field
            required
            name="name"
            label="First Name"
            placeholder="First Name"
            control="input"
            type="text"
            value={Final.name}
            max={35}
            onChange={handleChange}
          />
          <Form.Field
            required
            name="surname"
            label="Last Name"
            placeholder="Last Name"
            control="input"
            type="text"
            value={Final.surname}
            max={35}
            onChange={(e) => handleChange(e)}
          />
          <Form.Field
            required
            label="Email"
            placeholder="Email"
            control="input"
            name="email"
            type="email"
            value={Final.email}
            max={35}
            onChange={(e) => handleChange(e)}
          />
          <Form.Field
            required
            name="phone_number"
            label="Phone Number"
            placeholder="123456789"
            control="input"
            type="number"
            value={Final.phone_number}
            max={8}
            onChange={(e) => handleChange(e)}
          />
          <Form.Field
            name="address"
            label="Address"
            placeholder="Address"
            control="input"
            type="text"
            value={Final.address}
            max={35}
            onChange={(e) => handleChange(e)}
          />
          <Form.Field
            name="zipcode"
            label="ZipCode"
            placeholder="ZipCode"
            control="input"
            type="text"
            value={Final.zipcode}
            max={35}
            onChange={(e) => handleChange(e)}
          />

          <Form.Field required>
            <label>Animal Tag Number</label>
            <Dropdown
              name="animal_id"
              onChange={handleChange}
              placeholder="Select An Animal"
              fluid
              selection
              options={AnimalList.animals.map((animal) => {
                return {
                  key: animal.id,
                  text: animal.tag_number,
                  value: animal.id,
                };
              })}
            />
          </Form.Field>
          <Form.Field required>
            <label>Shelter</label>
            <Dropdown
              name="shelter_id"
              onChange={handleChange}
              placeholder="Select Shelter"
              fluid
              selection
              options={ShelterList.shelters.map((shelter) => {
                return {
                  key: shelter.id,
                  text: shelter.name,
                  value: shelter.id,
                };
              })}
            />
          </Form.Field>
        </Form>
        {setError && <Message error header="Error" content={setErrorContent} />}
        {setSuccess && (
          <Message
            success
            header="Adoption Added!"
            content="The adoption was added successufly"
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" color="red" onClick={CloseAdoption}>
          Close
        </Button>
        <Button variant="primary" color="green" onClick={SubmitForm}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AdoptionModal.propTypes = {
  setAdoption: PropTypes.bool,
  CloseAdoption: PropTypes.func,
};

AdoptionModal.defaultProps = {
  setAdoption: false,
  CloseAdoption: () => {},
};

export default AdoptionModal;
