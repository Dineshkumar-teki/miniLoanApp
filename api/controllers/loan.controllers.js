import Loan from "../model/loan.model.js";

export const newloan = async (req, res) => {
  const { amount, term, id } = req.body;
  if (!amount || !term) {
    return res.status(400).json({ message: "Required all fields!!" });
  }

  let intervals = [];
  let sum = 0;
  for (let i = 0; i < parseInt(term); i++) {
    let part = Math.round(parseFloat(amount) / term);
    if (i == parseInt(term) - 1) {
      part = parseFloat(amount) - sum;
    }
    intervals.push({ emi: part, isPaid: false });
    sum += part;
  }
  const newLoan = new Loan({
    amount,
    term,
    intervals,
    owner: id,
    isApproved: "pending",
  });
  try {
    const savedLoan = await newLoan.save();
    res.status(201).json({ message: savedLoan });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const loans = async (req, res) => {
  try {
    const loans = await Loan.find({ owner: req.params.id });
    res.status(200).json({ count: loans.length, loans });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export const totalloans = async (req, res) => {
  try {
    const loans = await Loan.find({});
    res.status(200).json({ count: loans.length, loans });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export const loan = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const loan = await Loan.find({ owner: id });
    res.status(200).json(loan);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export const updateloan = async (req, res) => {
  const { isApproved } = req.body;
  console.log(req.body);
  if (req.body.role !== "admin") {
    return res.status(400).json({ msg: "you are not allowed to update loan" });
  }

  try {
    const loan = await Loan.findById(req.params.id);

    const plainLoan = loan.toObject ? loan.toObject() : loan;

    const loanToUpdate = {
      ...plainLoan,
      isApproved,
    };

    const updatedLoan = await Loan.findByIdAndUpdate(
      req.params.id,
      loanToUpdate
    );
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};
