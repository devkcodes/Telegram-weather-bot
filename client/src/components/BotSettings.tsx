import {
  Box,
  Button,
  Container,
  useToast,
  Divider,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  VStack,
  Input,
  StackDivider,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const BotSettings = () => {
  const botToken = "6296406218:AAHMLARBP3H1Feb2fRMBqNfclqvgTUpeq84";
  const baseURL = `https://api.telegram.org/bot${botToken}`;
  const [botName, setBotName] = useState("");
  const [desc, setDesc] = useState("");
  const [shortDesc, setShortDesc] = useState("");

  const toast = useToast();

  const handleNameChange = () => {
    console.log(botName);
    if (botName === "") {
      toast({
        title: "Operation Failed",
        description: "Name cant be empty",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      axios
        .post(`${baseURL}/setMyName`, {
          name: `${botName}`,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.ok) {
            setBotName("");
            toast({
              title: "Success",
              description: "Name Updated Successfully",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }
        });
    }
  };

  const handleDescChange = () => {
    console.log(desc);
    axios
      .post(`${baseURL}/setMyDescription`, {
        description: `${desc}`,
      })
      .then((response) => {
        console.log(response.data.ok);
        if (response.data.ok) {
          setDesc("");
          toast({
            title: "Success",
            description: "Description Updated Successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      });
  };

  const handleShortDescChange = () => {
    console.log(shortDesc);
    axios
      .post(`${baseURL}/setMyShortDescription`, {
        short_description: `${shortDesc}`,
      })
      .then((response) => {
        if (response.data.ok) {
          setShortDesc("");
          toast({
            title: "Success",
            description: "Info Updated Successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <Container maxW="lg" centerContent>
      <Box
        borderRadius="10px"
        width="700px"
        height="450px"
        m={5}
        p={10}
        backgroundColor="#2D3748"
      >
        <VStack
          divider={<StackDivider borderColor="#5FAAE1" />}
          spacing={8}
          align="stretch"
        >
          <Box>
            <Heading size="md">Change Bot Name</Heading>
            <HStack m={1}>
              <Input
                type="text"
                value={botName}
                onChange={(event) => setBotName(event.target.value)}
              />
              <Button onClick={() => handleNameChange()}>Submit</Button>
            </HStack>
          </Box>
          <Box>
            <Heading size="md">Change Bot Info</Heading>
            <HStack m={1}>
              <Input
                type="text"
                value={shortDesc}
                onChange={(event) => setShortDesc(event.target.value)}
              />
              <Button onClick={() => handleShortDescChange()}>Submit</Button>
            </HStack>
          </Box>
          <Box>
            <Heading size="md">Change Bot Description</Heading>
            <HStack m={1}>
              <Input
                type="text"
                value={desc}
                onChange={(event) => setDesc(event.target.value)}
              />
              <Button onClick={() => handleDescChange()}>Submit</Button>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
};

export default BotSettings;
