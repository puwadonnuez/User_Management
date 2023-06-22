const { validateField } = require("../../utils/validation");

const { writeFile, deleteFile } = require("../../utils/file");

const isBase64 = require("is-base64");

const { User } = require("../model/user");

const {
  createUserQuery,
  updateUserQuery,
  selectUserById,
  deleteUserQuery,
  generatePagination,
  selectDuplicateUser,
} = require("../query/user");

const validateUser = (userData) => {
  const userProperties = {
    first_name: {
      type: "string",
      maxLength: 30,
      minLength: 1,
    },
    last_name: {
      type: "string",
      maxLength: 30,
      minLength: 1,
    },
    gender: {
      type: "string",
      maxLength: 1,
    },
    birth_date: {
      type: "string",
      format: "date",
    },
  };
  const userRequired = [`first_name`, `last_name`];
  const createUser = {
    data: {
      ...userData,
    },
    properties: {
      ...userProperties,
    },
    required: userRequired,
  };
  return validateField(createUser);
};

const createUserService = async (data) => {
  const { first_name, last_name, gender, birth_date, image } = data;
  const user = new User();
  user
    .setFirstName(first_name)
    .setLastName(last_name)
    .setGender(gender)
    .setBirthDate(birth_date);
  const [isValidate, errors] = validateUser(user.getUser());
  if (isValidate) {
    let path = null;
    if (image && !isBase64(image, { mimeRequired: true })) {
      return [null, [{ instancePath: "", message: "only base64" }]];
    }
    const [getDupUsr] = await selectDuplicateUser(first_name, last_name);
    if (getDupUsr) {
      return [
        null,
        [{ instancePath: "", message: "user is duplicate", status: 409 }],
      ];
    }
    const [response] = await createUserQuery(user);
    if (response) {
      if (image) {
        const fileName = `${response}.png`;
        path = `/public/images/${fileName}`;
        user.setImage(path);
        await Promise.all([
          writeFile(path, image),
          updateUserQuery(response, { image: user.image }),
        ]);
      }
      return [response, null];
    }
  }
  return [null, errors];
};

const updateUserService = async (params, data) => {
  const { first_name, last_name, gender, birth_date, image } = data;
  const { id } = params;
  const user = new User();
  user
    .setFirstName(first_name)
    .setLastName(last_name)
    .setGender(gender)
    .setImage(image);
  if (birth_date) {
    user.setBirthDate(birth_date);
  }
  const [isValidate, errors] = validateUser(user.getUser());
  if (isValidate) {
    if (image && !isBase64(image, { mimeRequired: true })) {
      return [null, [{ instancePath: "", message: "only base64" }]];
    }
    let path = null;
    if (user.image) {
      const fileName = `${id}.png`;
      path = `/public/images/${fileName}`;
      user.setImage(path);
    }
    const [response] = await Promise.all([
      updateUserQuery(id, user),
      writeFile(path, image),
    ]);
    if (response) {
      return [response, null];
    }
  }
  return [null, errors];
};

const deleteUserService = async (params) => {
  const { id } = params;
  const [path, response] = await Promise.all([
    deleteFile(id),
    deleteUserQuery(id),
  ]);
  return [response, null];
};

const getUserService = async (page) => {
  const [data] = await generatePagination(page);
  const result = {
    data: {
      user_data: [...data],
    },
  };
  if (data && data.length > 0) {
    const page = data[0].last_page % 10 === 0 ? 0 : 1;
    const lastPage = Math.floor(data[0].last_page / 10);
    result.data.page = lastPage + page;
  }
  return result;
};

const getUserByIdService = async (id) => {
  const [data] = await selectUserById(id);
  const result = {
    data: {
      user_data: data,
    },
  };
  return result;
};

module.exports = {
  createUserService,
  updateUserService,
  deleteUserService,
  getUserService,
  getUserByIdService,
};
