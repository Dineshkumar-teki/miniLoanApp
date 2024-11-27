import mongoose, { Schema } from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    term: {
        type: Number,
        required: true,
        default: 3
    },
    isApproved: {
        type: String,
        default: 'initial',
    },
    intervals: [
        {
            type: Object
        }
    ]
  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;
