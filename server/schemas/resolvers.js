// // Resolvers 
// const { User, Assignment, MarkingCriteria, Essay, Comment } = require('../models');
// const { signToken } = require('../utils/auth');
// const bcrypt = require('bcrypt');

// const resolvers = {
//     Query: {
//         users: async () => {
//             return User.find();
//         },
//         user: async (parent, args) => {
//             return await User.findOne({ _id: args._id });
//         },
//         assignments: async () => {
//             return Assignment.find();
//         },
//         assignment: async (parent, args) => {
//             return await Assignment.findOne({ _id: args._id });
//         },
//         essays: async () => {
//             return Essay.find();
//         },
//         essay: async (_, { _id }) => {
//             try {
//                 const essay = await Essay.findById(_id);
//                 if (!essay) {
//                     throw new Error(`Essay with ID ${_id} not found.`);
//                 }
//                 return essay;
//             } catch (error) {
//                 console.error(`Error fetching essay with ID ${_id}:`, error);
//                 throw new Error(error.message);
//             }
//         },
//         commentsByEssay: async (_, { essayId }) => {
//             return await Comment.find({ essayId }).populate();
//           },
//     },
//     Mutation: {
//         addUser: async (parent, { input }) => {
//             const user = await User.create(input);
//             const token = signToken(user);

//             return { token, user };
//         },
//         login: async (parent, { email, password }) => {
//             const user = await User.findOne({ email });
//             if (!user) throw new Error('Incorrect credentials');
//             const isMatch = await bcrypt.compare(password, user.password);
//             if (!isMatch) throw new Error('Incorrect credentials');
//             const token = signToken(user);
//             return { token, user };
//         },
//         addAssignment: async (parent, { input }) => {
//             const { title, instructions, subjectGroup, markingCriteriaInput } = input;
//             const assignment = new Assignment({ title, instructions, subjectGroup });
            
//             // Save the assignment
//             await assignment.save();

//             // If marking criteria are provided, save them and associate with the assignment
//             if (markingCriteriaInput && markingCriteriaInput.length > 0) {
//                 for (const criteria of markingCriteriaInput) {
//                     const newCriteria = new MarkingCriteria({ 
//                         title: criteria.title, 
//                         description: criteria.description, 
//                         assignment: assignment._id 
//                     });
//                     await newCriteria.save();
//                     assignment.markingCriteria.push(newCriteria._id);
//                 }
//             }

//             // Save the assignment again after adding marking criteria
//             await assignment.save();

//             return assignment;
//         },  
//         addEssay: async (parent, { input }) => {
//             const { assignmentId, text } = input;
//             // Create a new essay
//             const essay = new Essay({ assignmentId, text });
//             const savedEssay = await essay.save(); // Save the essay and get the saved instance
            
//             // Find the corresponding assignment and update it with the new essay's ID
//             const assignment = await Assignment.findById(assignmentId); // Find the assignment by ID
//             if (!assignment) {
//                 throw new Error('Assignment not found');
//             }
//             assignment.essays.push(savedEssay._id); // Add the new essay's ID to the assignment's essays array
//             await assignment.save(); // Save the updated assignment
            
//             return savedEssay; // Return the saved essay
//         },
//         addComment: async (parent, { essayId, text }) => {
//             const comment = new Comment({ essayId, text });
//             return await comment.save();
//         }
//     }
// };

// module.exports = resolvers;

