import Modal from "./modal";
import { XCircle } from "react-feather";

const Error = ({ open, setOpen, error = [], setResponse }) => {
  console.log(`message error:`, error);
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setResponse(false);
      }}
    >
      <div className="text-center w-56">
        <XCircle size={56} className="mx-auto text-red-500" />
        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800">Error</h3>
          <p className="text-sm text-gray-500">
            {error.map((data) => (
              <div>{data.instancePath.substring(1) + " " + data.message}</div>
            ))}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            className="btn btn-primary w-full"
            onClick={() => {
              setOpen(false);
              setResponse(false);
            }}
          >
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Error;
