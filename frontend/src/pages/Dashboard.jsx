import { useEffect, useState } from "react";

export default function Dashboard() {
  const [apps, setApps] = useState([]);
  const [tab, setTab] = useState("all");

  const fetchApps = () => {
    fetch("http://localhost:5000/api/applications")
      .then((r) => r.json())
      .then((d) => setApps(d));
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const filteredApps = tab === "all" ? apps : apps.filter((a) => a.status === tab);

  const count = (status) => apps.filter((a) => a.status === status).length;

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="header">
        <div>
          <h1>Motsitseng Financial Services</h1>
          <p>Prolog-Based Decision Engine</p>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs">
        {["all", "pending", "approved", "conditional_approved", "rejected"].map((t) => (
          <button
            key={t}
            className={tab === t ? "active-tab" : ""}
            onClick={() => setTab(t)}
          >
            {t.toUpperCase()} {t !== "all" && count(t)}
          </button>
        ))}
      </div>

      {/* SUMMARY CARDS */}
      <div className="summary">
        <div className="summary-card total">
          <p>Total Applications</p>
          <h2>{apps.length}</h2>
        </div>

        <div className="summary-card approved">
          <p>Approved</p>
          <h2>{count("approved")}</h2>
        </div>

        <div className="summary-card conditional">
          <p>Conditional</p>
          <h2>{count("conditional_approved")}</h2>
        </div>

        <div className="summary-card rejected">
          <p>Rejected</p>
          <h2>{count("rejected")}</h2>
        </div>
      </div>

      {/* APPLICATION CARDS */}
      <h2 className="section-title">Applications</h2>
      <div className="grid">
        {filteredApps.map((a) => (
          <div key={a.id} className={`app-card ${a.status}`}>
            <div className="card-header">
              <span className={`badge ${a.status}`}>{a.status}</span>
            </div>
            <h3>{a.name}</h3>
            <p>{a.email}</p>
            <p>{a.description}</p>
          </div>
        ))}
      </div>

      {/* STYLES */}
      <style jsx>{`
        .dashboard {
          background: #0f172a;
          min-height: 100vh;
          color: white;
          padding: 30px;
        }
        .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .tabs { display: flex; gap: 10px; margin-bottom: 25px; }
        .tabs button { padding: 8px 14px; border-radius: 20px; background: #1e293b; border: none; color: white; cursor: pointer; }
        .active-tab { background: #16a34a !important; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .summary-card { padding: 20px; border-radius: 12px; background: #1e293b; }
        .approved { border-left: 5px solid #16a34a; }
        .conditional { border-left: 5px solid orange; }
        .rejected { border-left: 5px solid red; }
        .section-title { margin-bottom: 20px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .app-card { background: #1e293b; padding: 20px; border-radius: 12px; }
        .badge { padding: 5px 10px; border-radius: 12px; font-size: 12px; text-transform: capitalize; }
        .badge.approved { background: #16a34a; }
        .badge.rejected { background: #dc2626; }
        .badge.pending { background: #2563eb; }
        .badge.conditional_approved { background: orange; }
      `}</style>
    </div>
  );
}
