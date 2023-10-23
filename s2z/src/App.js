import "./App.css";
import React, { useState } from "react";
import ParamInput from "./Components/ParamInput";
import Graph from "./Components/Graph";
import { createTheme, Paper, ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

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
  const [data, setData] = useState([20, 50, 30, 70, 60, 90, 20]); // Placeholder data
  const width = 500;
  const height = 200;

  const updateData = (newData) => {
    setData(newData);
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <header className="App-header">
          <h2>Carbon Offset Simulator</h2>
        </header>
        <ParamInput updateData={updateData} />
        <Button
          color="secondary"
          startIcon={<AutoGraphIcon />}
          variant="contained"
          onClick={() => console.log("Generating graph")} // placeholder
        >
          <span>Generate Graph</span>
        </Button>
        <Paper elevation={3}>
          <Graph data={data} width={width} height={height} />
        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default App;