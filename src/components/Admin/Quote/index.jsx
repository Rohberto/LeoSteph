import { useState } from "react";

const Quotes = () => {
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      customer: "John Doe",
      request: "Business Card",
      status: "Pending",
    },
    { id: 2, customer: "Jane Smith", request: "Flyer Design", status: "Sent" },
  ]);

  const updateQuoteStatus = (id, status) => {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) =>
        quote.id === id ? { ...quote, status } : quote
      )
    );
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Quotes</h1>
      <div className="bg-white shadow rounded">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Request</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr key={quote.id} className="border-b">
                <td className="px-4 py-2">{quote.id}</td>
                <td className="px-4 py-2">{quote.customer}</td>
                <td className="px-4 py-2">{quote.request}</td>
                <td className="px-4 py-2">{quote.status}</td>
                <td className="px-4 py-2">
                  <select
                    className="border rounded px-2 py-1"
                    value={quote.status}
                    onChange={(e) =>
                      updateQuoteStatus(quote.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Sent">Sent</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Quotes;
