import { useState } from "react";

export default function RuleConfig() {
  const [debtToIncome, setDebtToIncome] = useState(40);
  const [debtWeight, setDebtWeight] = useState(25);

  const [creditScore, setCreditScore] = useState(600);
  const [creditWeight, setCreditWeight] = useState(30);

  return (
    <div className="card">
      <h2>⚠ Risk Rules</h2>

      {/* ================= Debt To Income ================= */}
      <div className="rule-box">
        <h3>Debt To Income</h3>
        <p className="subtitle">Debt-to-income ratio must be below 40%</p>

        <div className="rule-row">
          <div className="input-group">
            <label>Threshold Value</label>
            <input
              type="number"
              value={debtToIncome}
              onChange={(e) => setDebtToIncome(e.target.value)}
            />
            <small>Current threshold: {debtToIncome}%</small>
          </div>

          <div className="slider-group">
            <label>Weight ({debtWeight}%)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={debtWeight}
              onChange={(e) => setDebtWeight(e.target.value)}
            />
            <div className="slider-labels">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Credit Score ================= */}
      <div className="rule-box">
        <h3>Credit Score</h3>
        <p className="subtitle">Credit score must be above 600</p>

        <div className="rule-row">
          <div className="input-group">
            <label>Threshold Value</label>
            <input
              type="number"
              value={creditScore}
              onChange={(e) => setCreditScore(e.target.value)}
            />
            <small>Current threshold: {creditScore}</small>
          </div>

          <div className="slider-group">
            <label>Weight ({creditWeight}%)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={creditWeight}
              onChange={(e) => setCreditWeight(e.target.value)}
            />
            <div className="slider-labels">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}