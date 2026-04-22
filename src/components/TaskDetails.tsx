import {
  CalendarIcon,
  FileTextIcon,
  FolderOpen,
  PlusSquare,
  Trash2,
  UserCircle2,
} from "lucide-react";

function TaskDetails() {
  return (
    <div className="flex justify-center">
      <div className="p-8 w-2xl flex flex-col gap-10">
        <div className="space-y-4">
          <div className="text-on-surface-variant font-medium flex  gap-4">
            <FolderOpen /> <p>Project Title / Board Title / Column Title</p>
          </div>
          {/* <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <FilePen />
              <span className="text-xl text-on-surface font-bold capitalize">
                Title
              </span>
            </div>
            <input
              type="text"
              name="taskTitle"
              className="py-2 px-4 text-2xl border-2 border-on-surface-variant/50 rounded  w-full"
            />
          </div> */}
          <div className="flex gap-2 items-start justify-between">
            <h3 className="font-bold text-on-surface text-3xl line-clamp-3">
              Integrate dnd-kit for drag and drop Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Deserunt necessitatibus perspiciatis
              expedita totam maxime illo dolores, porro minima velit sed ullam
              aperiam provident voluptates ipsum ratione obcaecati voluptatum,
              illum quo! Animi architecto fugit, ad nulla vitae labore
              reprehenderit. Cupiditate quod tenetur nesciunt deleniti illo
              illum architecto quo perspiciatis. Doloribus a repudiandae eveniet
              praesentium quos voluptate nostrum placeat consequatur rerum
              veniam!
            </h3>
            <p className="text-primary cursor-pointer">Edit</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <FileTextIcon />
              <span className="text-xl text-on-surface font-bold capitalize">
                description
              </span>
            </div>
            <p className="text-primary cursor-pointer">Edit</p>
          </div>
          <textarea
            name="description"
            className="bg-surface-low w-full h-full min-h-52 rounded p-2 resize-none"
            readOnly
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Doloremque, consequuntur.
          </textarea>
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
          <p className="text-zinc-400 uppercase font-bold text-xs">labels</p>
          <div className="space-x-2">
            <div className="inline font-medium text-sm text-on-surface py-1 px-2 bg-green-300 rounded ">
              Devops
            </div>
            <div className="inline font-medium text-sm text-on-surface py-1 px-2 bg-rose-300 rounded ">
              UI
            </div>
            <div className="inline font-medium text-sm text-on-surface py-1 px-2 bg-fuchsia-300 rounded ">
              DnD
            </div>
            <PlusSquare className="inline w-5 h-5 cursor-pointer" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-zinc-400 uppercase font-bold text-xs">due date</p>
          <div className="flex gap-2">
            <CalendarIcon />
            <span className="text-on-surface-variant cursor-pointer">
              Oct 28, 2024
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-zinc-400 uppercase font-bold text-xs">assignee</p>
          <UserCircle2 className=" w-8 h-8 cursor-pointer" />
        </div>
        <div className="bg-on-surface-variant/15 h-0.5" />
        <div className="flex justify-center pt-2 pb-10">
          <button className="flex text-red-500 text-base capitalize gap-2 font-bold cursor-pointer">
            <Trash2 />
            delete task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
