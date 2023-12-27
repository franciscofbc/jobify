import Job from "../models/JobModel.js";

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json({ jobs });
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const job = await Job.create({ company, position });
  res.status(201).json({ job });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    res.status(404).json({ msg: `no job with id ${id} found` });
    return;
  }
  res.status(200).json({ job });
};

export const updateJob = async (req, res) => {
  const { company, position } = req.body;
  const { id } = req.params;

  const job = await Job.findByIdAndUpdate(
    id,
    { company, position },
    { new: true } //return the new one
  );

  if (!job) {
    res.status(404).json({ msg: `no job with id ${id} found` });
    return;
  }

  res.status(200).json({ msg: "job modified", job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndDelete(id);
  if (!job) {
    res.status(404).json({ msg: `no job with id ${id} found` });
    return;
  }
  res.status(200).json({ msg: "job deleted", job });
};
