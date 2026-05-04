export type TaskType = {
  taskId: string;
  taskTitle: string;
  description: string;
};

export type ColumnType = {
  columnId: string;
  columnTitle: string;
  taskIds: string[];
};

export type BoardType = {
  boardId: string;
  boardTitle: string;
  columnIds: string[];
};

export type ProjectType = {
  projectId: string;
  projectTitle: string;
  projectSubtitle: string;
  boardIds: string[];
};

export type ProjectsType = {
  projects: Record<string, ProjectType>;
  boards: Record<string, BoardType>;
  columns: Record<string, ColumnType>;
  tasks: Record<string, TaskType>;
};

export type ProjectAction =
  | { type: "create board"; payload: { boardTitle: string } }
  | {
      type: "create column";
      payload: {
        boardId: string;
        columnTitle: string;
      };
    }
  | {
      type: "create task";
      payload: { boardId: string; columnId: string; task: TaskType };
    }
  | {
      type: "rename board";
      payload: { boardId: string; updatedBoardTitle: string };
    }
  | {
      type: "rename column";
      payload: { boardId: string; columnId: string; columnTitle: string };
    }
  | {
      type: "move task";
      payload: {
        boardId: string;
        taskId: string;
        sourceColumnId: string;
        targetColumnId: string;
        targetIndex: number;
      };
    };
