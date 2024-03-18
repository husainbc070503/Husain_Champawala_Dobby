import React from "react";
import { createTheme } from "@mui/material";
import { indigo, orange } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Authentication from "./pages/Authentication";
import { AppContext } from "./context/AppContext";
import Index from "./pages/Index";
import Profile from "./pages/Profile";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: orange,
      secondary: indigo,
    },
    typography: {
      fontFamily: "Modern Antiqua",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppContext>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} index />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/myProfile" element={<Profile />} />
          </Routes>
        </AppContext>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
