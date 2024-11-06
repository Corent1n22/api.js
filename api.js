const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const users = [
    { id: 1, firstName: "John", lastName: "Doe", role: "admin" },
    { id: 2, firstName: "Jane", lastName: "Smith", role: "user" },
    { id: 3, firstName: "Alice", lastName: "Johnson", role: "moderator" },
    { id: 4, firstName: "Bob", lastName: "Brown", role: "user" },
    { id: 5, firstName: "Charlie", lastName: "Davis", role: "admin" },
]

app.get("/", (req, res) => {
    res.json(users)
})

app.post("/", (req, res) => {
    const { firstName, lastName } = req.body
    const lastId = users[users.length - 1].id
    const newId = lastId + 1
    const newUser = {
        firstName,
        lastName,
        id: newId,
    }
    users.push(newUser)
    res.status(201).json(newUser)
})

app.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex < 0) {
        return res.status(404).json({ msg: "utilisateur non trouvé" });
    }

    const { firstName, lastName } = req.body;

    if (firstName) users[userIndex].firstName = firstName;
    if (lastName) users[userIndex].lastName = lastName;

    res.json({
        msg: "utilisateur mis à jour",
        user: users[userIndex],
    });
});

app.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex < 0) {
        return res.status(404).json({ msg: "utilisateur non trouvé" });
    }

    users.splice(userIndex, 1);

    res.json({
        msg: "utilisateur supprimé",
    });
});

app.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex < 0) {
        return res.status(404).json({ msg: "utilisateur non trouvé" });
    }

    res.json(users[userIndex]);
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});