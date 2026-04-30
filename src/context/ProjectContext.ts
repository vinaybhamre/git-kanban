import type { ProjectAction, ProjectType } from "@/types";
import { createContext, type Dispatch } from "react";

type ProjectContextType = {
  project: ProjectType;
  dispatch: Dispatch<ProjectAction>;
};

export const ProjectContext = createContext<ProjectContextType | null>(null);
