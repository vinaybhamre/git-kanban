import useProjectContext from "@/hooks/useProjectContext";
import { DragDropProvider } from "@dnd-kit/react";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BoardHeader from "./BoardHeader";
import Column from "./Column";
import CreateTaskForm from "./CreateTaskForm";
import Modal from "./Modal";

function Board() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const { stateStore, dispatch } = useProjectContext();

  const { boardId } = useParams();

  if (!boardId) {
    return; // todo: handle it better later
  }

  const { boards } = stateStore;

  const board = boards[boardId];

  if (!board) {
    return <p className="flex justify-center text-4xl font-bold">No board</p>; // todo: implement complete jsx here
  }

  return (
    <section className="flex-1 flex flex-col overflow-hidden px-10 py-6 space-y-5 min-h-0">
      <BoardHeader
        key={board.boardId}
        title={board.boardTitle}
        boardId={boardId}
      />
      <DragDropProvider
        onDragStart={() => {
          console.log("Drag begin");
        }}
        onDragOver={(e) => {
          const taskId = e.operation.source?.id?.toString();
          const sourceColumnId =
            e.operation.source?.data?.srcColumnId?.toString();
          const targetColumnId =
            e.operation.target?.data?.targetColumnId?.toString();

          if (!taskId || !sourceColumnId || !targetColumnId) return;

          // ignore same column
          if (sourceColumnId === targetColumnId) return;

          dispatch({
            type: "move task",
            payload: {
              boardId,
              taskId,
              sourceColumnId,
              targetColumnId,
              targetIndex: 0, // temporary insert at top
            },
          });
        }}
        onDragEnd={(e) => {
          if (e.operation.canceled) return;

          const taskId = e.operation.source?.id?.toString();
          const sourceColumnId =
            e.operation.source?.data?.srcColumnId?.toString();

          const targetId = e.operation.target?.id?.toString();
          const targetColumnId =
            e.operation.target?.data?.targetColumnId?.toString();

          if (!taskId || !sourceColumnId || !targetColumnId) return;

          const column = stateStore.columns[targetColumnId];
          if (!column) return;

          const index = column.taskIds.indexOf(targetId);
          const targetIndex = index === -1 ? column.taskIds.length : index;

          dispatch({
            type: "move task",
            payload: {
              boardId,
              taskId,
              sourceColumnId,
              targetColumnId,
              targetIndex,
            },
          });
        }}
      >
        <div className=" flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar pb-4">
          <div className="flex gap-5 min-w-max h-full px-1">
            {board.columnIds?.map((columnId) => {
              return (
                <Column
                  key={columnId}
                  columnId={columnId}
                  boardId={board.boardId}
                />
              );
            })}
          </div>
          <div
            onClick={() => setIsTaskModalOpen(true)}
            className="absolute bottom-8 right-8 cursor-pointer"
          >
            <PlusIcon className=" w-16 h-16 text-surface bg-primary-container p-4 rounded-2xl" />
          </div>
        </div>
      </DragDropProvider>
      <Modal isOpen={isTaskModalOpen} setOpen={() => setIsTaskModalOpen(false)}>
        <CreateTaskForm
          setOpen={setIsTaskModalOpen}
          columnId={""}
          boardId={board.boardId}
        />
      </Modal>
    </section>
  );
}

export default Board;
