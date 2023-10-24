import "./App.css";
import React from "react";
import ParamInput from "./Components/ParamInput";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";


// A custom MUI theme based on Switch2Zero's brand colors
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#5da694",
      contrastText: "#f7f7f7",
    },
    secondary: {
      main: "#fca800",
      contrastText: "#616160",
    },
    text: {
      primary: "rgba(0,0,0,0.78)",
    },
    background: {
      paper: '#f7f7f7',
      default: '#ffffff',
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Typography variant="h3">Carbon Offset Calculator</Typography>
        <ParamInput />
      </ThemeProvider>
    </div>
  );
}

export default App;
