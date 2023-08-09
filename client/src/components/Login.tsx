import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider, auth } from "../firebase";
import GoogleButton from "react-google-button";

import {
  Box,
  useToast,
  Container,
  Heading,
  Flex,
  Divider,
} from "@chakra-ui/react";

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const toast = useToast();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives a Google Access Token. used to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);

        if (credential) {
          console.log("login successful");

          onLoginSuccess();
          const user = result.user;
          console.log(user);

          toast({
            title: "Logged In.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          let name = user.displayName;
          let email = user.email;
          let profilePic = user.photoURL;

          if (name) localStorage.setItem("name", name);
          if (email) localStorage.setItem("email", email);
          if (profilePic) localStorage.setItem("profilePic", profilePic);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode, errorMessage);
      });
  };

  return (
    <>
      <Container
        width="100%"
        justifyContent="space-evenly"
        padding="auto"
        // alignItems="center"
      >
        <Box
          boxShadow="xl"
          borderRadius={10}
          width="500px"
          height="500px"
          margin="auto"
          padding={5}
          backgroundImage="https://res.cloudinary.com/dfl4lkfzp/image/upload/c_scale,w_500/v1691448043/DALL_E_2023-08-08_03.15.14_-_an_android_looking_at_cloudy_weather_above_and_noting_down_something_bmlrck.png"

          // backgroundColor="lightblue"
        >
          <Flex flexDirection="column" alignItems="center">
            <Box p={3} m={3}>
              <Heading textAlign="center" size="xl">
                Welcome to Weather Bot Manager
              </Heading>
            </Box>
            <Divider />

            <Box p={5} m={5}>
              <Heading size="md">Please sign in to continue</Heading>
            </Box>
            <Divider />
            <Box p={5} m={5}>
              <GoogleButton onClick={handleLogin}></GoogleButton>
            </Box>
          </Flex>
        </Box>
      </Container>
    </>
  );
};

export default Login;
