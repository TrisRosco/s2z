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
  const [totalTrees, setTotalTrees] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(15.52);
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

  // valid date mm/yy
  const validateDate = (date) => {
    const dateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
    return dateRegex.test(date);
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

  const renderLines = () => {
    return lines.map((line) => (
      <div key={line.id}>
        <ListItem>
          <ListItemText primary={line.id} />
          <TextField
            error={!validateDate(line.monthYear)}
            id={`month-year-${line.id}`}
            label="Month & Year"
            variant="filled"
            inputProps={{ maxLength: 4 }}
            value={line.monthYear}
            placeholder="MM/YY"
            onBlur={(e) => {
              const input = e.target;
              let value = input.value;

              if (/^\d{4}$/.test(value)) {
                value = value.replace(/(\d{2})(\d{2})/, "$1/$2");
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
      <Paper elevation={3} className="param-input">
        <Paper elevation={3} className="param-input-header">
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
            <Select className="selector" label="Frequency">
              <MenuItem value={0}>Weekly</MenuItem>
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
      <Paper elevation={3} className="graph-container">
        <Typography variant="h5" id="graph-title">
          Your Carbon Footprint
        </Typography>
        <Graph data={data} average={selectedCountry} />{" "}
      </Paper>
      <Paper elevation={3} className="flavour-text-container">
        <Typography variant="p" id="flavour-text">
          Total number of trees: <span id="emphasis"> {totalTrees} </span>
          <br />
        </Typography>
        <Typography variant="p" id="flavour-text">
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
      </Paper>
    </>
  );
}

export default ParamInput;
