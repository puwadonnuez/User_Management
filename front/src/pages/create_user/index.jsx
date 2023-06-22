import default_pic from "../.././assets/default_pic.jpg";
import GeneratePicture from "../../components/files/hook";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Title from "../title";
import useForm from "./hook";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../components/alert/modal/error";
import useModal from "../../components/alert/modal/hook/modal";
import { forwardRef } from "react";
import moment from "moment";

const CreateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [
    image,
    inputRef,
    handleUploadClick,
    handleFileChange,
    deleteFile,
    tempImg,
    setTempImg,
  ] = GeneratePicture();
  const [
    state,
    handleDateChange,
    handleInputChange,
    handleSubmit,
    response,
    setResponse,
  ] = useForm(id, image, setTempImg);
  const [modal, setModal] = useModal();
  const ExampleCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
    <input
      value={value}
      name={`birth_date`}
      placeholder="DD/MM/YYYY"
      className="example-custom-input border-gray-300"
      onClick={onClick}
      onChange={onChange}
      ref={ref}
    ></input>
  ));
  if ([200, 201, 204].includes(response?.status)) {
    // window.location.href(`/`)
    navigate(`/`);
  } else if (!modal && response) {
    setModal(true);
  }

  return (
    <>
      {response && (
        <Error
          open={modal}
          setOpen={setModal}
          error={response?.data}
          setResponse={setResponse}
        />
      )}
      <Title title={id ? "Update User" : "Create new User"} />
      <div className="flex items-center bg-gray-50">
        <div className="mx-auto bg-white rounded-lg shadow-xl w-full pb-24 md:pb-0">
          <div className="flex flex-col gap-16 md:flex-row items-start p-8">
            <div className="flex flex-col gap-8 items-center shrink-0 self-start mx-auto">
              <div className="w-72 h-72 relative rounded-full overflow-hidden">
                <img
                  src={image || tempImg || default_pic}
                  className="border-1 border-black-500 object-cover w-full h-full"
                />
              </div>
              <div>
                <button
                  className="w-fit px-8 py-2 rounded-md bg-blue-600 text-white"
                  onClick={handleUploadClick}
                >
                  Upload Profile Picture
                </button>
                <input
                  type="file"
                  accept="image/png, image/jpeg" 
                  ref={inputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
              <button
                className="w-fit px-8 py-2 rounded-md bg-red-700 text-white"
                onClick={deleteFile}
              >
                Delete Picture
              </button>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex w-full gap-4 flex-col sm:flex-row">
                <div className="flex-col flex gap-2 flex-1">
                  <label className="text-lg text-gray-500 pl-1.5">
                    First Name
                  </label>
                  <input
                    name="first_name"
                    value={state?.first_name}
                    placeholder="First Name"
                    className="border-[1px] p-2 rounded-md w-full border-gray-300"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex-col flex gap-2 flex-1">
                  <label className="text-lg text-gray-500 pl-1.5">
                    Last Name
                  </label>
                  <input
                    name="last_name"
                    value={state?.last_name}
                    placeholder="Last Name"
                    className="border-[1px] p-2 rounded-md w-full border-gray-300"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex w-full gap-4 flex-col sm:flex-row">
                <div div className="flex-col flex gap-2 flex-1">
                  <label className="block mb-0 text-lg text-gray-500 pl-1.5">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={state?.gender}
                    className="myselect block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleInputChange}
                  >
                    <option
                      value=""
                      disabled
                      selected
                      hidden
                      className="text-gray-500"
                    >
                      {" "}
                      -- Please select Gender --
                    </option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                <div div className="flex-col flex gap-2 flex-1">
                  <div div className="flex-col flex gap-2 flex-1">
                    <label className="block mb-0 text-lg text-gray-500 pl-1.5">
                      Birth day
                    </label>
                    <DatePicker
                      className="border-[1px] p-2 rounded-md w-full !z-0 border-gray-300"
                      selected={
                        state?.birth_date ? new Date(state?.birth_date) : null
                      }
                      maxDate={new Date()}
                      placeholderText="DD/MM/YYYY"
                      customInput={<ExampleCustomInput />}
                      dateFormat="dd/MM/yyyy"
                      onSelect={(data) => handleDateChange(data)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-4 bottom-4">
            <div className="flex gap-2">
              <button
                className="w-fit px-8 py-2 bg-gray-400 rounded-md text-white"
                onClick={() => navigate(`/`)}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="w-fit px-8 py-2 rounded-md bg-green-500 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
