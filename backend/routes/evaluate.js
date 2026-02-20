const express = require("express");
const { exec } = require("child_process");

const router = express.Router();

router.post("/", (req, res) => {
  const { age, employment, income, expenses, credit, debt, amount, period } = req.body;

  // Build Prolog query
  const prologQuery = `
    consult('backend/prolog/rules.pl'),
    (approve(${age},${employment === 'employed' ? 'employed' : 'unemployed'},${income},${expenses},${credit},${debt},${amount},${period}) -> writeln(approved);
     conditional(${age},${employment === 'employed' ? 'employed' : 'unemployed'},${income},${expenses},${credit},${debt},${amount},${period}) -> writeln(conditional);
     writeln(rejected)).
    halt.
  `;

  exec(`swipl -q -t "${prologQuery}"`, (error, stdout, stderr) => {
    if (error) return res.status(500).json({ error: stderr || error.message });
    const decision = stdout.trim();
    res.json({ decision });
  });
});

module.exports = router;
