require("dotenv").config(); // Load environment variables

const express = require("express");
const { tavily } = require("@tavily/core");

const app = express();
const PORT = process.env.PORT || 4000;
const apiKey = process.env.TVLY_API_KEY;

const tvly = tavily({ apiKey });

app.use(express.json());

app.post("/search", async (req, res) => {
    try {
        const { query } = req.body;
        console.log(query);

        if (!query) {
            return res.status(400).json({ error: "Query is required" });
        }

        console.log("Response start \n");

        const response = await tvly.search(query); // Awaiting API response
        console.log(response);

        res.json(response); // Send the response back
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
