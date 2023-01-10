const express = require("express");
const { model } = require("mongoose");
const {
  createPlaylist,
  getPlaylist,
  deletePlaylist,
  addToPlaylist,
  getPlaylists,
  addSong,
} = require("../controllers/playlistsController");
const { addToSong } = require("../controllers/songsController");

const router = express.Router();

router
  .get("/playlists", getPlaylists)
  .get("/playlists/:id", getPlaylist)
  .post("/playlists", createPlaylist)
  .put("/playlist/:id", addToPlaylist)
  .delete("/playlists/:id", deletePlaylist)
  .put("/playlists/:id", addSong);

exports.playlistRoutes = router;
