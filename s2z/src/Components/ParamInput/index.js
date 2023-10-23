import React from "react";
import "./styles.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";


function ParamInput() {
  return (
    <Paper elevation={5} className="param-input">
      <Paper elevation={3} className="param-input-header">
        <FormControl>
          <InputLabel>Country</InputLabel>
          <Select id="country-select" label="Country">
            <MenuItem value={15.52}>United States</MenuItem>
            <MenuItem value={5.55}>United Kingdom</MenuItem>
            <MenuItem value={9.44}>Germany</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Frequency</InputLabel>
          <Select id="country-select" label="Country">
            <MenuItem value={0}>Weeky</MenuItem>
            <MenuItem value={0}>Monthly</MenuItem>
            <MenuItem value={0}>Anually</MenuItem>
          </Select>
        </FormControl>
      </Paper>
      <div className="param-input-grid">
        <List>
          <ListItem>
            <ListItemText primary="1" />
            <TextField
              id="standard-basic"
              label="Month & Year"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Number of Trees"
              variant="standard"
            />
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItem>
          <Divider />
        </List>
      </div>
    </Paper>
  );
}

export default ParamInput;
