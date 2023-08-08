import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
  Button,
} from "@chakra-ui/react";

interface Subscriber {
  id: number;
  firstname: string;
  lastname: string;
  city: string;
}
interface ManageUsersProps {
  sampleData: Subscriber[]; // Defining the prop type for sampleData
}

const ManageUsers = ({ sampleData }: ManageUsersProps) => {
  const handleDelete = (id: number) => {
    const updatedData = data.filter((user) => user.id !== id);
    setData(updatedData);
  };

  const [data, setData] = useState<Subscriber[]>(sampleData);

  return (
    <TableContainer>
      <Heading textAlign="center" textColor={"black"}>
        User Management
      </Heading>
      <Box margin={4} padding={4} borderColor={"black"} borderWidth={3}>
        <Table variant="striped" colorScheme="pink">
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
            {data.map((subscriber) => (
              <Tr key={subscriber.id}>
                <Td>{subscriber.id}</Td>
                <Td>{subscriber.firstname}</Td>
                <Td>{subscriber.lastname}</Td>
                <Td>{subscriber.city}</Td>
                <Td>
                  <Button
                    color="red"
                    onClick={() => handleDelete(subscriber.id)}
                  >
                    Delete User
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </TableContainer>
  );
};

export default ManageUsers;
