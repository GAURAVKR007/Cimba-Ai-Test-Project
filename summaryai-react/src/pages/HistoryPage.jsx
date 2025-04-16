import React, { useEffect, useState } from "react";

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch("http://localhost:8080/history/fetch");
      const data = await res.json();
      setHistory(data);
    };
    fetchHistory();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Summary History</h2>
      <div className="space-y-6">
        {history.length === 0 ? (
          <p className="text-gray-500">No history yet.</p>
        ) : (
          history.map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow border border-gray-200"
            >
              <div className="mb-2 text-blue-700">
                <span className="font-medium text-gray-700">URL:</span>{" "}
                {item.url}
              </div>
              <div className="mb-2">
                <span className="font-medium text-gray-700">Summary:</span>
                <p className="text-gray-600 mt-1 whitespace-pre-line">
                  {item.summary}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
