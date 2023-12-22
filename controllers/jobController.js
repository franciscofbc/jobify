import { nanoid } from 'nanoid';

let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
];

export const getAllJobs = (req, res) => {
  res.status(200).json({ jobs });
};

export const createJob = (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    res.status(400).json({ msg: 'please provide company and position' });
    return;
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(201).json({ job });
};
export const getSingleJob = (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: `no job with id ${id} found` });
    return;
  }
  res.status(200).json({ job });
};
export const editJob = (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    res.status(400).json({ msg: 'please provide company and position' });
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

  res.status(200).json({ msg: 'job modified', job });
};
export const deleteJob = (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: `no job with id ${id} found` });
    return;
  }

  const filteringJobs = jobs.filter((job) => job.id !== id);
  jobs = filteringJobs;

  res.status(200).json({ msg: 'job deleted' });
};
