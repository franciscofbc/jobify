import { StatusCodes } from 'http-status-codes';
import Job from '../models/JobModel.js';

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const job = await Job.create({ company, position });
  res.status(StatusCodes.CREATED).json({ job });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { company, position } = req.body;
  const { id } = req.params;
  const job = await Job.findByIdAndUpdate(
    id,
    { company, position },
    { new: true } //return the new one
  );
  res.status(StatusCodes.OK).json({ msg: 'job modified', job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ msg: 'job deleted', job });
};
