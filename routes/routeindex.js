const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const Task = require("../model/task");

var isEdit = new Boolean(false);

router.get("/", async function (req, res) {
  var entries = await Task.find();
  res.render("index", { entries });
});

router.get("/newPost", async (req, res) => {
  res.render("newPost");
});

router.post("/newPost", async (req, res) => {
  var entry = new Task(req.body);
  await entry.save();
  res.redirect("/");
  res.end();
});

router.get("/editPost/:id", async (req, res) => {
  var id = req.params.id;
  var entry = await Task.findById(id);
  isEdit = true;
  res.render("edit", { entry, isEdit });
});

router.post("/editPost/:id", async (req, res) => {
  await Task.updateOne(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        post_data: req.body.post_data,
      },
    }
  );
  res.redirect("/");
  res.end();
});

router.get("/deletePost/:id", async (req, res) => {
  var id = req.params.id;
  var entry = await Task.findById(id);
  isEdit = false;
  res.render("edit", { entry, isEdit });
});

router.post("/deletePost/:id", async (req, res) => {
  var id = req.params.id;
  await Task.deleteOne({ _id: id });
  res.redirect("/");
  res.end();
});

module.exports = router;
