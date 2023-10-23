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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function ParamInput() {
  const [lineCount, setLineCount] = useState(1);

  const handleAddLine = () => {
    setLineCount((prevCount) => prevCount + 1);
  };

  const renderLines = () => {
    const lines = [];
    for (let i = 1; i <= lineCount; i++) {
      lines.push(
        <div key={i}>
          <ListItem>
            <ListItemText primary={i} />
            <TextField
              id={`month-year-${i}`}
              label="Month & Year"
              variant="standard"
            />
            <TextField
              id={`num-trees-${i}`}
              label="Number of Trees"
              variant="standard"
            />
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItem>
          {i !== lineCount && <Divider />}
        </div>
      );
    }
    return lines;
  };

  return (
    <Paper elevation={5} className="param-input">
      <Paper elevation={3} className="param-input-header">
        <FormControl>
          <InputLabel>Country</InputLabel>
          <Select className="selector" label="Country">
            <MenuItem value={15.52}>United States</MenuItem>
            <MenuItem value={5.55}>United Kingdom</MenuItem>
            <MenuItem value={9.44}>Germany</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Frequency</InputLabel>
          <Select className="selector" label="Frequency">
            <MenuItem value={0}>Weekly</MenuItem>
            <MenuItem value={0}>Monthly</MenuItem>
            <MenuItem value={0}>Annually</MenuItem>
          </Select>
        </FormControl>
      </Paper>
      <div className="param-input-grid">
        <Table>{renderLines()}</Table>
        <Button
          color="secondary"
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleAddLine}
        >
          <span>Add line</span>
        </Button>
      </div>
    </Paper>
  );
}

export default ParamInput;
