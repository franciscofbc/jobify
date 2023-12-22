import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/", (req, res) => {
  console.log(req);

  res.json({ message: "data received", data: req.body });
});

//Get All Jobs
app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ jobs });
});

//Create Job
app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    res.status(400).json({ msg: "please provide company and position" });
    return;
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(201).json({ job });
});

//Get Single Job
app.get("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: `no job with id ${id} found` });
    return;
  }
  res.status(200).json({ job });
});

//Edit Job
app.patch("/api/v1/jobs/:id", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    res.status(400).json({ msg: "please provide company and position" });
    return;
  }

  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: `no job with id ${id} found` });
    return;
  }

  job.company = company;
  job.position = position;

  res.status(200).json({ msg: "job modified", job });
});

//Delete Job
app.delete("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: `no job with id ${id} found` });
    return;
  }

  const filteringJobs = jobs.filter((job) => job.id !== id);
  jobs = filteringJobs;

  res.status(200).json({ msg: "job deleted" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server listening on port ${port}...`);
});
