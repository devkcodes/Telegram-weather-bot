import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  GridItem,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

const CardMenu = () => {
  //states
  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  //fetching users
  const fetchUsers = async () => {
    try {
      console.log("Fetching users...");
      const response = await axios.get("http://localhost:3000/telegram/users");
      const res = response.data;
      setUserCount(res.length);
      console.log(res.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

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
          area="c2"
          borderRadius={10}
          boxShadow="lg"
          margin={5}
          padding={5}
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
          className=""
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
                <StatNumber>{userCount}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </>
  );
};

export default CardMenu;
