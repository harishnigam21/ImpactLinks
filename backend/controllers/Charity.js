import Charity from "../models/Charity.js";

export const getCharities = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = { name: { $regex: search, $options: "i" } };
    }

    const charities = await Charity.find(query);
    res.status(200).json(charities);
  } catch (err) {
    console.error("Error From getCharities controller : ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCharityById = async (req, res) => {
  try {
    const charity = await Charity.findById(req.params.id);
    if (!charity) return res.status(404).json({ message: "Charity not found" });
    res.status(200).json(charity);
  } catch (err) {
    console.error("Error From getCharityById controller : ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
