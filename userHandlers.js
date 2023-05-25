const database = require("./database");

const getUsers = async (req, res) => {
  try {
    const [rows] = await database.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching users from the database:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const [rows] = await database.query("SELECT * FROM users WHERE id = ?", [userId]);
    const user = rows[0];

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    console.error("Error fetching user from the database:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUsers,
  getUserById,
};
