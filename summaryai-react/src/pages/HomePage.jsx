import React, { useState } from "react";

function HomePage() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/postUrlSummary/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      setSummary("Error summarizing the URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Website Summarizer
      </h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter website URL (e.g. https://example.com)"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      />
      <button
        onClick={handleSummarize}
        disabled={!url || loading}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Summarizing..." : "Generate Summary"}
      </button>

      {summary && (
        <div className="mt-6 bg-gray-100 p-4 rounded-md border border-gray-300">
          <h2 className="text-lg font-semibold mb-2">Summary:</h2>
          <p className="text-gray-700 whitespace-pre-line">{summary}</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
