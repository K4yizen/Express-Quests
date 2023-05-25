const database = require("./database");



const getUsers = async (req, res) => {
    let sql = "SELECT * FROM users";
    const sqlValues = [];
  
    if (req.query.language != null) {
      sql += " WHERE language = ?";
      sqlValues.push(req.query.language);
    }
  
    if (req.query.city != null) {
      if (sqlValues.length > 0) {
        sql += " AND city = ?";
      } else {
        sql += " WHERE city = ?";
      }
      sqlValues.push(req.query.city);
    }
  
    try {
      const [users] = await database.query(sql, sqlValues);
  
      if (users.length === 0) {
        // Si la liste est vide, renvoie une réponse 200 avec un tableau vide
        res.status(200).json([]);
      } else {
        res.status(200).json(users);
      }
    } catch (error) {
      console.error("Error retrieving data from database:", error);
      res.status(500).send("Error retrieving data from database");
    }
}

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

const createUser = async (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
  
    try {
        const [result] = await database.query("INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)", [firstname, lastname, email, city, language]);
  
      // Récupérez l'ID du nouvel utilisateur inséré
      const newUserId = result.insertId;
  
      // Créez l'objet de réponse avec les détails de l'utilisateur créé
      const newUser = { id: newUserId, firstname, lastname, email, city, language};
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const updateUser = async (req, res) => {
    const userId = parseInt(req.params.id);
    const { firstname, lastname, email, city, language } = req.body;
  
    try {
      const [result] = await database.query(
        "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?",
        [firstname, lastname, email, city, language, userId]
      );
  
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send("Error updating the user");
    }
  };

  const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("delete from users where id = ?", [id])
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error deleting the user");
      });
  };


module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
