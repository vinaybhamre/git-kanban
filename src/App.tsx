import { Route, Routes } from "react-router-dom";
import Board from "./components/Board";
import ProjectContextProvider from "./context/ProjectContextProvider";
import BoardLayout from "./layouts/BoardLayout";

function App() {
  return (
    <ProjectContextProvider>
      <Routes>
        <Route element={<BoardLayout />}>
          <Route path="/:projectId/:boardId" element={<Board />} />
        </Route>
      </Routes>
    </ProjectContextProvider>
  );
}

export default App;
