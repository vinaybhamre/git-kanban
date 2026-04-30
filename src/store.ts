import { customAlphabet } from "nanoid";
import { useReducer } from "react";
import type { ProjectAction, ProjectType } from "./types";

const initialState: ProjectType = {
  projectId: "1",
  projectTitle: "Architect Pro New",
  projectSubtitle: "v4 architecture",
  boards: [
    {
      boardId: "1",
      boardTitle: "Board One",
      columns: [
        {
          columnId: "1",
          columnTitle: "Column One",
          tasks: [
            {
              taskId: "1",
              taskTitle: "Task Title one",
              description: "",
            },
          ],
        },
      ],
    },
  ],
};

const generateId = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  12,
);

function projectReducer(
  state: ProjectType,
  action: ProjectAction,
): ProjectType {
  switch (action.type) {
    case "create board":
      return {
        ...state,
        boards: [
          ...state.boards,
          {
            boardId: generateId(),
            boardTitle: action.payload.boardTitle,
            columns: [
              { columnId: generateId(), columnTitle: "New column", tasks: [] },
            ],
          },
        ],
      };
    case "rename board": {
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.boardId === action.payload.boardId) {
            return { ...board, boardTitle: action.payload.updatedBoardTitle };
          } else {
            return board;
          }
        }),
      };
    }
    case "create column": {
      const boardsAfterColumn = state.boards.map((board) => {
        if (board.boardId === action.payload.boardId) {
          return {
            ...board,
            columns: [
              ...board.columns,
              {
                columnId: generateId(),
                columnTitle: action.payload.columnTitle,
                tasks: [],
              },
            ],
          };
        } else {
          return board;
        }
      });

      return { ...state, boards: boardsAfterColumn };
    }
    case "rename column": {
      const boardsAfterColumnRename = state.boards.map((board) => {
        if (board.boardId === action.payload.boardId) {
          return {
            ...board,
            columns: board.columns.map((column) => {
              if (column.columnId === action.payload.columnId) {
                return { ...column, columnTitle: action.payload.columnTitle };
              } else {
                return column;
              }
            }),
          };
        } else {
          return board;
        }
      });

      return { ...state, boards: boardsAfterColumnRename };
    }

    case "create task": {
      const boardToAdd = state.boards.map((board) => {
        if (board.boardId === action.payload.boardId) {
          const columnToAdd = board.columns.map((column) => {
            if (column.columnId === action.payload.columnId) {
              return {
                ...column,
                tasks: [
                  ...column.tasks,
                  {
                    taskId: action.payload.task.taskId,
                    taskTitle: action.payload.task.taskTitle,
                    description: action.payload.task?.description,
                  },
                ],
              };
            } else {
              return column;
            }
          });
          return { ...board, columns: columnToAdd };
        } else {
          return board;
        }
      });

      return { ...state, boards: boardToAdd };
    }
    default:
      return state;
  }
}

export function useProjectData() {
  const [project, dispatch] = useReducer(projectReducer, initialState);

  return { project, dispatch };
}
