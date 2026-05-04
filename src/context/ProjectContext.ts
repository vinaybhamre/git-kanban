import type { ProjectAction, ProjectsType } from "@/types";
import { createContext, type Dispatch } from "react";

type ProjectContextType = {
  stateStore: ProjectsType;
  dispatch: Dispatch<ProjectAction>;
};

export const ProjectContext = createContext<ProjectContextType | null>(null);
