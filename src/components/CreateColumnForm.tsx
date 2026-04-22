import { FilePen, FolderOpen } from "lucide-react";

function CreateColumnForm({ setOpen }) {
  return (
    <div className="flex justify-center">
      <div className="p-8 w-2xl space-y-8">
        <div className="space-y-4">
          <div className="text-on-surface-variant font-medium flex  gap-4">
            <FolderOpen /> <p>Project Title / Board Title </p>
          </div>
          <h2 className="text-2xl font-bold text-on-surface">
            Create new column
          </h2>
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <FilePen size={20} />
              <span className="text-lg text-on-surface font-bold capitalize">
                Column title
              </span>
            </div>
            <input
              type="text"
              name="taskTitle"
              className="py-2 px-4 text-xl bg-surface-low  rounded  w-full"
            />
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
            onClick={() => setOpen(false)}
            className="bg-primary text-surface-lowest py-3 px-8 text-lg font-semibold rounded-lg cursor-pointer"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateColumnForm;
