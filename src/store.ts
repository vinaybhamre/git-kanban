import { customAlphabet } from "nanoid";
import { useEffect, useReducer } from "react";
import type { ProjectAction, ProjectsType } from "./types";

const generateId = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  8,
);

const initialState: ProjectsType = {
  projects: {
    project1: {
      projectId: "project1",
      projectTitle: "Architect Pro New",
      projectSubtitle: "v4 architecture",
      boardIds: ["board1"],
    },
  },

  boards: {
    board1: {
      boardId: "board1",
      boardTitle: "Board One",
      columnIds: ["column1"],
    },
  },

  columns: {
    column1: {
      columnId: "column1",
      columnTitle: "Column One",
      taskIds: ["task1"],
    },
  },

  tasks: {
    task1: {
      taskId: "task1",
      taskTitle: "First Task Title",
      description: "",
    },
  },
};

function projectReducer(
  state: ProjectsType,
  action: ProjectAction,
): ProjectsType {
  switch (action.type) {
    case "create board": {
      const genColumnId = generateId();
      const genBoardId = generateId();

      const newColumn = {
        columnId: genColumnId,
        columnTitle: "Column One",
        taskIds: [],
      };

      const newBoard = {
        boardId: genBoardId,
        boardTitle: action.payload.boardTitle,
        columnIds: [genColumnId],
      };

      const project = state.projects["project1"];
      if (!project) {
        return state;
      }

      const updatedProject = {
        ...project,
        boardIds: [...project.boardIds, genBoardId],
      };

      const columns = { ...state.columns, [genColumnId]: newColumn };
      const boards = { ...state.boards, [genBoardId]: newBoard };
      const projects = {
        ...state.projects,
        ["project1"]: updatedProject,
      };

      return { ...state, projects, boards, columns };
    }

    case "rename board": {
      const payloadBoardId = action.payload.boardId;
      const board = state.boards[payloadBoardId];

      if (!board) {
        return state;
      }

      const newBoard = {
        ...board,
        boardTitle: action.payload.updatedBoardTitle,
      };

      return {
        ...state,
        boards: { ...state.boards, [payloadBoardId]: newBoard },
      };
    }

    case "create column": {
      const genColumnId = generateId();
      const payloadBoardId = action.payload.boardId;

      const newColumn = {
        columnId: genColumnId,
        columnTitle: action.payload.columnTitle,
        taskIds: [],
      };

      const columns = { ...state.columns, [genColumnId]: newColumn };

      const board = state.boards[payloadBoardId];

      if (!board) {
        return state;
      }

      const newBoard = {
        ...board,
        columnIds: [...board.columnIds, genColumnId],
      };

      const boards = { ...state.boards, [payloadBoardId]: newBoard };

      return { ...state, boards, columns };
    }

    case "rename column": {
      const payloadColId = action.payload.columnId;

      const column = state.columns[payloadColId];
      if (!column) {
        return state;
      }

      const newColumn = { ...column, columnTitle: action.payload.columnTitle };

      const columns = { ...state.columns, [payloadColId]: newColumn };

      return { ...state, columns };
    }

    case "create task": {
      const payloadColId = action.payload.columnId;
      const payloadTaskId = action.payload.task.taskId;

      const newTask = action.payload.task;

      const column = state.columns[payloadColId];
      if (!column) {
        return state;
      }

      const newColumn = {
        ...column,
        taskIds: [...column.taskIds, payloadTaskId],
      };

      const tasks = { ...state.tasks, [payloadTaskId]: newTask };
      const columns = { ...state.columns, [payloadColId]: newColumn };

      return { ...state, columns, tasks };
    }

    case "move task": {
      const { taskId, sourceColumnId, targetColumnId, targetIndex } =
        action.payload;

      const sourceColumn = state.columns[sourceColumnId];
      const targetColumn = state.columns[targetColumnId];

      if (!sourceColumn || !targetColumn) return state;

      //* avoid duplicate drop during dragOver spam
      if (
        sourceColumnId === targetColumnId &&
        sourceColumn.taskIds[targetIndex] === taskId
      ) {
        return state;
      }

      //* drop in same column
      if (sourceColumnId === targetColumnId) {
        const taskIds = [...sourceColumn.taskIds];

        const oldIndex = taskIds.indexOf(taskId);
        if (oldIndex === -1) return state;

        taskIds.splice(oldIndex, 1);
        taskIds.splice(targetIndex, 0, taskId);

        return {
          ...state,
          columns: {
            ...state.columns,
            [sourceColumnId]: {
              ...sourceColumn,
              taskIds,
            },
          },
        };
      }

      //* different column drop
      const newSource = sourceColumn.taskIds.filter((id) => id !== taskId);

      const newTarget = [...targetColumn.taskIds];

      //* prevent duplicate if already inserted by onDragOver
      if (!newTarget.includes(taskId)) {
        newTarget.splice(targetIndex, 0, taskId);
      }

      return {
        ...state,
        columns: {
          ...state.columns,
          [sourceColumnId]: {
            ...sourceColumn,
            taskIds: newSource,
          },
          [targetColumnId]: {
            ...targetColumn,
            taskIds: newTarget,
          },
        },
      };
    }

    default:
      return state;
  }
}

export function useProjectData() {
  const savedState = localStorage.getItem("git-kanban");

  const [stateStore, dispatch] = useReducer(
    projectReducer,
    savedState ? JSON.parse(savedState) : initialState,
  );

  useEffect(() => {
    localStorage.setItem("git-kanban", JSON.stringify(stateStore));
  }, [stateStore]);

  return { stateStore, dispatch };
}
