const pool = require("../models/index.js");

const getRoom = (roomId, callback) => {
  const query = {
    text:
      "SELECT roominfo.*, ((SELECT ARRAY_AGG('[' || amenitytype || ',' || name || ',' || COALESCE(icon, '0') || ',' || COALESCE(explanation, '0') || ']') AS explanation FROM amenities WHERE roominfo.id = amenities.room_id)) FROM roominfo WHERE roominfo.id = $1;",
    values: [roomId]
  };
  pool.query(query, (err, res) => {
    if (err) {
      console.log(err);
    }
    callback(res.rows);
  });
};

const createRoom = (roomInfo, callback) => {
  const room = new db.Room(roomInfo);
  room.save(callback);
};

const updateRoom = (newRoom, id, callback) => {
  db.Room.findByIdAndUpdate(id, newRoom, { new: true }, callback);
};

const deleteRoom = (id, callback) => {
  db.Room.findByIdAndRemove(id, callback);
};

module.exports = {
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom
};
