import React from "react";
import { Table, Icon, Segment, Header } from "semantic-ui-react";
import PropTypes from "prop-types";

const AnimalTable = ({ animals }) => {
  // Checking if the prop exists and have data to display the table
  if (animals && animals.length) {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Tag Number</Table.HeaderCell>
            <Table.HeaderCell>Weight</Table.HeaderCell>
            <Table.HeaderCell>Height</Table.HeaderCell>
            <Table.HeaderCell>Birthday</Table.HeaderCell>
            <Table.HeaderCell>Breed</Table.HeaderCell>
            <Table.HeaderCell>Genus</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {animals.map((animal) => (
            <Table.Row key={animal.id}>
              <Table.Cell>{animal.tag_number}</Table.Cell>
              <Table.Cell>{animal.weight}</Table.Cell>
              <Table.Cell>{animal.height}</Table.Cell>
              <Table.Cell>{animal.birthday}</Table.Cell>
              <Table.Cell>{animal.breed}</Table.Cell>
              <Table.Cell>{animal.genus}</Table.Cell>
              <Table.Cell>{animal.description}</Table.Cell>
              <Table.Cell>{animal.gender}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  } else {
    // if the props is empty or have no data display a message
    return(<Segment placeholder>
      <Header icon>
        <Icon name="find" />
        No results were found...
      </Header>
    </Segment>);
    
  }
};

AnimalTable.propTypes = {
  animals: PropTypes.array.isRequired,
};

export default AnimalTable;
