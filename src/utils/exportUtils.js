export const exportAsCSV = (entries) => {
  const csvRows = [
    ["Date", "Mood", "Weather", "Temperature", "Note"].join(","),
  ];

  entries.forEach((entry) => {
    const row = [
      entry.date,
      entry.mood?.label || "",
      entry.weather?.weather[0]?.main || "",
      entry.weather?.main?.temp
        ? `${Math.round(entry.weather.main.temp)}°C`
        : "",

      `"${entry.note?.replace(/"/g, '""') || ""}"`,
    ];

    csvRows.push(row.join(","));
  });

  const csvContent = csvRows.join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `mood-journal-export-${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportAsPDF = (entries) => {
  alert("PDF export functionality not implemented yet.");
};
