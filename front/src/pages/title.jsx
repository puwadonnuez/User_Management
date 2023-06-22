import { useNavigate } from "react-router-dom";

const Title = ({ title }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2 text-gray-500 text-3xl">{title}</div>
        {title !== `Update User` && (
          <div className="text-md w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <button
              type="button"
              className="text-2xl flex items-center justify-center text-white bg-blue-400 focus:ring-primary-300 font-medium rounded-lg px-6 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              onClick={() => navigate(`/manage-user`)}
            >
              Add
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Title;
