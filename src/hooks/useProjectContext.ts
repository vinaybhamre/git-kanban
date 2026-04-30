import { ProjectContext } from "@/context/ProjectContext";
import { useContext } from "react";

// function useProjectContext() {
//   const context = useContext(ProjectContext);

//   if (!context) {
//     throw new Error("Must be used inside ProjectContextProvider");
//   }

//   return context;
// }

// export default useProjectContext;

function useProjectContext() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("Must be used inside ProjectContextPRovider");
  }

  return context;
}

export default useProjectContext;
