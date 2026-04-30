import { useProjectData } from "@/store";
import type { ColumnType } from "@/types";
import { EllipsisIcon, PlusIcon, Rocket } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CreateTaskForm from "./CreateTaskForm";
import Modal from "./Modal";
import Task from "./Task";

type ColumnPropsType = {
  column: ColumnType;
  boardId: string;
};

function Column({ column, boardId }: ColumnPropsType) {
  const [isOpen, setIsOpen] = useState(false);

  const [editColumnTitle, setEditColumnTitle] = useState(false);
  const [columnTitle, setColumnTitle] = useState(column.columnTitle);

  const inputRef = useRef(null);

  const { dispatch } = useProjectData();

  useEffect(() => {
    if (editColumnTitle) {
      inputRef.current.focus();
    }
  }, [editColumnTitle]);

  function handleTitleEdit(e) {
    if (e.key === "Enter") {
      dispatch({
        type: "rename column",
        payload: { boardId, columnId: column.columnId, columnTitle },
      });
      setEditColumnTitle(false);
    }
  }

  return (
    <div className="w-96 shrink-0 rounded-xl bg-surface-low flex flex-col p-4">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="truncate text-lg font-semibold">
            {editColumnTitle ? (
              <input
                type="text"
                ref={inputRef}
                name="boardTitle"
                className="py-1 px-4 text-xl bg-surface-low  rounded focus:border  w-full"
                value={columnTitle}
                onChange={(e) => setColumnTitle(e.target.value)}
                onKeyDown={handleTitleEdit}
              />
            ) : (
              columnTitle
            )}
          </span>

          <span className="shrink-0 bg-on-surface-variant/15 px-2 py-0.5 rounded-full">
            {column.tasks.length}
          </span>
        </div>

        <EllipsisIcon
          className="shrink-0 ml-2"
          onClick={() => setEditColumnTitle(true)}
        />
      </div>
      {column.tasks.length === 0 ? (
        <div className="flex-1 overflow-y-auto flex flex-col justify-center items-center border-2 rounded-xl border-dashed  border-on-surface-variant/10">
          <Rocket className=" w-16 h-16 fill-slate-400 text-slate-500 bg-on-surface-variant/10 p-4 rounded-2xl" />
          <p className=" text-on-surface-variant font-medium py-2">
            No active tasks
          </p>
          <p className=" text-primary font-semibold py-2">Move items here</p>
        </div>
      ) : (
        <div className="space-y-4 overflow-y-scroll custom-scrollbar pt-2 pb-4">
          {column.tasks.map((task) => (
            <Task key={task.taskId} task={task} />
          ))}
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
        <CreateTaskForm
          setOpen={setIsOpen}
          columnId={column.columnId}
          boardId={boardId}
        />
      </Modal>
    </div>
  );
}

export default Column;
