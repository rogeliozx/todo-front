import {
  Box,
  Modal,
  TextField,
  Switch,
  FormControlLabel,
  FormControl,
  Button,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { createTodo } from "../providers/TodoService";
import { useState } from "react";

interface ModelProps {
  open: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  center: {
    display: "flex !important",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
const ModalAdd: React.FC<ModelProps> = ({ open, handleClose }) => {
  const classes = useStyles();
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [todoData, setTodoData] = useState({
    complete: false,
    text: "",
  });
  const handleChange = (e: any) => {
    if (e.target.value !== "") {
      setTodoData((prevstate) => ({
        ...prevstate,
        text: e.target.value,
      }));
    }
  };
  const switchHandler = (event: any) => {
    setTodoData((prevstate) => ({
      ...prevstate,
      complete: event.target.checked,
    }));
  };
  const createTask = async () => {
    try {
      await createTodo(todoData);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <FormControl
          className={classes.center}
          component="fieldset"
          variant="standard"
        >
          <TextField
            onChange={handleChange}
            id="outlined-basic"
            label="Description"
            variant="outlined"
          />
          <FormControlLabel
            value="start"
            control={
              <Switch
                onChange={switchHandler}
                color="info"
              />
            }
            label="completed"
            labelPlacement="start"
          />
          <Button size="small" color="primary" onClick={createTask}>
            Add
          </Button>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default ModalAdd;
