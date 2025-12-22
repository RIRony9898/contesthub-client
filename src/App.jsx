import { RouterProvider } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./context/UseContext";
import { Route } from "./routes/Route";

function App() {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={Route}></RouterProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
