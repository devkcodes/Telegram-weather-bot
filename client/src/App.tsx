import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import AppHeader from "./components/AppHeader";
import CardMenu from "./components/CardMenu";
import ManageUsers from "./components/ManageUsers";
import { useEffect, useState } from "react";
import Login from "./components/Login";

const sampleData = [
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    city: "New York",
  },
];

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  console.log(authenticated);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    console.log("Logged in");
    setAuthenticated(true);
    localStorage.setItem("authenticated", "true");
  };

  // Function to handle logout
  const handleLogoutClick = () => {
    setAuthenticated(false);
    localStorage.removeItem("authenticated");
  };

  useEffect(() => {
    const storedAuthenticated = localStorage.getItem("authenticated");
    if (storedAuthenticated === "true") {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  return (
    <ChakraProvider>
      {authenticated ? (
        <>
          <Grid
            templateAreas={{
              base: `"nav" "main"`,
            }}
          >
            <GridItem area="nav">
              <AppHeader onLogout={handleLogoutClick} />
            </GridItem>
            <GridItem area="main">
              <Routes>
                <Route path="/" element={<CardMenu />}></Route>
                <Route
                  path="manage-users"
                  element={<ManageUsers sampleData={sampleData} />}
                ></Route>
              </Routes>
            </GridItem>
          </Grid>
        </>
      ) : (
        <Login onLoginSuccess={() => handleLoginSuccess()} />
      )}
    </ChakraProvider>
  );
}

export default App;
