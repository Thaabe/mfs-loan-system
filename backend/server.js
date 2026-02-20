const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

let applications = [];

app.post("/api/applications", (req, res) => {
  const appData = req.body;
  appData.id = Date.now();

  const { age, employment, income, expenses, credit, debt, amount, period } = appData;

  // Prolog expects atoms (not strings)
  const empAtom = employment === "employed" ? "employed" : "unemployed";

  // Path to rules.pl inside prolog folder
  const rulesPath = path.join(__dirname, "prolog", "rules.pl");

  // Use wrapper predicate "decide/8"
  const query = `"C:\\Program Files\\swipl\\bin\\swipl.exe" -q -s "${rulesPath}" -g "decision(${age}, '${empAtom}', ${income}, ${expenses}, ${credit}, ${debt}, ${amount}, ${period}, Status), write(Status), halt."`;

  

  exec(query, (error, stdout) => {
    if (error) {
      console.error("Prolog Error:", error);
      return res.status(500).json({ error: error.message });
    }

    const decision = stdout.trim();
    console.log("Prolog decision:", decision);

    appData.status = decision || "undefined";
    applications.push(appData);

    res.json(appData);
  });
});

/* ===============================
   GET ALL APPLICATIONS
================================= */
app.get("/api/applications", (req, res) => {
  res.json(applications);
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
