import useProjectContext from "@/hooks/useProjectContext";
import { EditIcon, ListFilter, PlusIcon, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CreateColumnForm from "./CreateColumnForm";
import Modal from "./Modal";

function BoardHeader({ title, boardId }: { title: string; boardId: string }) {
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const inputRef = useRef(null);

  const [editBoardTitle, setEditBoardTitle] = useState(false);
  const [boardTitle, setBoardTitle] = useState(title);

  const { dispatch } = useProjectContext();

  useEffect(() => {
    if (editBoardTitle) {
      inputRef.current.focus();
    }
  }, [editBoardTitle]);

  function handleTitleEdit(e) {
    if (e.key === "Enter") {
      dispatch({
        type: "rename board",
        payload: { boardId, updatedBoardTitle: boardTitle },
      });
      setEditBoardTitle(false);
    }
  }

  return (
    <>
      <div className="flex shrink-0 justify-between">
        <div className=" flex items-baseline gap-4">
          {editBoardTitle ? (
            <input
              type="text"
              ref={inputRef}
              name="boardTitle"
              className="py-1 px-4 text-3xl bg-surface-low  rounded active:border-none focus:border-none focus-within:border-amber-300 focus-visible:border-red-50 border-none  w-full"
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              onKeyDown={handleTitleEdit}
            />
          ) : (
            <h1 className="text-3xl font-bold text-on-surface">{boardTitle}</h1>
          )}
          <EditIcon onClick={() => setEditBoardTitle(true)} />
        </div>
        <div className="flex items-center gap-4 ">
          <button className="flex max-h-fit gap-2 py-1 px-4 border border-on-surface-variant/15 rounded-lg items-center ">
            <ListFilter size={16} className="text-on-surface-variant" />
            <span className="font-medium text-on-surface-variant">Filters</span>
          </button>
          <button className="flex max-h-fit gap-2 py-1 px-4  border border-surface-low bg-surface-low rounded-lg items-center ">
            <Share2 size={16} className="text-on-surface" />
            <span className="font-medium text-on-surface">Share</span>
          </button>
          <button
            onClick={() => setIsColumnModalOpen(true)}
            className="flex items-center gap-1 bg-primary text-surface-lowest py-3 px-4 text-lg font-semibold rounded-lg cursor-pointer"
          >
            <PlusIcon size={20} />
            Create Column
          </button>
        </div>
      </div>
      <Modal
        isOpen={isColumnModalOpen}
        setOpen={() => setIsColumnModalOpen(false)}
      >
        <CreateColumnForm setOpen={setIsColumnModalOpen} />
      </Modal>
    </>
  );
}

export default BoardHeader;
