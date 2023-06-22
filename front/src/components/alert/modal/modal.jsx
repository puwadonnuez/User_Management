import { X, Trash } from "react-feather";

const Modal = ({ open, onClose, children }) => {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 flex justify-center items-center transition-colors z-[9999] ${
          open ? "visible bg-black/20" : "invisible"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-xl shadow p-6 transition-all ${
            open ? "scale-100 opacity-100" : ""
          }`}
        >
          {children}
          <button
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
            onClick={onClose}
          >
            <X />
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
