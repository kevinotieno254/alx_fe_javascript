document.addEventListener("DOMContentLoaded", () => {
  const quotes = [
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

  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>${quote.category}</em></p>`;
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

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    showRandomQuote();
  };

  showRandomQuote();
});
