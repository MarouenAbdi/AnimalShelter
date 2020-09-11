import React from "react";
import { Table, Icon, Segment, Header } from "semantic-ui-react";
import PropTypes from "prop-types";

const WorkersTable = ({ workers }) => {
  // Checking if the prop exists and have data to display the table
  if (workers && workers.length) {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID Card</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Surname</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Phone Number</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Zip Code</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {workers.map((worker) => (
            <Table.Row key={worker.id}>
              <Table.Cell>{worker.id_card}</Table.Cell>
              <Table.Cell>{worker.name}</Table.Cell>
              <Table.Cell>{worker.surname}</Table.Cell>
              <Table.Cell>{worker.email}</Table.Cell>
              <Table.Cell>{worker.phone_number}</Table.Cell>
              <Table.Cell>{worker.address}</Table.Cell>
              <Table.Cell>{worker.zipcode}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  } else {
    // if the props is empty or have no data display a message
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name="find" />
          No results were found...
        </Header>
      </Segment>
    );
  }
};

WorkersTable.propTypes = {
  workers: PropTypes.array.isRequired,
};

export default WorkersTable;
