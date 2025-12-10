"use client";

export default function Table({ columns, data }) {
  return (
    <table style={table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} style={th}>{col.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} style={idx % 2 ? trOdd : trEven}>
            {columns.map((col) => (
              <td key={col.key} style={td}>
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const table = {
  width: "100%",
  borderCollapse: "collapse",
  borderRadius: "12px",
  overflow: "hidden",
};

const th = {
  textAlign: "left",
  padding: "12px",
  background: "#f8fafc",
  borderBottom: "1px solid #e2e8f0",
  fontWeight: 600,
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #f1f5f9",
};

const trOdd = { background: "#ffffff" };
const trEven = { background: "#f8fafc" };
