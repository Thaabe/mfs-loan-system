import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewApplication() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    age: "",
    employment: "employed",
    income: "",
    expenses: "",
    debt: "",
    credit: "",
    amount: "",
    period: "",
    description: ""
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  // ✅ Submit to backend which calls SWI-Prolog automatically
  const submit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          age: Number(form.age),
          income: Number(form.income),
          expenses: Number(form.expenses),
          debt: Number(form.debt),
          credit: Number(form.credit),
          amount: Number(form.amount),
          period: Number(form.period)
        })
      });

      const data = await res.json();

      // Show decision returned by Prolog
      alert("Loan Decision: " + data.status);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to submit application. Check backend.");
    }
  };

  const steps = ["Personal", "Financial", "Credit", "Loan"];

  return (
    <div className="card">
      <h2>New Loan Application</h2>

      {/* Progress Bar */}
      <div className="progress-bar">
        {steps.map((label, i) => (
          <div key={i} className={`step ${step === i + 1 ? "active" : step > i + 1 ? "completed" : ""}`}>
            <div className="circle">{i + 1}</div>
            <div className="label">{label}</div>
            {i < steps.length - 1 && <div className="line"></div>}
          </div>
        ))}
      </div>

      {/* Form Step */}
      <div className="form-step">
        {step === 1 && (
          <>
            <h3>Personal Details</h3>
            <input placeholder="Name" value={form.name} onChange={handleChange("name")} />
            <input placeholder="Age" type="number" value={form.age} onChange={handleChange("age")} />
            <select value={form.employment} onChange={handleChange("employment")}>
              <option value="employed">Employed</option>
              <option value="unemployed">Unemployed</option>
            </select>
          </>
        )}

        {step === 2 && (
          <>
            <h3>Financial Details</h3>
            <input placeholder="Income" type="number" value={form.income} onChange={handleChange("income")} />
            <input placeholder="Expenses" type="number" value={form.expenses} onChange={handleChange("expenses")} />
            <input placeholder="Debt" type="number" value={form.debt} onChange={handleChange("debt")} />
          </>
        )}

        {step === 3 && (
          <>
            <h3>Credit Details</h3>
            <input placeholder="Credit Score" type="number" value={form.credit} onChange={handleChange("credit")} />
          </>
        )}

        {step === 4 && (
          <>
            <h3>Loan Details</h3>
            <input placeholder="Loan Amount" type="number" value={form.amount} onChange={handleChange("amount")} />
            <input placeholder="Repayment Period (Months)" type="number" value={form.period} onChange={handleChange("period")} />
            <textarea placeholder="Describe the purpose of the loan..." value={form.description} onChange={handleChange("description")} />
          </>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="form-buttons">
        {step > 1 && <button onClick={prevStep}>Previous</button>}
        {step < 4 && <button onClick={nextStep}>Next</button>}
        {step === 4 && <button onClick={submit}>Submit Application</button>}
      </div>

      {/* Styles */}
      <style jsx>{`
        .progress-bar { display: flex; align-items: center; margin-bottom: 20px; }
        .step { display: flex; align-items: center; position: relative; flex: 1; }
        .circle { width: 30px; height: 30px; border-radius: 50%; background: #555; color: white; display: flex; justify-content: center; align-items: center; z-index: 1; }
        .step.active .circle { background: #22c55e; }
        .step.completed .circle { background: #22c55e; }
        .label { margin-left: 8px; color: white; font-size: 0.9rem; }
        .line { position: absolute; top: 50%; left: calc(100% + 5px); height: 4px; background: #555; flex: 1; z-index: 0; width: calc(100% - 30px); }
        .step.completed .line { background: #22c55e; }
      `}</style>
    </div>
  );
}