// Resolvers 
require('dotenv').config();
const { User, Assignment, MarkingCriteria, Essay, Comment } = require('../models');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcrypt');
const OpenAI = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, args) => {
            return await User.findOne({ _id: args._id });
        },
        assignments: async () => {
            return Assignment.find();
        },
        assignment: async (parent, args) => {
            return await Assignment.findOne({ _id: args._id });
        },
        essays: async () => {
            return Essay.find();
        },
        essay: async (_, { _id }) => {
            try {
                const essay = await Essay.findById(_id);
                if (!essay) {
                    throw new Error(`Essay with ID ${_id} not found.`);
                }
                return essay;
            } catch (error) {
                console.error(`Error fetching essay with ID ${_id}:`, error);
                throw new Error(error.message);
            }
        },
        commentsByEssay: async (_, { essayId }) => {
            return await Comment.find({ essayId }).populate();
          },
    },
    Mutation: {
        addUser: async (parent, { input }) => {
            const user = await User.create(input);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) throw new Error('Incorrect credentials');
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error('Incorrect credentials');
            const token = signToken(user);
            return { token, user };
        },
        addAssignment: async (parent, { input }) => {
            const { title, instructions, subjectGroup, markingCriteriaInput } = input;
            const assignment = new Assignment({ title, instructions, subjectGroup });
            
            // Save the assignment
            await assignment.save();

            // If marking criteria are provided, save them and associate with the assignment
            if (markingCriteriaInput && markingCriteriaInput.length > 0) {
                for (const criteria of markingCriteriaInput) {
                    const newCriteria = new MarkingCriteria({ 
                        title: criteria.title, 
                        description: criteria.description, 
                        assignment: assignment._id 
                    });
                    await newCriteria.save();
                    assignment.markingCriteria.push(newCriteria._id);
                }
            }

            // Save the assignment again after adding marking criteria
            await assignment.save();

            return assignment;
        },  
        addEssay: async (parent, { input }) => {
            const { assignmentId, text } = input;
            // Create a new essay
            const essay = new Essay({ assignmentId, text });
            const savedEssay = await essay.save(); // Save the essay and get the saved instance
            
            // try {
            //     const completion = await openai.chat.completions.create({
            //         messages: [
            //           {
            //             role: "system",
            //             content: "You are a helpful marking assistant designed to output JSON. Write single sentence feedback for the essay text provided.",
            //           },
            //           { role: "user", content: essay.text },
            //         ],
            //         model: "gpt-3.5-turbo-0125",
            //         response_format: { type: "json_object" },
            //       });
            //       console.log("OpenAI message content:", JSON.stringify(completion.choices[0].message, null, 2));
            //       const responseObject = JSON.parse(completion.choices[0].message.content);

            //         const commentText = responseObject.comment;

            //         if (!commentText) {
            //             throw new Error('No comment text was generated');
            //         }
                
            //         // Create and save the comment
            //         const comment = new Comment({
            //             text: commentText,
            //             essayId: savedEssay._id,
            //         });
            //         await comment.save();
                
            //     } catch (error) {
            //         console.error("Error generating comment with OpenAI:", error);
            //         await Essay.findByIdAndDelete(savedEssay._id);
            //         throw error; // Re-throw the error to be handled by the caller
            //     }
            // return savedEssay; 

            try {
                const completion = await openai.chat.completions.create({
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful marking assistant designed to output JSON. Write single sentence feedback for the essay text provided.",
                        },
                        { role: "user", content: essay.text },
                    ],
                    model: "gpt-3.5-turbo-0125",
                    response_format: { type: "json_object" },
                });
                console.log("OpenAI message content:", JSON.stringify(completion.choices[0].message, null, 2));
            
                // Assuming the 'content' field is a JSON string as per the logged response
                // Directly parsing the 'content' field from the response
                const parsedContent = JSON.parse(completion.choices[0].message.content.trim());
                
                // Extracting 'feedback' from the parsed JSON object
                const commentText = parsedContent.feedback;
                
                if (!commentText) {
                    throw new Error('No comment text was generated');
                }
            
                // Create and save the comment
                const comment = new Comment({
                    text: commentText,
                    essayId: savedEssay._id,
                });
                await comment.save();
            
            } catch (error) {
                console.error("Error generating comment with OpenAI or processing the response:", error);
                // Delete the saved essay as part of error handling if comment generation fails
                await Essay.findByIdAndDelete(savedEssay._id);
                throw error; // Re-throw the error for further handling
            }
            
            return savedEssay;
            
        },
        addComment: async (parent, { essayId, text }) => {
            const comment = new Comment({ essayId, text });
            return await comment.save();
        }
    }
};

module.exports = resolvers;