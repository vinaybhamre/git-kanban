import { X } from "lucide-react";

function Modal({ isOpen, setOpen, children }) {
  return (
    <>
      {isOpen && (
        <div
          onClick={setOpen}
          className="fixed inset-0 bg-on-surface/50 flex justify-center items-center"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-white rounded-lg relative"
          >
            <div className="flex justify-end absolute p-4 right-0">
              <X onClick={setOpen} className="text-on-surface cursor-pointer" />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
