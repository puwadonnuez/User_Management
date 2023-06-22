const {
  createUserService,
  updateUserService,
  deleteUserService,
  getUserService,
  getUserByIdService,
} = require("../service/user");

const createUser = async (req, res, next) => {
  const { body } = req;
  const [data, errors] = await createUserService(body);
  if (errors) {
    if (errors[0].status === 409) {
      res.status(409).json(errors);
    } else {
      return res.status(422).json(errors);
    }
  }
  return res.status(201).end();
};

const updateUser = async (req, res, next) => {
  const { body, params } = req;
  if (!params) {
    return res.status(401);
  }
  const [data, errors] = await updateUserService(params, body);
  if (errors) {
    return res.status(422).json(errors);
  }
  return res.status(204).end();
};

const deleteUser = async (req, res, next) => {
  const { params } = req;
  if (!params) {
    return res.status(401);
  }
  const [data, errors] = await deleteUserService(params);
  if (errors) {
    return res.status(422).json(errors);
  }
  return res.status(204).end();
};

const getUser = async (req, res, next) => {
  const { query } = req;
  const { page } = query;
  if (!page || typeof Number(page) !== "number") {
    return res.status(400).json();
  }

  const data = await getUserService(page);
  return res.status(200).json(data);
};

const getUserById = async (req, res, next) => {
  const { params } = req;
  const { id } = params;
  if (!id || typeof Number(id) !== "number") {
    return res.status(400).json();
  }
  const data = await getUserByIdService(id);
  return res.status(200).json(data);
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUserById,
};
