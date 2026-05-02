import useProjectContext from "@/hooks/useProjectContext";
import { DragDropProvider } from "@dnd-kit/react";
import { PlusIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import BoardHeader from "./BoardHeader";
import Column from "./Column";
import CreateTaskForm from "./CreateTaskForm";
import Modal from "./Modal";

function Board() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const isDragging = useRef(false);
  // const rafRef = useRef<number | null>(null);

  const { project, dispatch } = useProjectContext();

  const { boardId } = useParams();

  if (!boardId) {
    return; // todo: handle it better later
  }

  const board = project.boards.find((board) => board.boardId === boardId);

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
          isDragging.current = true;
        }}
        onDragEnd={(e) => {
          console.log("onDragEnd fired, isDragging:", isDragging.current);
          console.log("target:", e.operation.target?.data);

          if (!isDragging.current) return;

          isDragging.current = false;

          console.log("Drag end: ", e.operation);

          const taskId = e.operation.source?.id.toString();
          const sourceId = e.operation.source?.data.srcColumnId.toString();
          const targetId = e.operation.target?.data.targetId.toString();
          const targetColumnId =
            e.operation.target?.data.targetColumnId.toString();

          if (!taskId || !targetId || !sourceId) {
            return null;
          }

          // 👇 let dnd-kit finish its DOM cleanup before React re-renders
          // if (rafRef.current) cancelAnimationFrame(rafRef.current); // 👈 cancel previous
          dispatch({
            type: "move task",
            payload: {
              boardId,
              taskId,
              targetColumnId,
              targetId,
              sourceColumnId: sourceId,
            },
          });
        }}
      >
        <div className=" flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar pb-4">
          <div className="flex gap-5 min-w-max h-full px-1">
            {board?.columns?.map((column, colIndex) => {
              const taskStartIndex = board.columns
                .slice(0, colIndex)
                .reduce((sum, col) => sum + col.tasks.length, 0);

              return (
                <Column
                  key={column.columnId}
                  column={column}
                  boardId={board.boardId}
                  taskStartIndex={taskStartIndex}
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
          columnId={"empty"} //todo: update to use actual column Id
          boardId={board.boardId}
        />
      </Modal>
    </section>
  );
}

export default Board;
