import { useDraggable } from "@dnd-kit/react";
import type { ReactNode } from "react";

function Draggable({
  id,
  columnId,
  children,
}: {
  id: string;
  columnId: string;
  children: ReactNode;
}) {
  const { ref } = useDraggable({
    id,
    data: {
      taskId: id,
      sourceColumnId: columnId,
    },
  });

  return <div ref={ref}>{children}</div>;
}

export default Draggable;