import useProjectContext from "@/hooks/useProjectContext";
import type { ProjectAction } from "@/types";
import { FilePen, FolderOpen } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CreateColumnForm({ setOpen }) {
  const [title, setTitle] = useState("");

  const { stateStore, dispatch } = useProjectContext();

  const navigate = useNavigate();

  const { boardId } = useParams();

  function createNewColumnHandler() {
    function handleError() {
      setOpen(false);
      navigate("/project1/board1");
    }

    if (!boardId || !title.trim()) {
      handleError();
      return;
    }

    const currentBoard = stateStore.boards[boardId];

    if (!currentBoard) {
      handleError();
      return;
    }

    const action: ProjectAction = {
      type: "create column",
      payload: { boardId: currentBoard.boardId, columnTitle: title },
    };
    dispatch(action);
  }
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
              name="columnTitle"
              value={title}
              className="py-2 px-4 text-xl bg-surface-low  rounded  w-full"
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
              createNewColumnHandler();
              setOpen(false);
            }}
            className="bg-primary text-surface-lowest py-3 px-8 text-lg font-semibold rounded-lg cursor-pointer"
          >
            Create Column
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateColumnForm;
