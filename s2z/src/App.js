import "./App.css";
import React, { useState } from "react";
import ParamInput from "./Components/ParamInput";
// import Graph from "./Components/Graph";
import { createTheme, ThemeProvider } from "@mui/material";


const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5da694",
      contrastText: "#f7f7f7",
    },
    secondary: {
      main: "#fca800",
      contrastText: "#616160",
    },
    background: {
      default: "#f7f7f7",
    },
  },
});

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <header className="App-header">
          <h2>Carbon Offset Simulator</h2>
        </header>
        <ParamInput />
      </ThemeProvider>
    </div>
  );
}

export default App;
