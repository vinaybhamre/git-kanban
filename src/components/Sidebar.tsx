import useProjectContext from "@/hooks/useProjectContext";
import {
  BadgeQuestionMark,
  PlusIcon,
  Settings,
  SquareKanban,
  TerminalSquareIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateBoardForm from "./CreateBoardForm";
import Modal from "./Modal";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const { projectId: paramProjectId } = useParams();

  const { stateStore } = useProjectContext();

  const navigate = useNavigate();

  if (!paramProjectId) {
    return;
  }

  const project = stateStore.projects[paramProjectId];

  function navigateToBoard(projectId: string, boardId: string) {
    navigate(`/${projectId}/${boardId}`);
  }

  return (
    <>
      <div className=" w-72 bg-surface-low flex flex-col items-center shrink-0">
        <div className="flex gap-2 py-4 pr-8">
          <div className="self-center bg-primary rounded py-1 px-1.5">
            <TerminalSquareIcon size={32} className=" p-0.5 text-white" />
          </div>
          <div>
            <p className="text-base font-bold text-on-surface">
              {project.projectTitle}
            </p>
            <p className="text-sm leading-4 text-on-surface-variant">
              {project.projectSubtitle}
            </p>
          </div>
        </div>

        <div className="px-4 w-full">
          <button
            onClick={() => setIsOpen(true)}
            className="flex w-full justify-center items-center gap-1 bg-primary text-surface-lowest py-3 px-4 text-lg font-semibold rounded-lg cursor-pointer"
          >
            <PlusIcon size={20} />
            Create Board
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-between w-full py-6 px-4 ">
          <div className="space-y-3">
            {project.boardIds.map((boardId) => (
              <div
                key={boardId}
                className=" text-primary-container flex gap-4 py-2 px-4 bg-surface-lowest rounded-md cursor-pointer"
                onClick={() => navigateToBoard(project.projectId, boardId)}
              >
                <SquareKanban />
                <p className="font-medium">
                  {stateStore.boards[boardId].boardTitle}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-t-slate-300 space-y-1 pt-2">
            <div className=" text-on-surface-variant hover:bg-on-surface-variant/5 flex gap-4 py-2 px-4 rounded-md cursor-pointer">
              <Settings />
              <p className="font-medium">Settings</p>
            </div>
            <div className=" text-on-surface-variant hover:bg-on-surface-variant/5 flex gap-4 py-2 px-4  rounded-md cursor-pointer">
              <BadgeQuestionMark />
              <p className="font-medium">Support</p>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} setOpen={setIsOpen}>
        <CreateBoardForm setOpen={setIsOpen} />
      </Modal>
    </>
  );
}

export default Sidebar;
