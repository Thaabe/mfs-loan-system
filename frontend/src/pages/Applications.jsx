import { useEffect, useState } from "react";

export default function Applications() {
  const [apps, setApps] = useState([]);

  const fetchApps = () => {
    fetch("http://localhost:5000/api/applications")
      .then(r => r.json())
      .then(d => setApps(d));
  };

  useEffect(() => {
    fetchApps();
  }, []);

  return (
    <div className="applications-container">
      <h2 className="page-title">Applications</h2>

      <div className="applications-grid">
        {apps.length === 0 && (
          <p>No applications found. Submit a new application first.</p>
        )}

        {apps.map(a => (
          <div className={`application-card ${a.status}`} key={a.id}>
            
            {/* Header */}
            <div className="card-header">
              <div className={`status-badge ${a.status}`}>
                {a.status}
              </div>
              <div className="score">
                Score: {a.credit}/100
              </div>
            </div>

            {/* Body */}
            <div className="card-body">
              <h3 className="applicant-name">{a.name}</h3>

              <p className="email">{a.email}</p>

              <div className="loan-info">
                <span className="amount">M{a.amount}</span>
                <span className="period">{a.period} months</span>
              </div>

              <p className="purpose">
                {a.purpose || "Loan application details"}
              </p>

              <div className="details">
                <p><strong>Income:</strong> M{a.income}</p>
                <p><strong>Expenses:</strong> M{a.expenses}</p>
                <p><strong>Debt:</strong> M{a.debt}</p>
                <p><strong>Employment:</strong> {a.employment}</p>
                <p><strong>Age:</strong> {a.age}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="card-footer">
              <small>Application ID: {a.id}</small>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}