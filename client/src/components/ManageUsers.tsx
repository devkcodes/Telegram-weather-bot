import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  TableContainer,
  Heading,
  Button,
  Container,
} from "@chakra-ui/react";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  city: string;
}

const ManageUsers = () => {
  //states
  const [users, setUsers] = useState<User[]>([]);
  const toast = useToast();
  useEffect(() => {
    fetchUsers();
  }, []);

  //fetch users
  const fetchUsers = async () => {
    try {
      console.log("Fetching users...");
      const response = await axios.get("http://localhost:3000/telegram/users");
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //delete users
  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/telegram/users/${id}`
      );
      console.log(response.data);
      toast({
        title: "User deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [handleDelete]);

  return (
    <>
      <Heading textAlign="center" textColor="black">
        Manage Users
      </Heading>
      <TableContainer margin={5}>
        <Container maxW="2xl">
          {/* <Box margin={4} padding={4} borderColor={"black"} borderWidth={3}> */}
          <Table
            backgroundColor="#2D3748"
            variant="striped"
            colorScheme="black"
          >
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>City</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.firstname}</Td>
                  <Td>{user.lastname}</Td>
                  <Td>{user.city}</Td>
                  <Td>
                    <Button
                      color="red"
                      colorScheme="white"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete User
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {/* </Box> */}
        </Container>
      </TableContainer>
    </>
  );
};

export default ManageUsers;
