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
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function ParamInput() {
  const [lineCount, setLineCount] = useState(1);
  const [lines, setLines] = useState([{ id: 1, monthYear: "", numTrees: "" }]);

  const handleAddLine = () => {
    const newLineCount = lineCount + 1;
    setLineCount(newLineCount);
    setLines([...lines, { id: newLineCount, monthYear: "", numTrees: "" }]);
  };

  const handleDeleteLine = (id) => {
    const updatedLines = lines.filter((line) => line.id !== id);
    setLines(updatedLines);
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label="Month & Year"
              format="MM-YYYY"
              variant="standard"
            />
          </LocalizationProvider>
          <TextField
            id={`num-trees-${line.id}`}
            label="Number of Trees"
            variant="standard"
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
    <Paper elevation={10} className="param-input">
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
            <MenuItem value={0}>Monthly</MenuItem>
            <MenuItem value={0}>Annually</MenuItem>
          </Select>
        </FormControl>
      </Paper>
      <Table>{renderLines()}</Table>
      <Stack className="param-input-buttons">
        <Button
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
          onClick={console.log("Generate Graph")}
        >
          <span>Generate Graph</span>
        </Button>
      </Stack>
    </Paper>
  );
}

export default ParamInput;
