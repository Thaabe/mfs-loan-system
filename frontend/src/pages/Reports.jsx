import { useEffect, useState } from "react";

export default function Reports() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/applications")
      .then((r) => r.json())
      .then((d) => setApps(d));
  }, []);

  const total = apps.length;

  // ---------- STATUS ----------
  const approved = apps.filter(a => a.status?.toLowerCase() === "approved").length;
  const rejected = apps.filter(a => a.status?.toLowerCase() === "rejected").length;
  const conditional = apps.filter(a => a.status?.toLowerCase() === "conditional").length;

  // ---------- DYNAMIC RISK CALCULATION ----------
  const calculateRisk = (app) => {
    let risk = "Low";

    const credit = Number(app.creditScore);
    const income = Number(app.income);
    const loan = Number(app.loanAmount);

    if (credit < 600) {
      risk = "High";
    } else if (credit >= 600 && credit < 700) {
      risk = "Medium";
    } else {
      risk = "Low";
    }

    // Loan vs income adjustment
    if (loan > income * 0.5) {
      if (risk === "Low") risk = "Medium";
      else if (risk === "Medium") risk = "High";
    }

    return risk;
  };

  const lowRisk = apps.filter(a => calculateRisk(a) === "Low").length;
  const mediumRisk = apps.filter(a => calculateRisk(a) === "Medium").length;
  const highRisk = apps.filter(a => calculateRisk(a) === "High").length;

  const percent = (value) =>
    total === 0 ? 0 : Math.round((value / total) * 100);

  return (
    <div className="reports-container">
      <h2 className="report-title">Risk Analysis Report</h2>

      <div className="stats-grid">
        <StatCard title="Total Applications" value={total} />
        <StatCard title="Approved" value={approved} color="green" percent={percent(approved)} />
        <StatCard title="Rejected" value={rejected} color="red" percent={percent(rejected)} />
        <StatCard title="Conditional" value={conditional} color="orange" percent={percent(conditional)} />
      </div>

      <div className="risk-grid">
        <RiskCard title="Low Risk" value={lowRisk} percent={percent(lowRisk)} color="green" />
        <RiskCard title="Medium Risk" value={mediumRisk} percent={percent(mediumRisk)} color="orange" />
        <RiskCard title="High Risk" value={highRisk} percent={percent(highRisk)} color="red" />
      </div>

      <style jsx>{`
        .reports-container {
          padding: 30px;
          background: #0f172a;
          min-height: 100vh;
          color: white;
        }

        .report-title {
          font-size: 26px;
          margin-bottom: 25px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .risk-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .card {
          background: #1e293b;
          padding: 20px;
          border-radius: 14px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.4);
          transition: 0.3s ease;
        }

        .card:hover {
          transform: translateY(-4px);
        }

        .title {
          font-size: 14px;
          color: #94a3b8;
        }

        .value {
          font-size: 28px;
          font-weight: bold;
          margin: 10px 0;
        }

        .progress-bar {
          height: 8px;
          border-radius: 10px;
          background: #334155;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          transition: width 0.6s ease;
        }

        .green { background: #22c55e; }
        .red { background: #ef4444; }
        .orange { background: #f59e0b; }

        .percent {
          font-size: 12px;
          margin-top: 6px;
          color: #cbd5e1;
        }
      `}</style>
    </div>
  );
}

function StatCard({ title, value, color, percent }) {
  return (
    <div className="card">
      <div className="title">{title}</div>
      <div className="value">{value}</div>
      {percent !== undefined && (
        <>
          <div className="progress-bar">
            <div className={`progress-fill ${color}`} style={{ width: `${percent}%` }} />
          </div>
          <div className="percent">{percent}% of total</div>
        </>
      )}
    </div>
  );
}

function RiskCard({ title, value, percent, color }) {
  return (
    <div className="card">
      <div className="title">{title}</div>
      <div className="value">{value}</div>
      <div className="progress-bar">
        <div className={`progress-fill ${color}`} style={{ width: `${percent}%` }} />
      </div>
      <div className="percent">{percent}% of total</div>
    </div>
  );
}