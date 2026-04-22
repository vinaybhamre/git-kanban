import { EditIcon, ListFilter, PlusIcon, Share2 } from "lucide-react";

function BoardHeader() {
  return (
    <div className="flex shrink-0 justify-between">
      <div className=" flex items-baseline gap-4">
        <h1 className="text-3xl font-bold text-on-surface">Board Title</h1>
        <EditIcon />
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
        <button className="flex items-center gap-1 bg-primary text-surface-lowest py-3 px-4 text-lg font-semibold rounded-lg cursor-pointer">
          <PlusIcon size={20} />
          Create Column
        </button>
      </div>
    </div>
  );
}

export default BoardHeader;
