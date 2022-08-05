import { Button, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import TodoList from "../../components/TodoList";
import { getTodo } from "../../providers/TodoService";
import { TodoData } from "../../types";
import ModalAdd from "../../components/ModalAdd";

const useStyles = makeStyles({
  center: {
    display: "flex !important",
    maxWidth: "22rem",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    marginTop: "2rem",
  },
});

const Todo = () => {
  const classes = useStyles();
  const [Items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    (async () => {
      try {
        const data = await getTodo();
        setItems(data);
      } catch (error) {}
    })();
  }, []);

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={4}
      >
        {Items.length ? (
          Items.map((data: TodoData) => (
            <Grid item xs={12} key={data._id}>
              <TodoList data={data} />
            </Grid>
          ))
        ) : (
          <CircularProgress />
        )}
      </Grid>

      <Grid className={classes.center}>
        <Button
          size="small"
          fullWidth
          color="primary"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Add
        </Button>
      </Grid>
      <ModalAdd open={open} handleClose={handleClose}></ModalAdd>
    </Container>
  );
};

export default Todo;
