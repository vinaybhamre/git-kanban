import useProjectContext from "@/hooks/useProjectContext";
import { useDroppable } from "@dnd-kit/react";
import { EllipsisIcon, PlusIcon, Rocket } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CreateTaskForm from "./CreateTaskForm";
import Modal from "./Modal";
import Task from "./Task";

type ColumnPropsType = {
  columnId: string;
  boardId: string;
};

function Column({ columnId, boardId }: ColumnPropsType) {
  const { stateStore, dispatch } = useProjectContext();

  const [createTaskModal, setCreateTaskModal] = useState(false);

  const [editColumnTitle, setEditColumnTitle] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (editColumnTitle) {
      inputRef.current.focus();
    }
  }, [editColumnTitle]);

  const { columns } = stateStore;
  const column = columns[columnId];

  const { ref, isDropTarget } = useDroppable({
    id: columnId,
    data: {
      targetColumnId: column.columnId,
      targetId: column.columnId,
      targetType: "column",
    },
  });

  if (!column) return null;

  function handleTitleEdit(e) {
    if (e.key === "Enter") {
      dispatch({
        type: "rename column",
        payload: {
          boardId,
          columnId: column.columnId,
          columnTitle: e.currentTarget.value,
        },
      });
      setEditColumnTitle(false);
    }
  }

  return (
    <div
      ref={ref}
      className={`w-96 shrink-0 rounded-xl bg-surface-low flex flex-col p-4`}
    >
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="truncate text-lg font-semibold">
            {editColumnTitle ? (
              <input
                type="text"
                ref={inputRef}
                name="boardTitle"
                className="py-1 px-4 text-xl bg-surface-low  rounded focus:border  w-full"
                defaultValue={column.columnTitle}
                onKeyDown={handleTitleEdit}
              />
            ) : (
              column.columnTitle
            )}
          </span>

          <span className="shrink-0 bg-on-surface-variant/15 px-2 py-0.5 rounded-full">
            {column.taskIds.length}
          </span>
        </div>

        <EllipsisIcon
          className="shrink-0 ml-2"
          onClick={() => setEditColumnTitle(true)}
        />
      </div>
      {column.taskIds.length === 0 ? (
        <>
          <div
            className={`flex-1 overflow-y-auto flex flex-col justify-center items-center border-2 rounded-xl    ${isDropTarget ? "border-solid border-emerald-300" : "border-dashed border-on-surface-variant/10"}`}
          >
            <Rocket className=" w-16 h-16 fill-slate-400 text-slate-500 bg-on-surface-variant/10 p-4 rounded-2xl" />
            <p className=" text-on-surface-variant font-medium py-2">
              No active tasks
            </p>
            <p className=" text-primary font-semibold py-2">
              Move items here or
            </p>
          </div>
          <div
            onClick={() => setCreateTaskModal(true)}
            className="overflow-y-auto flex gap-2 justify-center items-center border-2 rounded border-dashed  border-on-surface-variant/10 cursor-pointer"
          >
            <PlusIcon className=" w-4 h-4" />
            <p className=" text-on-surface-variant font-medium py-2">
              Add task
            </p>
          </div>
        </>
      ) : (
        <div className="space-y-4 overflow-y-scroll custom-scrollbar pt-2 pb-4">
          {column.taskIds.map((taskId, index) => (
            <Task
              key={taskId}
              taskId={taskId}
              index={index}
              columnId={column.columnId}
            />
          ))}
          <div
            onClick={() => setCreateTaskModal(true)}
            className="flex-1 overflow-y-auto flex gap-2 justify-center items-center border-2 rounded border-dashed  border-on-surface-variant/10 cursor-pointer"
          >
            <PlusIcon className=" w-4 h-4" />
            <p className=" text-on-surface-variant font-medium py-2">
              Add task
            </p>
          </div>
        </div>
      )}
      <Modal isOpen={createTaskModal} setOpen={() => setCreateTaskModal(false)}>
        <CreateTaskForm
          setOpen={setCreateTaskModal}
          columnId={column.columnId}
          boardId={boardId}
        />
      </Modal>
    </div>
  );
}

export default Column;
