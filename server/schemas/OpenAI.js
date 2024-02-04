const express = require('express');
const router = express.Router();
const openai = require('../config/openaiClient');
const { default: AssignmentDetails } = require('../../client/src/components/AssignmentDetail');
const { default: FileViewer } = require('../../client/src/components/FileViewer');

router.post('/generate', async (req, res) => {
    try {
        const { AssignmentDetails, FileViewer } = req.body;

        if (!AssignmentDetails || !FileViewer) {
            return res.status(400).json({ error: "Assignment instructions, marking criteria, and essay text are required." });
        }

        const messages = [
            { "role": "system", "content": "You are a helpful assistant acting as a teacher marking an essay based on the assignment instructions and marking criteria below. Give strengths and targets for improvement starting with individual sentences, followed by paragraphs and holistic feedback." },
            { "role": "user", "content": `Assignment Instructions: ${AssignmentDetails}` },
            { "role": "user", "content": `Essay: ${FileViewer}` }
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

        if (completion.choices && completion.choices.length > 0) {
            res.json({ feedback: completion.choices[0].message.content });
        } else {
            res.status(500).json({ error: "No response from OpenAI API" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;