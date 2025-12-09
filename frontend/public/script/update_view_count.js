document.addEventListener("DOMContentLoaded", async function () {
    const counterElement = document.querySelector(".misc-count");

    try {
        // Call Azure Function (POST increments the counter)
        const response = await fetch("https://viewcounterappcrc.azurewebsites.net/api/view_counter", {
            method: "POST"
        });

        if (!response.ok) {
            console.error("Failed to reach Azure Function");
            counterElement.textContent = "Error";
            return;
        }

        const updatedCount = await response.text();

        // Update HTML
        counterElement.textContent = updatedCount;

    } catch (error) {
        console.error("Error calling Azure Function:", error);
        counterElement.textContent = "Error";
    }
});