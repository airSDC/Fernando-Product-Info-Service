const app = require("express");
const ctrl = require("./../controllers");
const router = app.Router();
const bodyParser = require("body-parser");
const redis = require("redis");
const redisClient = redis.createClient();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// router.get('/', ctrl.main.home);

const getCache = (req, res) => {
  let isbn = req.params.id;
  redisClient.get(isbn, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      ctrl.getRoom(req.params.id, (err, data) => {
        if (err) {
          console.log("I got an error", err);
          res.status(404).send(err);
        }
        res.json(data);
      });
    }
  });
};

router.get("/rooms/:id/roominfo", getCache);

router.post("/rooms/:id", (req, res) => {
  console.log("POST got triggered");
  const roomInfo = req.params;
  ctrl.createRoom(roomInfo, (err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).send();
  });
});

router.put("/rooms/:id/room", (req, res) => {
  console.log("PUT got triggered");
  const changes = req.body;
  const id = req.params.id;
  ctrl.updateRoom(changes, id, (err, room) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(room);
  });
});

router.delete("/rooms/:id/room", (req, res) => {
  console.log("DELETE got triggered");
  const id = req.params.id;
  ctrl.deleteRoom(id, err => {
    if (err) {
      res.status(500).send(err);
    }
    const response = {
      message: `Room ${id} was deleted.`,
      id
    };
    res.status(200).send(response);
  });
});

module.exports = router;
