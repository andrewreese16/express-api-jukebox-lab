const express = require("express");
const router = express.Router();

const TrackModel = require("../models/track");

// INDEX ROUTE

router.get("/", async function (req, res) {
  try {
    const foundTracks = await TrackModel.find({});
    res.status(200).json(foundTracks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// SHOW ROUTE

router.get("/:trackId", async function (req, res) {
  try {
    const foundTrack = await TrackModel.findById(req.params.trackId);
    if (!foundTrack) {
      res.status(404);
      throw new Error("Track not found");
    }
    res.status(200).json(foundTrack);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
});

// UPDATE ROUTE

router.put("/:trackId", async function (req, res) {
  try {
    const updatedTrack = await TrackModel.findByIdAndUpdate(
      req.params.trackId,
      req.body,
      { new: true }
    );
    if (!updatedTrack) {
      res.status(400);
      throw new Error("Track not found");
    }
    res.status(200).json(updatedTrack);
  } catch (err) {
    if (res.statusCode === 404) {
      return res.json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
});

// DELETE ROUTE

router.delete("/:trackId", async function (req, res) {
  try {
    const deletedTrack = await TrackModel.findByIdAndDelete(req.params.trackId);
    if (!deletedTrack) {
      res.status(404);
      throw new Error("Track was not deleted");
    }
    res.status(200).json({ message: "Track was deleted!" });
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
});

// CREATE ROUTE

router.post("/", async function (req, res) {
  try {
    const createdTrack = await TrackModel.create(req.body);
    res.status(201).json({ data: createdTrack });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
