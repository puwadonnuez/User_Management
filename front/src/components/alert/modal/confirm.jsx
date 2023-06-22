import Modal from "./modal";
import { XCircle } from "react-feather";

const Confirm = ({ open, setOpen, error }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="text-center w-56">
        <XCircle size={56} className="mx-auto text-red-500" />
        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800">Error</h3>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-danger w-full">Delete</button>
          <button
            className="btn btn-light w-full"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Confirm;
