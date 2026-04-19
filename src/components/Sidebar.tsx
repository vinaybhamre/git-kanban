import {
  BadgeQuestionMark,
  ChartColumnStacked,
  Settings,
  SquareChartGantt,
  SquareKanban,
  TerminalSquareIcon,
} from "lucide-react";

function Sidebar() {
  return (
    <div className=" w-72 bg-surface-low flex flex-col items-center">
      <div className="flex gap-2 pt-4 pr-8">
        <div className="self-center bg-primary rounded py-1 px-1.5">
          <TerminalSquareIcon size={32} className=" p-0.5 text-white" />
        </div>
        <div>
          <p className="text-base font-bold text-on-surface">
            Engineering Editorial
          </p>
          <p className="text-sm leading-4 text-on-surface-variant">
            V3 Architecture
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between w-full py-6 px-4 ">
        <div className="space-y-1">
          <div className=" text-primary-container flex gap-4 py-2 px-4 bg-surface-lowest rounded-md cursor-pointer">
            <SquareKanban />
            <p className="font-medium">Boards</p>
          </div>
          <div className=" text-on-surface-variant hover:bg-on-surface-variant/5 flex gap-4 py-2 px-4 rounded-md cursor-pointer">
            <SquareChartGantt />
            <p className="font-medium">Backlogs</p>
          </div>
          <div className=" text-on-surface-variant hover:bg-on-surface-variant/5 flex gap-4 py-2 px-4  rounded-md cursor-pointer">
            <ChartColumnStacked />
            <p className="font-medium">Reports</p>
          </div>
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
  );
}

export default Sidebar;
