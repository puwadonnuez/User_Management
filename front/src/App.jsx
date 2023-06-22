import Header from "./pages/header";
import { Routes, Route } from "react-router-dom";
import UserList from "./pages/user_list/userlist";
import CreateUser from "./pages/create_user/index.jsx";

import "./App.css";

function App() {
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto">
          <div className="bg-white dark:bg-gray-800 relative shadow-md overflow-hidden">
            <Header />
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/manage-user" element={<CreateUser />} />
              <Route path="/manage-user/:id" element={<CreateUser />} />
            </Routes>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
