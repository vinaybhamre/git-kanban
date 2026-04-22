import { EllipsisIcon, PlusIcon, Rocket } from "lucide-react";
import { useState } from "react";
import CreateTaskForm from "./CreateTaskForm";
import Modal from "./Modal";
import Task from "./Task";

function Column({ task }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-96 shrink-0 rounded-xl bg-surface-low flex flex-col p-4">
      <div className="flex justify-between">
        <p className="text-lg font-semibold pb-4 shrink-0">
          Column Title
          <span className="bg-on-surface-variant/15 ml-2 px-2 py-0.5 rounded-full">
            0
          </span>
        </p>
        <EllipsisIcon />
      </div>
      {!task ? (
        <div className="flex-1 overflow-y-auto flex flex-col justify-center items-center border-2 rounded-xl border-dashed  border-on-surface-variant/10">
          <Rocket className=" w-16 h-16 fill-slate-400 text-slate-500 bg-on-surface-variant/10 p-4 rounded-2xl" />
          <p className=" text-on-surface-variant font-medium py-2">
            No active tasks
          </p>
          <p className=" text-primary font-semibold py-2">Move items here</p>
        </div>
      ) : (
        <div className="space-y-4 overflow-y-scroll custom-scrollbar pt-2 pb-4">
          <Task />
          <Task />
          <div
            onClick={() => setIsOpen(true)}
            className="flex-1 overflow-y-auto flex gap-2 justify-center items-center border-2 rounded border-dashed  border-on-surface-variant/10 cursor-pointer"
          >
            <PlusIcon className=" w-4 h-4" />
            <p className=" text-on-surface-variant font-medium py-2">
              Add task
            </p>
          </div>
        </div>
      )}
      <Modal isOpen={isOpen} setOpen={() => setIsOpen(false)}>
        <CreateTaskForm setOpen={setIsOpen} />
      </Modal>
    </div>
  );
}

export default Column;
