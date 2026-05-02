import { CalendarIcon, GripVertical, UserCircle2 } from "lucide-react";
import { useState } from "react";
// import Draggable from "./Draggable";
// import { useDroppable } from "@dnd-kit/react";
import Modal from "./Modal";
import Sortable from "./Sortable";
import TaskDetails from "./TaskDetails";

function Task({ task, index, columnId }) {
  const [taskDetailsModal, setTaskDetailsModal] = useState(false);
  // const { ref, isDropTarget } = useDroppable({
  //   id: task.taskId,
  //   data: {
  //     taskId: task.taskId,
  //     targetColumnId: columnId,
  //     targetId: task.taskId,
  //     targetType: "task",
  //   },
  // });

  // console.log("IsDropTarget from task: ", isDropTarget);
  return (
    <>
      <Sortable id={task.taskId} index={index} columnId={columnId}>
        <div
          // ref={ref}
          onClick={() => setTaskDetailsModal(true)}
          className="h-52 flex flex-col justify-between bg-surface-lowest rounded p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center">
            <div className="inline gap-2 font-medium text-on-surface py-1 px-4 bg-green-300 rounded items-center ">
              Devops
            </div>
            <GripVertical className="w-5 h-5 text-on-surface-variant" />
          </div>
          <div className="flex-1 border-b my-3 border-b-on-surface-variant/10 overflow-hidden">
            <p className="text-lg font-semibold line-clamp-3 text-on-surface">
              {task.taskTitle}
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <CalendarIcon />
              <span>Oct 28</span>
            </div>
            <span>
              <UserCircle2 />
            </span>
          </div>
        </div>
      </Sortable>
      <Modal
        isOpen={taskDetailsModal}
        setOpen={() => setTaskDetailsModal(false)}
      >
        <TaskDetails task={task} />
      </Modal>
    </>
  );
}

export default Task;
