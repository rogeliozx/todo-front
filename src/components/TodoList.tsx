import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ModalInput from "./Modal";
import { TodoData } from "../types";
import { deleteTodo } from "../providers/TodoService";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 345,
  },
  center: {
    display: "flex",
    justifyContent: "space-between",
  },
});

interface TodoListProps {
  data: TodoData;
}

const TodoList: React.FC<TodoListProps> = ({ data }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const deleteTask = async () => {
    try {
      await deleteTodo(data._id);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.center}
          >
            TODO{" "}
            <RadioButtonCheckedIcon
              color={data.complete ? "success" : "error"}
            />
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => setOpen(true)}>
          Edit
        </Button>
        <ModalInput open={open} handleClose={handleClose} data={data} />
        <Button size="small" color="primary" onClick={deleteTask}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default TodoList;
