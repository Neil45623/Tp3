const express = require("express");
const User = require("./user.model");
const router = express.Router();

// Supprimer l'utilisateur
router.delete("/users/:id", async (demande, reponse) => {
  try {
    await User.deleteOne({ _id: demande.params.id });
    reponse.status(204).send();
  } catch {
    reponse.status(404);
    reponse.send({ error: "L'utilisateur n'est pas existant !" });
  }
});

module.exports = router;


// Créer un utilisateur
router.post("/users", async (demande, reponse) => {
  const user = new User({
    title: demande.body.title,
    content: demande.body.content,
  });
  await user.save();
  reponse.send(user);
});

// Get un utilisateur individuellement
router.get("/users/:id", async (demande, reponse) => {
  try {
    const user = await User.findOne({ _id: demande.params.id });
    reponse.send(user);
  } catch {
    reponse.status(404);
    reponse.send({ error: "L'utilisateur n'est pas existant !" });
  }
});

// Get tous les utilisateurs
router.get("/users", async (demande, reponse) => {
  const users = await User.find();
  reponse.send(users);
});

// Met à jour l'utilisateur
router.patch("/users/:id", async (demande, reponse) => {
  try {
    const user = await User.findOne({ _id: demande.params.id });

    if (demande.body.title) {
      user.title = demande.body.title;
    }

    if (demande.body.content) {
      user.content = demande.body.content;
    }

    await user.save();
    reponse.send(user);
  } catch {
    reponse.status(404);
    reponse.send({ error: "L'utilisateur n'existe pas !" });
  }
});

