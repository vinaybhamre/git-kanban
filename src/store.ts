import { customAlphabet } from "nanoid";
import { useReducer } from "react";
import type { ColumnType, ProjectAction, ProjectType, TaskType } from "./types";

const initialState: ProjectType = {
  projectId: "1",
  projectTitle: "Architect Pro New",
  projectSubtitle: "v4 architecture",
  boards: [
    {
      boardId: "board1",
      boardTitle: "Board One",
      columns: [
        {
          columnId: "column1",
          columnTitle: "Column One",
          tasks: [
            {
              taskId: "task1",
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
  8,
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
                columnId: `column-${generateId()}`,
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
    case "move task": {
      let newBoards = [];

      if (action.payload.sourceColumnId === action.payload.targetColumnId) {
        const boards = state.boards.map((board) => {
          if (board.boardId !== action.payload.boardId) return board;
          return {
            ...board,
            columns: board.columns.map((column) => {
              if (column.columnId !== action.payload.targetColumnId)
                return column;

              const srcTask = column.tasks.find(
                (task) => task.taskId === action.payload.taskId,
              );

              if (!srcTask) {
                return column;
              }

              const filteredTasks = column.tasks.filter(
                (task) => task.taskId !== action.payload.taskId,
              );

              if (action.payload.targetId === action.payload.targetColumnId) {
                return { ...column, tasks: [...filteredTasks, srcTask] };
              }

              const targetIndex = filteredTasks.findIndex(
                (task) => task.taskId === action.payload.targetId,
              );
              if (targetIndex === -1)
                return { ...column, tasks: [...filteredTasks, srcTask] };

              const tasks = filteredTasks.slice();

              tasks.splice(targetIndex, 0, srcTask);

              return { ...column, tasks };
            }),
          };
        });
        newBoards = [...boards];
      } else {
        const boards = state.boards.map((board) => {
          if (board.boardId === action.payload.boardId) {
            const srcColumn = board.columns.find(
              (column: ColumnType) =>
                column.columnId === action.payload.sourceColumnId,
            );

            if (!srcColumn || !action.payload.targetColumnId) {
              return board;
            }

            const targetColumn = board.columns.find(
              (column: ColumnType) =>
                column.columnId === action.payload.targetColumnId,
            );

            if (!targetColumn) {
              return board;
            }

            const srcTask = srcColumn.tasks.find(
              (task: TaskType) => task.taskId === action.payload.taskId,
            );

            if (!srcTask) {
              return board;
            }

            // above process same in both scenario

            const columnWithTask = board.columns.map((column: ColumnType) => {
              if (column.columnId === action.payload.targetColumnId) {
                const droppedOnColumn =
                  action.payload.targetId === action.payload.targetColumnId;

                if (droppedOnColumn) {
                  return {
                    ...column,
                    tasks: [...column.tasks, srcTask],
                  };
                }

                const taskIndex = column.tasks.findIndex(
                  (task) => task.taskId === action.payload.targetId,
                );

                if (taskIndex === -1) {
                  return {
                    ...column,
                    tasks: [...column.tasks, srcTask],
                  };
                }

                const tasks = column.tasks.slice();

                tasks.splice(taskIndex, 0, srcTask);

                return { ...column, tasks };
              }

              return column;
            });

            const columnWithoutTask = columnWithTask.map(
              (column: ColumnType) => {
                if (column.columnId === action.payload.sourceColumnId) {
                  const tasksWithout = column.tasks.filter(
                    (task: TaskType) => task.taskId !== action.payload.taskId,
                  );

                  return { ...column, tasks: tasksWithout };
                } else {
                  return column;
                }
              },
            );

            return { ...board, columns: columnWithoutTask };
          } else {
            return board;
          }
        });
        newBoards = [...boards];
      }

      return { ...state, boards: newBoards };
    }
    default:
      return state;
  }
}

export function useProjectData() {
  const [project, dispatch] = useReducer(projectReducer, initialState);

  return { project, dispatch };
}
