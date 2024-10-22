import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@mantine/core";
import { MantineProvider } from "@mantine/core";
import Home from "./pages/home";
import "./index.css";

const paths = [
  {
    path: "/",
    element: <Home />,
  },
];

const BrowserRouter = createBrowserRouter(paths);

const App = () => {
  return (
    <MantineProvider>
      <RouterProvider router={BrowserRouter} />
    </MantineProvider>
  );
};

export default App;
