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
  const [lines, setLines] = useState([
    { id: 1, monthYear: null, numTrees: "" },
  ]);

  const [data, setData] = useState([]);

  // Maths
  // On average, a fully grown tree can absorb approximately 48 pounds (21.77 kilograms) of CO2 per year. However, this number can vary significantly.
  // for each tree in the data, multiply the number of trees by 48 to get the amount of CO2 absorbed per year

  // 1 tree = 21.77 kilograms of CO2 per year
  // 21.77 / 12 = 1.814
  // 1 tree = 1.814 kilograms of CO2 per month
  // 1.814 / 30 = 0.06046
  // 1 tree = 0.06046 kilograms of CO2 per day
  // 0.06046 * 7 = 0.42322
  // 1 tree = 0.42322 kilograms of CO2 per week

  const processData = () => {
    const newData = [];
    lines.forEach((line) => {
      if (line.monthYear && line.numTrees) {
        const date = line.monthYear;
        const trees = (line.numTrees * 1.814).toFixed(2);
        newData.push({ date, trees });
        console.log(date, trees);
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
            <Select className="selector" label="Country">
              <MenuItem value={15.52}>United States</MenuItem>
              <MenuItem value={5.55}>United Kingdom</MenuItem>
              <MenuItem value={9.44}>Germany</MenuItem>
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
          variant="contained"
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
      <Graph data={data} />{" "}
      <Paper elevation={3} className="flavour-text-container">
        <Typography variant="p" id="flavour-text">
          Total number of trees: <span id="emphasis"> {totalTrees} </span>
          <br />
        </Typography>
        <Typography variant="p" id="flavour-text">
          It will take <span id="emphasis"> ${totalTrees * 120} </span> to
          offset your carbon footprint
        </Typography>
      </Paper>
    </>
  );
}

export default ParamInput;
