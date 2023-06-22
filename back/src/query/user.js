const { db } = require("../config/db");

const createUserQuery = async (body) => {
  const trx = await db.transaction();
  try {
    console.log(`body :`, body);
    const response = (await trx(`users`).insert(body)) || null;
    await trx.commit();
    return response;
  } catch (error) {
    console.log(`error :`, error);
    await trx.rollback();
    return false;
  } finally {
    trx.isCompleted();
  }
};

const updateUserQuery = async (key, body) => {
  const trx = await db.transaction();
  try {
    await trx(`users`).update(body).where(`id`, key);
    await trx.commit();
    return true;
  } catch (error) {
    console.log(`error :`, error);
    await trx.rollback();
    return false;
  } finally {
    trx.isCompleted();
  }
};

const deleteUserQuery = async (key, body) => {
  const trx = await db.transaction();
  try {
    await trx(`users`).where(`id`, key).del();
    await trx.commit();
    return true;
  } catch (error) {
    console.log(`error :`, error);
    await trx.rollback();
    return false;
  } finally {
    trx.isCompleted();
  }
};

const selectUserById = async (id) => {
  return await db.select().from(`users`).where("id", id);
};

const selectDuplicateUser = async (first_name, last_name) => {
  return await db.select().from(`users`).where({ first_name, last_name });
};

const generatePagination = async (page) => {
  const firstIndex = (page - 1) * 10;
  const lastIndex = firstIndex + 10;
  const sql = `SELECT *, (select count(id) from users u2) as last_page FROM 
    (SELECT id, first_name, last_name, CASE gender
        WHEN 'F' THEN "Female"
        WHEN 'M' THEN "Male"
        ELSE NULL
    END as 'gender', birth_date, image, row_number() OVER (ORDER BY id asc) as RowNum FROM users) as t1 where RowNum > ? and RowNum <= ? ;`;
  const prepareBinding = [firstIndex, lastIndex];
  return await db.raw(sql, prepareBinding);
};

module.exports = {
  createUserQuery,
  updateUserQuery,
  selectUserById,
  deleteUserQuery,
  generatePagination,
  selectDuplicateUser,
};
