import useProjectContext from "@/hooks/useProjectContext";
import type { ProjectAction } from "@/types";
import {
  CalendarIcon,
  FilePen,
  FileTextIcon,
  FolderOpen,
  PlusSquare,
  UserCircle2,
} from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";

type CreatTaskPropsType = {
  columnId: string;
  boardId: string;
  setOpen: (value: boolean) => void;
};

function CreateTaskForm({ setOpen, columnId, boardId }: CreatTaskPropsType) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { dispatch } = useProjectContext();

  function createTaskHandler() {
    const task = {
      taskId: nanoid(),
      taskTitle: title,
      description,
    };
    const action: ProjectAction = {
      type: "create task",
      payload: { boardId, columnId, task },
    };

    dispatch(action);
  }

  return (
    <div className="flex justify-center">
      <div className="p-8 w-2xl space-y-4">
        <div className="space-y-4">
          <div className="text-on-surface-variant font-medium flex  gap-4">
            <FolderOpen /> <p>Project Title / Board Title / Column Title</p>
          </div>
          <h2 className="text-2xl font-bold text-on-surface">
            Create new task
          </h2>
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <FilePen size={20} />
              <span className="text-lg text-on-surface font-bold capitalize">
                Task Title
              </span>
            </div>
            <input
              type="text"
              name="taskTitle"
              className="py-2 px-4 text-xl bg-surface-low  rounded  w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <FileTextIcon size={20} />
              <span className="text-lg text-on-surface font-bold capitalize">
                Description
              </span>
            </div>
            <textarea
              name="description"
              className="bg-surface-low w-full h-full min-h-52 text-lg rounded p-2 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setOpen(false)}
            className="bg-surface text-red-500 py-3 px-8 text-lg font-semibold rounded-lg cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              createTaskHandler();
              setOpen(false);
            }}
            className="bg-primary text-surface-lowest py-3 px-8 text-lg font-semibold rounded-lg cursor-pointer"
          >
            Create Task
          </button>
        </div>
      </div>
      <div className=" w-72 px-5 pt-5 bg-surface-low space-y-8 shrink-0 rounded-e-lg">
        <div className="space-y-2">
          <p className="text-zinc-400 uppercase font-bold text-xs">project</p>
          <div className="flex items-center gap-3 ">
            <span className="self-center text-white bg-primary rounded py-1 px-3">
              A
            </span>
            <p className="font-medium text-on-surface-variant">Architect Pro</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-zinc-400 uppercase font-bold text-xs">status</p>
          <div className="py-2 px-4 bg-white rounded cursor-pointer">
            Backlog
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-zinc-400 uppercase font-bold text-xs">Assignee</p>
          <div className="py-2 px-4 bg-white rounded cursor-pointer">
            <div className="flex items-center gap-2">
              <UserCircle2 size={20} />
              <span className="text-on-surface">Unassigned</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-zinc-400 uppercase font-bold text-xs">labels</p>
          <PlusSquare className="inline w-5 h-5 cursor-pointer" />
        </div>
        <div className="space-y-2">
          <p className="text-zinc-400 uppercase font-bold text-xs">Due Date</p>
          <div className="py-2 px-4 bg-white rounded cursor-pointer">
            <div className="flex items-center gap-2">
              <CalendarIcon size={16} />
              <span className="text-on-surface">Set due date</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTaskForm;
