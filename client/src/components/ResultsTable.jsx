function verdictColor(verdict) {
  switch (verdict) {
    case "Strong Match":  return "#16a34a";
    case "Good Match":    return "#2563eb";
    case "Partial Match": return "#d97706";
    case "Poor Match":    return "#dc2626";
    default:              return "#6b7280";
  }
}

function ResultsTable({ results }) {
  const exportCSV = () => {

    const header = ["Rank", "Filename", "Score", "Verdict", "Summary"];
    const rows = results.map((r, i) =>
      [i + 1, r.filename, r.score, r.verdict, `"${r.summary}"`].join(",")
    );

    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "results.csv";
    a.click();
  };

  return (
    <section className="results-section" aria-label="Ranked Resume Results">

      <header className="results-header">

        <h2>Results ({results.length} resumes ranked)</h2>
        <button className="btn-secondary" onClick={exportCSV}>
          Export CSV
        </button>

      </header>

      {results.map((r, i) => (
        <article className="result-card" key={i} aria-label={`Result for ${r.filename}`}>

          <header className="result-top">

            <span className="rank">#{i + 1}</span>
            <span className="filename">{r.filename}</span>
            <span className="score">{r.score}/100</span>
            <span
              className="verdict"
              style={{ color: verdictColor(r.verdict) }}
            >
              {r.verdict}
            </span>
            
          </header>

          <p className="summary">{r.summary}</p>

          <section className="result-details" aria-label="Strengths and Gaps">

            <aside>
              <strong>Strengths</strong>
              <ul>
                {r.strengths.map((s, j) => <li key={j}>{s}</li>)}
              </ul>
            </aside>

            <aside>
              <strong>Gaps</strong>
              <ul>
                {r.gaps.map((g, j) => <li key={j}>{g}</li>)}
              </ul>
            </aside>

          </section>

        </article>
      ))}

    </section>
  );
}

export default ResultsTable;