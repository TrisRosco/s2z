import "./App.css";
import ParamInput from "./Components/ParamInput";
import Graph from "./Components/Graph";
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
  const data = [20, 50, 30, 70, 60, 90]; // Placeholder data
  const width = 400;
  const height = 200;

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <header className="App-header">
          <h2>Carbon Offset Simulator</h2>
          <ParamInput label="Miles Driven" type="number" value="0" />
          <Graph data={data} width={width} height={height} />
        </header>
      </ThemeProvider>
    </div>
  );
}

export default App;
