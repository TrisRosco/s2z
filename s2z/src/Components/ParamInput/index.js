import React, { useState } from "react";
import "./styles.css";
import {
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Table,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import Graph from "../Graph";

function ParamInput() {
  const [lineCount, setLineCount] = useState(1);
  const [totalTrees, setTotalTrees] = useState(2);
  const [selectedCountry, setSelectedCountry] = useState(15.52);
  const [selectedFrequency, setSelectedFrequency] = useState(1);
  const [lines, setLines] = useState([
    { id: 1, monthYear: null, numTrees: "" },
  ]);

  const [data, setData] = useState([]);

  const processData = () => {
    const newData = [];
    let carbonFootprint = 0;
    lines.forEach((line) => {
      if (line.monthYear && line.numTrees) {
        const date = line.monthYear;
        const trees = (line.numTrees * 28.5).toFixed(2);
        carbonFootprint += parseFloat(trees);
        newData.push({ date, trees: carbonFootprint });
      }
    });
    setData(newData);
    handleTotalTrees();
  };

  const validateDate = (date) => {
    if (date === null) {
      return true;
    }
    if (selectedFrequency === 0) {
      return /^\d{2}\/\d{2}\/\d{2}$/.test(date);
    } else if (selectedFrequency === 1) {
      return /^\d{2}\/\d{2}$/.test(date);
    } else if (selectedFrequency === 2) {
      return /^\d{2}$/.test(date);
    }
  };

  const handleAddLine = () => {
    const newLineCount = lineCount + 1;
    setLineCount(newLineCount);
    setLines([...lines, { id: newLineCount, monthYear: null, numTrees: "" }]);
  };

  const handleDeleteLine = (id) => {
    const updatedLines = lines.filter((line) => line.id !== id);

    const updatedLinesWithIDs = updatedLines.map((line, index) => {
      return {
        ...line,
        id: index + 1,
      };
    });

    setLines(updatedLinesWithIDs);
  };

  const handleTotalTrees = () => {
    let total = 0;
    lines.forEach((line) => {
      if (line.numTrees) {
        total += parseInt(line.numTrees);
      }
    });
    setTotalTrees(total);
  };

  const handleLineChange = (id, key, value) => {
    const updatedLines = lines.map((line) =>
      line.id === id ? { ...line, [key]: value } : line
    );
    setLines(updatedLines);
  };

  const handleSelectCountry = (e) => {
    setSelectedCountry(e.target.value);
    console.log(e.target.value);
  };

  const handleSelectFrequency = (e) => {
    setSelectedFrequency(e.target.value);
    console.log(e.target.value);
  };

  const renderLines = () => {
    return lines.map((line) => (
      <div key={line.id}>
        <ListItem>
          <ListItemText primary={line.id} />
          <TextField
            error={!validateDate(line.monthYear)}
            id={`month-year-${line.id}`}
            label={
              selectedFrequency === 0
                ? "Date"
                : selectedFrequency === 1
                ? "Month/Year"
                : selectedFrequency === 2
                ? "Year"
                : ""
            }
            variant="filled"
            inputProps={
              selectedFrequency === 0
                ? { maxLength: 6 }
                : selectedFrequency === 1
                ? { maxLength: 4 }
                : selectedFrequency === 2
                ? { maxLength: 2 }
                : {}
            }
            value={line.monthYear}
            placeholder={
              selectedFrequency === 0
                ? "DD/MM/YY"
                : selectedFrequency === 1
                ? "MM/YY"
                : selectedFrequency === 2
                ? "YY"
                : ""
            }
            onBlur={(e) => {
              const input = e.target;
              let value = input.value;

              if (/^\d{4}$/.test(value)) {
                value = value.replace(/^(\d{2})(\d{2})$/, "$1/$2");
              }
              input.value = value;
              handleLineChange(line.id, "monthYear", value);
            }}
            onChange={(e) =>
              handleLineChange(line.id, "monthYear", e.target.value)
            }
          />
          <TextField
            id={`num-trees-${line.id}`}
            label="Number of Trees"
            variant="filled"
            inputProps={{ maxLength: 2 }}
            type="number"
            value={line.numTrees}
            onChange={(e) =>
              handleLineChange(line.id, "numTrees", e.target.value)
            }
          />
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteLine(line.id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
        {line.id !== lineCount && <Divider />}
      </div>
    ));
  };

  return (
    <>
      <Paper elevation={3}>
        <Paper elevation={3}>
          <FormControl variant="filled">
            <InputLabel>Country</InputLabel>
            <Select
              className="selector"
              label="Country"
              onChange={handleSelectCountry}
            >
              <MenuItem value={1552}>United States</MenuItem>
              <MenuItem value={555}>United Kingdom</MenuItem>
              <MenuItem value={944}>Germany</MenuItem>
              <MenuItem value={695}>South Africa</MenuItem>
              <MenuItem value={191}>India</MenuItem>
              <MenuItem value={738}>China</MenuItem>
              <MenuItem value={856}>Singapore</MenuItem>
              <MenuItem value={1710}>Australia</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled">
            <InputLabel>Frequency</InputLabel>
            <Select
              className="selector"
              label="Frequency"
              onChange={handleSelectFrequency}
              defaultValue={1}
              
            >
              {/* disabled weekly option for now */}
              {/* <MenuItem value={0}>Weekly</MenuItem> */}
              <MenuItem value={1}>Monthly</MenuItem>
              <MenuItem value={2}>Annually</MenuItem>
            </Select>
          </FormControl>
        </Paper>
        <Table>{renderLines()}</Table>
        <Button
          id="add-line-button"
          color="primary"
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={handleAddLine}
        >
          <span>Add line</span>
        </Button>
        <Button
          color="secondary"
          startIcon={<AutoGraphIcon />}
          variant="contained"
          onClick={processData}
        >
          <span>Update Graph</span>
        </Button>
      </Paper>
      <Typography variant="h4" className="subtitle">
        Your Carbon Offset Progress
      </Typography>
      <Paper elevation={3}>
        <Graph data={data} average={selectedCountry} />
      </Paper>
      <Typography variant="h4">Facts and Figures</Typography>
      <Paper elevation={3}>
        <Typography variant="body1" id="flavour-text">
          Total number of trees: <span id="emphasis"> {totalTrees} </span>
          <br />
        </Typography>
        <Typography variant="body1" id="flavour-text">
          It will take{" "}
          <span id="emphasis"> ${totalTrees * 120 + totalTrees * 12} </span> to
          offset your carbon footprint
          <br />
          Purchase costs at $120 per tree:{" "}
          <span id="emphasis"> ${totalTrees * 120} </span>
          <br />
          Maintenance costs at $12 per tree:{" "}
          <span id="emphasis"> ${totalTrees * 12} </span>
        </Typography>
        <Typography variant="body1" id="flavour-text">
          <br />
          Average person's carbon footprint for your country:{" "}
          <span id="emphasis"> {selectedCountry}</span>kgCO per year
          <br />
          It will take a total of
          <span id="emphasis"> {Math.ceil(selectedCountry / 28.5)} </span> trees
          to offset carbon emissions for one person
        </Typography>
      </Paper>
    </>
  );
}

export default ParamInput;
