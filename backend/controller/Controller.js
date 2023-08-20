import bcrypt from 'bcrypt';
import { where } from 'sequelize';
import Users from '../model/index.js';

export const getData = async(req, res) => {
  try {
    const data = await Users.findAll({
      attributes: ["id","firstName", "lastName"]
    });
    if (!data) res.status(404).json({ msg: "data not found."});
    res.status(200).json(data);
  } catch (error) {
    console.log(error)
  }
};

export const putData = async(req, res) => {
  const { firstName, lastName, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existed = await Users.findOne({ where : { firstName: firstName, lastName: lastName } });
  if (existed) return res.status(400).json({ msg: "name already used."});
  await Users.create({
    firstName: firstName,
    lastName: lastName,
    password: hashedPassword
  });
  res.status(200).json({msg: "account already created."})
};

export const updateData = async(req, res) => {
  const { id, firstName, lastName } = req.body;
  if (!id || !firstName || !lastName) return res.status(400).json({ msg: "missing parameter." });
  console.log(id, firstName, lastName);
  const found = await Users.update(
    { firstName, lastName },
    {where: { id: id }}
  );
  if (!found) return res.status(404).json({ msg: "user not found." });
  res.status(200).json({ msg: "data has been updated."});
};

export const deleteData = async(req,res) => {
  const { id, firstName, lastName } = req.body;
  try {
    await Users.destroy({
      where: {
        id: id,
        firstName: firstName,
        lastName: lastName
      }
    });
    res.status(200).json({ msg: "data has been deleted" });
  } catch (error) {
    console.log(error)
  }
}