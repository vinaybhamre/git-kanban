import { useProjectData } from "@/store";
import type { ReactNode } from "react";
import { ProjectContext } from "./ProjectContext";

function ProjectContextProvider({ children }: { children: ReactNode }) {
  const { stateStore, dispatch } = useProjectData();
  return (
    <ProjectContext.Provider value={{ stateStore, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectContextProvider;
