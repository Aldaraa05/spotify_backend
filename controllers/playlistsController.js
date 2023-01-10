const { Playlist } = require("../models/playlistsModels");
const { Song } = require("../models/songModels");

exports.createPlaylist = async (req, res) => {
  const body = req.body;
  const result = await new Playlist(body).save();
  res.send(result);
};

exports.getPlaylists = async (req, res) => {
  const id = req.params.id;
  const result = await Playlist.find().populate({
    path: "songs",
    populate: [
      {
        path: "artist",
      },
    ],
  });
  res.send(result);
};

exports.getPlaylist = async (req, res) => {
  const id = req.params.id;
  const playlist = await Playlist.findById(id).populate({
    path: "songs",
    populate: [
      {
        path: "artist",
      },
    ],
  });
  res.send(playlist);
};

exports.deletePlaylist = async (req, res) => {
  const { id } = req.params;
  const playlist = await Playlist.findByIdAndRemove({ _id: id });
  res.send(playlist);
};

exports.updatePlaylis = async (req, res) => {
  const { id } = req.params;
  const playlist = await Playlist.findByIdAndUpdate({ _id: id }, req.body);
  res.send(playlist);
};

exports.addToPlaylist = async (req, res) => {
  const playlistId = req.params.id;
  const body = req.body;
  const result = await new Song(body);
  let error = Song.validate();
  try {
    await result.save();
  } catch (err) {
    error = err;
  }
  res.send(error);

  const playlist = await Playlist.findByIdAndUpdate(playlistId);

  playlist.songs.push(result.id);

  await playlist.save();

  res.send(playlist);
};
exports.addSong = async (req, res) => {
  const playlistId = req.params.id;
  const songId = req.body.id;

  const playlist = await Playlist.findById(playlistId);

  playlist.songs.push(songId);

  await playlist.save();

  res.send(playlist);
};
// exports.addToSong = async (req, res) => {
//   const songsId = req.params.id;
//   const artistsId = req.body.id;

//   const song = await Song.findById(songsId);

//   song.artist.push(artistsId);

//   await song.save();

//   res.send(song);
// };
