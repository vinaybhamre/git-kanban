import { CalendarIcon, GripVertical, UserCircle2 } from "lucide-react";

function Task() {
  return (
    <div className="h-52 flex flex-col justify-between bg-surface-lowest rounded p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center">
        <div className="inline gap-2 font-medium text-on-surface py-1 px-4 bg-green-300 rounded items-center ">
          Devops
        </div>
        <GripVertical className="w-5 h-5 text-on-surface-variant" />
      </div>
      <div className="flex-1 border-b my-3 border-b-on-surface-variant/10 overflow-hidden">
        <p className="text-lg font-semibold line-clamp-3 text-on-surface">
          Migrate kubernetes cluster to v1.28 and update their helm charts
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
  );
}

export default Task;
