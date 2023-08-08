import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  GridItem,
  Heading,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

const CardMenu = () => {
  return (
    <>
      <Grid
        justifyContent={"space-evenly"}
        templateAreas={{
          lg: `"c1 c2 c3"`,
          sm: `"c1" "c2" "c3"`,
        }}
      >
        <GridItem
          borderRadius={10}
          boxShadow="lg"
          margin={5}
          padding={5}
          area="c1"
          width="400px"
          height="250px"
          backgroundColor="#9288F8"
        >
          <Link to="manage-users">
            <Card padding={5} height="100%">
              <CardHeader>
                <Heading>Manage Users </Heading>
              </CardHeader>
              <Divider />
              <CardBody>Manage subscribers of your app</CardBody>
            </Card>
          </Link>
        </GridItem>

        <GridItem
          borderRadius={10}
          boxShadow="lg"
          margin={5}
          padding={5}
          area="c2"
          width="400px"
          height="250px"
          backgroundColor="#9288F8"
        >
          <Link to="/bot-settings">
            <Card padding={5} height="100%">
              <CardHeader>
                <Heading> Bot settings </Heading>
              </CardHeader>
              <Divider />
              <CardBody>Configure Bot settings of your app</CardBody>
            </Card>
          </Link>
        </GridItem>

        <GridItem
          borderRadius={10}
          overflow="hidden"
          boxShadow="lg"
          margin={5}
          padding={5}
          area="c3"
          width="400px"
          height="250px"
          backgroundColor="#9288F8"
          textColor="grey"
        >
          <Card padding={5} height="100%">
            <CardHeader>
              <Heading>Statistics</Heading>
            </CardHeader>
            <Divider />

            <CardBody>
              <Stat>
                <StatLabel>Total users</StatLabel>
                <StatNumber>345,670</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  23.36% This week
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </>
  );
};

export default CardMenu;
