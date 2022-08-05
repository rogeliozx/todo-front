import axios from "axios";

const getTodo = async () => {
  try {
    const { data } = await axios.get(
      `https://test-hermosillo.herokuapp.com/todo-app/todo-items?userID=${localStorage.getItem(
        "token"
      )}`
    );
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const editTodo = async (
  TodoID: string,
  body: { text: string; complete: boolean }
) => {
  try {
    const { data } = await axios.put(
      `https://test-hermosillo.herokuapp.com/todo-app/update?todoID=${TodoID}`,
      { ...body }
    );
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteTodo = async (TodoID: string) => {
  try {
    const { data } = await axios.delete(
      `https://test-hermosillo.herokuapp.com/todo-app/delete?todoID=${TodoID}`
    );
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const createTodo = async (body: { text: string; complete: boolean }) => {
  try {
    const formData = { ...body, token: localStorage.getItem("token") };
    const { data } = await axios.post(`http://localhost:5000/todo-app/create`, {
      ...formData,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { getTodo, editTodo, deleteTodo, createTodo };
