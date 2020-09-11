import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Icon, Menu, Grid, Container } from "semantic-ui-react";

import MyCard from "./components/card/card";
import Tables from "./components/tables/tables";
import Chart from "./components/statics/Chart";

import AnimalsState from "./contexts/Animals/AnimalsState";
import WorkersState from "./contexts/Workers/WorkersState";
import SheltersState from "./contexts/Shelters/SheltersState";
import StatisticsState from "./contexts/Statistics/StatisticsState";

function App() {
  return (
    <>
      <StatisticsState>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item>
              <Icon name="paw" style={{ marginRight: "1.5em" }} />
              Animal Shelter
            </Menu.Item>
          </Container>
        </Menu>
          <Grid stackable textAlign="center" stretched columns="equal"  style={{ margin: "1em" }}>
            <AnimalsState>
              <WorkersState>
                <Grid.Row>
                  <Grid.Column width={4}>
                    {/* The card for the adding activities */}
                    <SheltersState>
                      <MyCard />
                    </SheltersState>
                  </Grid.Column>
                  <Grid.Column width={12}>
                    {/* The tables to show the lists  */}
                    <Tables />
                  </Grid.Column>
                </Grid.Row>
              </WorkersState>
            </AnimalsState>
            <Grid.Row stretched>
              {/* The chart responsible of showing statistics  */}
              <Chart />
            </Grid.Row>
          </Grid>
      </StatisticsState>
    </>
  );
}

export default App;
