import "./App.css";
import React, { useState } from "react";
import ParamInput from "./Components/ParamInput";
// import Graph from "./Components/Graph";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
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
  const [data, setData] = useState([
    { date: "05/2021", trees: 400 },
    { date: "06/2021", trees: 500 },
    { date: "07/2021", trees: 300 },
    { date: "08/2021", trees: 600 },
  ]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <header className="App-header">
          <h2>Carbon Offset Simulator</h2>
        </header>
        <ParamInput />
        <Button
          color="secondary"
          startIcon={<AutoGraphIcon />}
          variant="contained"
          onClick={() => console.log("Generating graph")} //
        >
          <span>Generate Graph</span>
        </Button>
        <Paper elevation={3}>
          <LineChart width={400} height={400} data={data}>
            <Line type="monotone" dataKey="trees" stroke="#8884d8" />
            <XAxis dataKey="date" />
            <YAxis />
          </LineChart>
          {/* <Graph data={data} width={width} height={height} /> */}
        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default App;
