import express from "express";
import {
  newloan,
  loans,
  loan,
  updateloan,
  totalloans,
} from "../controllers/loan.controllers.js";

const router = express.Router();

router.post("/create", newloan);
router.get("/getloans/:id", loans);
router.get("/getloan/:id", loan);
router.get("/getloans", totalloans);
router.put("/updateloan/:id", updateloan);

export default router;
