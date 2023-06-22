import Modal from "./modal";
import { Trash } from "react-feather";

const Delete = ({ open, setOpen, deleteUser, id }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="text-center w-56">
        <Trash size={56} className="mx-auto text-red-500" />
        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
          <p className="text-sm text-gray-500">
            Are you sure want to delete this item?
          </p>
        </div>
        <div className="flex gap-4">
          <button
            className="btn btn-danger w-full"
            onClick={() => {
              deleteUser(id);
              setOpen(false);
            }}
          >
            Delete
          </button>
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

export default Delete;
