document.addEventListener("DOMContentLoaded", () => {
  let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    {
      text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      category: "Inspirational",
    },
    {
      text: "The way to get started is to quit talking and begin doing.",
      category: "Motivational",
    },
    {
      text: "Your time is limited, don't waste it living someone else's life.",
      category: "Life",
    },
  ];

  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteButton = document.getElementById("newQuote");
  const exportQuotesButton = document.getElementById("exportQuotes");

  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>${quote.category}</em></p>`;
  }

  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }

  newQuoteButton.addEventListener("click", showRandomQuote);

  window.addQuote = function () {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document
      .getElementById("newQuoteCategory")
      .value.trim();

    if (newQuoteText === "" || newQuoteCategory === "") {
      alert("Please enter both a quote and a category.");
      return;
    }

    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes();

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    showRandomQuote();
  };

  exportQuotesButton.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
  });

  window.importFromJsonFile = function (event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert("Quotes imported successfully!");
      showRandomQuote();
    };
    fileReader.readAsText(event.target.files[0]);
  };

  showRandomQuote();
});
