import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import { isLogin } from "./providers/AuthService";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Todo from "./screens/Todo";
const App = () => {
  const routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/todo", element:isLogin()? <Todo />: <Login />},
  ]);
  return routes;
};
const AppWrapper = () => {
  return (
      <Router>
        <App />
      </Router>
  );
};
export default AppWrapper;
