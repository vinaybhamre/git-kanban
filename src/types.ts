export type TaskType = {
  taskId: string;
  taskTitle: string;
  description: string;
};

export type ColumnType = {
  columnId: string;
  columnTitle: string;
  tasks: TaskType[];
};

export type BoardType = {
  boardId: string;
  boardTitle: string;
  columns: ColumnType[];
};

export type ProjectType = {
  projectId: string;
  projectTitle: string;
  projectSubtitle: string;
  boards: BoardType[];
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
    };
