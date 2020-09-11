import React, { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";

const AnimalModal = ({ setAnimal, CloseAnimal }) => {
  // State to control the success message
  const [setSuccess, setSuccessState] = useState(false);
  // State to control the error message
  const [setError, setErrorState] = useState(false);

  // State for the form inputs values
  const [formValues, setFormValues] = useState({
    weight: "",
    height: "",
    birthday: "",
    breed: "",
    description: "",
    tag_number: "",
    gender: "MALE",
  });

  // Form empty validator 
  const isFormEmpty = ({
    weight,
    height,
    birthday,
    breed,
    description,
    tag_number,
    gender,
  }) => {
    return (
      !weight.length ||
      !height.length ||
      !birthday.length ||
      !breed.length ||
      !description.length ||
      !tag_number.length ||
      !gender.length
    );
  };

  // Change handler for form inputs 
  const handleChange = (e) => {
    e.persist();
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Form validator
  const isFormValid = () => {
    if (isFormEmpty(formValues)) {
      setErrorState(true);
      setTimeout(() => {
        setErrorState(false);
      }, 3000);
      return false;
    } else {
      return true;
    }
  };

  // Function to launch when the save changes button is clicked
  const SubmitForm = () => {
    if (isFormValid()) {
      axios.post("http://localhost:8000/animals/", formValues, {
        auth: {
          username: "xgeeks",
          password: "xgeeks",
        },
      });
      setSuccessState(true);
      setTimeout(() => {
        setSuccessState(false);
      }, 5000);
      setFormValues({
        weight: "",
        height: "",
        birthday: "",
        breed: "",
        description: "",
        tag_number: "",
        gender: "",
      });
    }
  };

  return (
    <Modal show={setAnimal} onHide={CloseAnimal}>
      <Modal.Header closeButton>
        <Modal.Title>Add an Animal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Field
            required
            name="tag_number"
            value={formValues.tag_number}
            placeholder="Tag Number"
            label="Tag Number"
            control="input"
            type="number"
            max={5}
            onChange={handleChange}
          />
          <Form.Field
            required
            name="weight"
            value={formValues.weight}
            placeholder="Weight"
            label="Weight"
            control="input"
            type="number"
            max={5}
            onChange={handleChange}
          />
          <Form.Field
            required
            name="height"
            value={formValues.height}
            placeholder="Height"
            label="Height"
            control="input"
            type="number"
            max={5}
            onChange={handleChange}
          />
          <Form.Field
            required
            label="Birthday"
            control="input"
            type="date"
            name="birthday"
            onChange={handleChange}
            value={formValues.birthday}
          />
          <Form.Field
            required
            name="breed"
            value={formValues.breed}
            placeholder="Breed"
            label="Breed"
            control="input"
            type="text"
            max={35}
            onChange={handleChange}
          />
          <Form.Field
            required
            name="genus"
            value={formValues.genus}
            placeholder="Genus"
            label="Genus"
            control="input"
            type="text"
            max={35}
            onChange={handleChange}
          />
          <Form.Field
            required
            name="description"
            value={formValues.description}
            placeholder="Description"
            label="Description"
            control="textarea"
            rows="3"
            onChange={handleChange}
          />
          <Form.Field
            required
            name="gender"
            label="Gender"
            control="select"
            onChange={handleChange}
          >
            <option value="MALE" defaultValue>
              MALE
            </option>
            <option value="FEMALE">FEMALE</option>
          </Form.Field>
        </Form>
        {setError && (
          <Message error header="Error" content="Fields cannot be empty!" />
        )}
        {setSuccess && (
          <Message
            success
            header="Animal Added!"
            content="The animal was added successufly"
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" color="red" onClick={CloseAnimal}>
          Close
        </Button>
        <Button variant="primary" color="green" onClick={SubmitForm}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AnimalModal.propTypes = {
  setAnimal: PropTypes.bool,
  CloseAnimal: PropTypes.func,
};

AnimalModal.defaultProps = {
  setAnimal: false,
  CloseAnimal: () => {},
};

export default AnimalModal;
