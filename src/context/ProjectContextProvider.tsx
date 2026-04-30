import { useProjectData } from "@/store";
import type { ReactNode } from "react";
import { ProjectContext } from "./ProjectContext";

function ProjectContextProvider({ children }: { children: ReactNode }) {
  const { project, dispatch } = useProjectData();
  return (
    <ProjectContext.Provider value={{ project, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectContextProvider;
