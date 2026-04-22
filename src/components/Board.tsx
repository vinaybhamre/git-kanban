import { PlusIcon } from "lucide-react";
import { useState } from "react";
import BoardHeader from "./BoardHeader";
import Column from "./Column";
import CreateTaskForm from "./CreateTaskForm";
import Modal from "./Modal";

function Board() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="flex-1 flex flex-col overflow-hidden px-10 py-6 space-y-5 min-h-0">
      <BoardHeader />
      <div className=" flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar pb-4">
        <div className="flex gap-5 min-w-max h-full px-1">
          <Column task={true} />
          <Column task={false} />
        </div>
        <div
          onClick={() => setIsOpen(true)}
          className="absolute bottom-8 right-8 cursor-pointer"
        >
          <PlusIcon className=" w-16 h-16 text-surface bg-primary-container p-4 rounded-2xl" />
        </div>
      </div>
      <Modal isOpen={isOpen} setOpen={() => setIsOpen(false)}>
        <CreateTaskForm setOpen={setIsOpen} />
      </Modal>
    </section>
  );
}

export default Board;
