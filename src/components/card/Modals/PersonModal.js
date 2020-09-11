import React, { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";

const PersonModal = ({ setPerson, ClosePerson }) => {
  // State to control the success message
  const [setSuccess, setSuccessState] = useState(false);
  // State to control the error message
  const [setError, setErrorState] = useState(false);
  // State to control the error message content
  const [setErrorContent, setErrorContentState] = useState("");
  // State for the form inputs values
  const [formValues, setFormValues] = useState({
    id_card: "",
    name: "",
    surname: "",
    email: "",
    phone_number: "",
    address: "",
    zipCode: "",
  });

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
  // Change handler for form inputs
  const handleChange = (e) => {
    e.persist();
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // Valid Email validator
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
  // Form Validator
  const isFormValid = () => {
    if (isFormEmpty(formValues)) {
      setErrorState(true);
      setErrorContentState("Fields cannot be empty!");
      setTimeout(() => {
        setErrorState(false);
      }, 3000);
      return false;
    } else if (isEmailValid(formValues.email) === false) {
      setErrorState(true);
      setErrorContentState("Please enter a correct email!");
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
      axios.post("http://localhost:8000/people/", formValues, {
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
        id_card: "",
        name: "",
        surname: "",
        email: "",
        phone_number: "",
        address: "",
        zipCode: "",
      });
    }
  };

  return (
    <Modal show={setPerson} onHide={ClosePerson}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Person</Modal.Title>
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
            value={formValues.id_card}
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
            value={formValues.name}
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
            value={formValues.surname}
            max={35}
            onChange={(e) => handleChange(e)}
          />
          <Form.Field
            required
            name="email"
            label="Email"
            placeholder="Email"
            control="input"
            type="email"
            value={formValues.email}
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
            value={formValues.phone_number}
            max={8}
            onChange={(e) => handleChange(e)}
          />
          <Form.Field
            name="address"
            label="Address"
            placeholder="Address"
            control="input"
            type="text"
            value={formValues.address}
            max={35}
            onChange={(e) => handleChange(e)}
          />
          <Form.Field
            name="zipcode"
            label="ZipCode"
            placeholder="ZipCode"
            control="input"
            type="text"
            value={formValues.zipCode}
            max={35}
            onChange={(e) => handleChange(e)}
          />
        </Form>
        {setError && <Message error header="Error" content={setErrorContent} />}
        {setSuccess && (
          <Message
            success
            header="Person Added!"
            content="The person was added successufly"
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" color="red" onClick={ClosePerson}>
          Close
        </Button>
        <Button variant="primary" color="green" onClick={SubmitForm}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

PersonModal.propTypes = {
  setPerson: PropTypes.bool,
  ClosePerson: PropTypes.func,
};

PersonModal.defaultProps = {
  setPerson: false,
  ClosePerson: () => {},
};

export default PersonModal;
