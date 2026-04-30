import useProjectContext from "@/hooks/useProjectContext";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BoardHeader from "./BoardHeader";
import Column from "./Column";
import CreateTaskForm from "./CreateTaskForm";
import Modal from "./Modal";

function Board() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const { project } = useProjectContext();

  const { boardId } = useParams();

  const board = project.boards.find((board) => board.boardId === boardId);

  return (
    <section className="flex-1 flex flex-col overflow-hidden px-10 py-6 space-y-5 min-h-0">
      <BoardHeader title={board.boardTitle} boardId={boardId} />
      <div className=" flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar pb-4">
        <div className="flex gap-5 min-w-max h-full px-1">
          {board?.columns?.map((column) => {
            return (
              <Column
                key={column.columnId}
                column={column}
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
