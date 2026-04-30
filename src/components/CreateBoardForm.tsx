import useProjectContext from "@/hooks/useProjectContext";
import type { ProjectAction } from "@/types";
import { FilePen, FolderOpen } from "lucide-react";
import { useState } from "react";

function CreateBoardForm({ setOpen }) {
  const [title, setTitle] = useState("");

  const { dispatch } = useProjectContext();

  function createNewBoardHandler() {
    const action: ProjectAction = {
      type: "create board",
      payload: { boardTitle: title },
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
            Create new board
          </h2>
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <FilePen size={20} />
              <span className="text-lg text-on-surface font-bold capitalize">
                Board Title
              </span>
            </div>
            <input
              type="text"
              name="boardTitle"
              className="py-2 px-4 text-xl bg-surface-low  rounded  w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            onClick={() => {
              createNewBoardHandler();
              setOpen(false);
            }}
            className="bg-primary text-surface-lowest py-3 px-8 text-lg font-semibold rounded-lg cursor-pointer"
          >
            Create Board
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateBoardForm;
