import React, { useState } from "react";
import useUserList from "../../components/user_list/userList";
import Pagination from "../../components/pagination";
import usePagination from "../../components/pagination/hook";
import Title from "../title";
import useModal from "../../components/alert/modal/hook/modal.js";
import Delete from "../../components/alert/modal/delete";
import { useNavigate } from "react-router-dom";
import default_pic from "../../assets/default_pic.jpg";

import moment from "moment";

const UserList = () => {
  const [pages, cur, setCur, next, back] = usePagination();
  const [userData, deleteUser, id, setId] = useUserList(cur, setCur);
  const [modal, setModal] = useModal();
  const navigate = useNavigate();
  return (
    <>
      <Title title={`Users List`} />
      {modal && (
        <Delete
          open={modal}
          setOpen={setModal}
          deleteUser={deleteUser}
          id={id}
        />
      )}
      {userData?.data?.user_data.length > 0 ? (
        <>
          <div className="overflow-x-auto mx-12 my-8">
            <table className="w-full text-gray-500 dark:text-gray-400 text-xl text-center">
              <thead className="text-xl text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-black-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Profile Picture
                  </th>
                  <th scope="col" className="px-4 py-3">
                    First name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Last name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Gender
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Birthday
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData?.data?.user_data?.map((list) => (
                  <tr className="border-b dark:border-gray-700">
                    <td scope="row" className="align-middle p-2">
                      <div>
                        <img
                          className="shadow-lg rounded-full h-auto  border-none mx-auto"
                          src={`http://localhost:2887${list.image}`}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src =
                              "http://localhost:2887/public/images/default_pic.png";
                          }}
                          style={{ width: `80px`, height: `80px` }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">{list.first_name}</td>
                    <td className="px-4 py-3">{list.last_name}</td>
                    <td className="px-4 py-3">{list.gender}</td>
                    <td className="px-4 py-3">
                      {list.birth_date &&
                        moment(list.birth_date).format(`DD MMMM YYYY`)}
                    </td>
                    <td className="px-4 py-3 justify-center items-center flex h-full">
                      <div className="flex items-center gap-2">
                        <button
                          className="w-fit px-8 py-2 bg-yellow-400 text-white"
                          onClick={() => navigate(`/manage-user/${list?.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="w-fit px-8 py-2 bg-red-500 text-white"
                          onClick={() => {
                            setModal(true);
                            setId(list.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav
            className="flex flex-col md:flex-row-reverse justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <Pagination
              pages={pages}
              cur={cur}
              setCur={setCur}
              next={next}
              back={back}
              lastPage={userData?.data?.page}
            />
          </nav>
        </>
      ) : (
        <>
          {" "}
          <div className="mx-12 my-8 text-center text-3xl text-red-500 ">
            {" "}
            Empty Data{" "}
          </div>
        </>
      )}
    </>
  );
};

export default UserList;
