
const API_URL = "http://localhost:8080/api/conversions";

// HTML elements
const form = document.getElementById("converterForm");
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const swapBtn = document.getElementById("swapBtn");
const result = document.getElementById("result");

// Create the conversion history section
const historySection = document.createElement("section");
historySection.className = "history-section";
historySection.innerHTML = `
    <h2>Conversion history</h2>
    <p class="history-description">Your saved conversions</p>
    <div id="history">Loading history...</div>
`;

const converterCard = document.querySelector(".converter-card");

if (converterCard) {
    converterCard.appendChild(historySection);
}

// Format numbers consistently
function formatAmount(value) {
    return Number(value).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Display a conversion result
function displayResult(data) {
    result.textContent =
        `${formatAmount(data.amount)} ${data.fromCurrency} = ` +
        `${formatAmount(data.convertedAmount)} ${data.toCurrency}`;
}

// Swap currencies
swapBtn.addEventListener("click", () => {
    const previousFrom = fromCurrency.value;

    fromCurrency.value = toCurrency.value;
    toCurrency.value = previousFrom;
});

// Convert currency
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const amount = Number(amountInput.value);

    if (!Number.isFinite(amount) || amount <= 0) {
        result.textContent = "Enter an amount greater than zero.";
        return;
    }

    result.textContent = "Converting...";

    try {
        const response = await fetch(`${API_URL}/convert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: amount,
                fromCurrency: fromCurrency.value,
                toCurrency: toCurrency.value
            })
        });

        if (!response.ok) {
            const message = await response.text();
            throw new Error(message || `Request failed: ${response.status}`);
        }

        const data = await response.json();

        displayResult(data);
        await loadHistory();

    } catch (error) {
        console.error("Conversion error:", error);
        result.textContent =
            "Conversion failed. Check that the backend is running.";
    }
});

// Load saved conversion history
async function loadHistory() {
    const history = document.getElementById("history");

    if (!history) return;

    history.textContent = "Loading history...";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`History request failed: ${response.status}`);
        }

        const records = await response.json();

        history.replaceChildren();

        if (!Array.isArray(records) || records.length === 0) {
            history.textContent = "No conversions saved yet.";
            return;
        }

        records.forEach((record) => {
            const item = document.createElement("article");
            item.className = "history-item";

            const info = document.createElement("div");
            info.className = "history-info";

            const id = document.createElement("span");
            id.className = "history-id";
            id.textContent = `CONVERSION #${record.id}`;

            const details = document.createElement("p");
            details.className = "history-details";
            details.textContent =
                `${formatAmount(record.amount)} ${record.fromCurrency} → ` +
                `${formatAmount(record.convertedAmount)} ${record.toCurrency}`;

            info.append(id, details);

            const actions = document.createElement("div");
            actions.className = "history-actions";

            const editButton = document.createElement("button");
            editButton.type = "button";
            editButton.className = "edit-btn";
            editButton.textContent = "Edit";
            editButton.addEventListener("click", () => editRecord(record));

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "delete-btn";
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => deleteRecord(record.id));

            actions.append(editButton, deleteButton);
            item.append(info, actions);
            history.appendChild(item);
        });

    } catch (error) {
        console.error("History error:", error);
        history.textContent =
            "Could not load history. Check that the backend is running.";
    }
}

// Edit a saved conversion
async function editRecord(record) {
    const input = prompt(
        `Enter the new amount for ${record.fromCurrency} to ${record.toCurrency}:`,
        record.amount
    );

    if (input === null) return;

    const amount = Number(input);

    if (!Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid amount greater than zero.");
        return;
    }

    try {
        // Ask the backend to calculate the updated conversion.
        const convertResponse = await fetch(`${API_URL}/convert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: amount,
                fromCurrency: record.fromCurrency,
                toCurrency: record.toCurrency
            })
        });

        if (!convertResponse.ok) {
            throw new Error("Could not calculate the updated conversion.");
        }

        const converted = await convertResponse.json();

        // Update the original record.
        const updateResponse = await fetch(`${API_URL}/${record.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: converted.amount,
                fromCurrency: converted.fromCurrency,
                toCurrency: converted.toCurrency,
                exchangeRate: converted.exchangeRate,
                convertedAmount: converted.convertedAmount
            })
        });

        if (!updateResponse.ok) {
            throw new Error("Could not update the saved conversion.");
        }

        // The conversion endpoint also saves a new record.
        // Remove that extra record after updating the original.
        if (converted.id !== undefined && converted.id !== record.id) {
            const cleanupResponse = await fetch(`${API_URL}/${converted.id}`, {
                method: "DELETE"
            });

            if (!cleanupResponse.ok) {
                console.warn("The extra conversion record could not be removed.");
            }
        }

        await loadHistory();
        alert("Conversion updated successfully.");

    } catch (error) {
        console.error("Edit error:", error);
        alert("Could not edit this conversion. Check the backend logs.");
        await loadHistory();
    }
}

// Delete a saved conversion
async function deleteRecord(id) {
    const confirmed = confirm(`Are you sure you want to delete conversion #${id}?`);

    if (!confirmed) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`Delete failed: ${response.status}`);
        }

        await loadHistory();

    } catch (error) {
        console.error("Delete error:", error);
        alert("Could not delete the conversion. Check the backend.");
    }
}

// Load history when the page opens
loadHistory();
