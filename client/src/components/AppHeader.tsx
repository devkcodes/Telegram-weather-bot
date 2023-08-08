import {
  HStack,
  Heading,
  Button,
  useToast,
  Avatar,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";

interface AppHeaderProps {
  onLogout: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onLogout }) => {
  const toast = useToast();

  const profileURL =
    localStorage.getItem("profilePic") || "./assets/default_profile.jpg";
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("profileURL");
        onLogout();
        toast({
          title: "Logged Out",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <HStack
      borderRadius={10}
      backgroundColor="#6F61C0"
      height={20}
      padding={5}
      margin={5}
      width="100%"
    >
      <Grid
        width="100%"
        templateAreas={{
          base: `"text text text text signout"`,
        }}
      >
        <GridItem area="text">
          <Heading>Welcome {localStorage.getItem("name")}</Heading>
        </GridItem>
        <GridItem area="signout">
          <HStack p={1} width={150}>
            <Avatar
              name={localStorage.getItem("name") || ""}
              src={profileURL}
            ></Avatar>
            <Button
              backgroundColor="#6F61C0"
              // textColor={"black"}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </HStack>
        </GridItem>
      </Grid>
    </HStack>
  );
};

export default AppHeader;
