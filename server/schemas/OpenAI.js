// const express = require('express');
// const router = express.Router();
// const openai = require('../config/openaiClient');
// const Essay = require('../models/Essay'); // Adjust the path to your Essay model

// router.post('/generate', async (req, res) => {
//     try {
//         const { assignmentDetails, essayText } = req.body;

//         if (!assignmentDetails || !essayText) {
//             return res.status(400).json({ error: "Assignment details and essay text are required." });
//         }

//         const messages = [
//             { "role": "system", "content": "You are a helpful assistant acting as a teacher marking an essay based on the assignment instructions and marking criteria below. Give strengths and targets for improvement starting with individual sentences, followed by paragraphs and holistic feedback." },
//             { "role": "user", "content": `Assignment Instructions: ${AssignmentDetails}` },
//             { "role": "user", "content": `Essay: ${FileViewer}` }
//         ];

//         const completion = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: messages,
//         });

//         if (completion.choices && completion.choices.length > 0) {
//             res.json({ feedback: completion.choices[0].message.content });
//         } else {
//             res.status(500).json({ error: "No response from OpenAI API" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// });

// module.exports = router;

// OPENAI.js = Schema
// const express = require('express');
// const router = express.Router();
// const openai = require('../config/openaiClient'); // Ensure this points to your configured OpenAI client
// const Essay = require('../models/Essay'); // Adjust the path to your Essay model
// const Assignment = require('../models/Assignment'); // Ensure this points to your Assignment model

// router.post('/api/essays', async (req, res) => {
//     try {
//         const { assignmentId, text } = req.body;

//         // Fetch the assignment details using assignmentId
//         const assignment = await Assignment.findById(assignmentId);
//         if (!assignment) {
//             return res.status(404).json({ error: "Assignment not found" });
//         }

//         // Save the essay to MongoDB
//         const newEssay = await Essay.create({
//             assignmentId,
//             text,
//         });

//         // Construct the messages array for OpenAI
//         const messages = [
//             { 
//                 "role": "system", 
//                 "content": "You are a helpful assistant acting as a teacher marking an essay based on the assignment instructions and marking criteria below. Give strengths and targets for improvement starting with individual sentences, followed by paragraphs and holistic feedback." 
//             },
//             { 
//                 "role": "user", 
//                 "content": `Assignment Instructions: ${assignment.instructions}` // Assuming your Assignment model has an 'instructions' field
//             },
//             { 
//                 "role": "user", 
//                 "content": `Essay: ${text}` // The essay text submitted by the user
//             }
//         ];

//         // Use messages with OpenAI's ChatGPT model
//         const completion = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: messages,
//             max_tokens: 1024, // Optional: adjust based on the length of feedback you desire
//             temperature: 0.7, // Optional: adjust for creativity of the response
//         });

//         const feedback = completion.data.choices[0].message.content; // Accessing the feedback

//         // Respond with the saved essay details and the generated feedback
//         res.json({
//             message: 'Essay submitted successfully, and feedback generated.',
//             essay: newEssay,
//             feedback: feedback,
//         });
//     } catch (error) {
//         console.error('Error submitting essay and generating feedback:', error);
//         res.status(500).json({ error: 'Failed to submit essay and generate feedback' });
//     }
// });

// module.exports = router;
