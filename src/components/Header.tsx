import useProjectContext from "@/hooks/useProjectContext";
import { Bell, CircleUserRound } from "lucide-react";
import { useParams } from "react-router-dom";

function Header() {
  const { stateStore } = useProjectContext();
  const { projectId } = useParams();
  return (
    <div className="h-14 border-b flex justify-between px-10 items-center border-b-on-surface-variant/5">
      <div>
        <h2 className="text-2xl font-semibold text-on-surface">
          {stateStore.projects[projectId].projectTitle}
        </h2>
      </div>
      <div className="flex gap-10 items-center">
        <Bell size={28} className="text-on-surface-variant" fill="#191c1e" />
        <CircleUserRound size={30} />
      </div>
    </div>
  );
}

export default Header;
