import { useSortable } from "@dnd-kit/react/sortable";
import type { ReactNode } from "react";

function Sortable({
  id,
  index,
  columnId,
  children,
}: {
  id: string;
  index: number;
  columnId: string;
  children: ReactNode;
}) {
  // const { ref } = useSortable({
  //   id,
  //   index,
  //   group: "tasks",
  //   data: {
  //     srcColumnId: columnId,
  //   },
  // });

  const { ref } = useSortable({
    id,
    index,
    group: "tasks",
    data: {
      srcColumnId: columnId,
      // these get read when THIS task is the target
      targetColumnId: columnId,
      targetId: id,
      targetType: "task",
    },
  });

  return (
    <div ref={ref} className="item">
      {children}
    </div>
  );
}

export default Sortable;
