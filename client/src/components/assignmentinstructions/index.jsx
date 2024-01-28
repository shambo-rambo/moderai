// import React, { useState } from 'react';
// import { Button, TextField, Grid, Box } from '@mui/material';
// import FileUpload from './FileUpload'; // Ensure you have a FileUpload component

// const AssignmentInstructions = () => {
//     const [assignmentName, setAssignmentName] = useState('');
//     const [assignmentInstructions, setAssignmentInstructions] = useState('');
//     const [markingCriteria, setMarkingCriteria] = useState([{ title: '', description: '' }]);

//     const handleFormSubmit = (event) => {
//         event.preventDefault();
//         // Submission logic here
//     };

//     const addMarkingCriteria = () => {
//         setMarkingCriteria([...markingCriteria, { title: '', description: '' }]);
//     };

//     const handleMarkingCriteriaChange = (index, event) => {
//         const updatedCriteria = [...markingCriteria];
//         updatedCriteria[index][event.target.name] = event.target.value;
//         setMarkingCriteria(updatedCriteria);
//     };

//     return (
//         <form onSubmit={handleFormSubmit}>
//             <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                     <TextField
//                         label="Assignment Name"
//                         value={assignmentName}
//                         onChange={(e) => setAssignmentName(e.target.value)}
//                         fullWidth
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <TextField
//                         label="Assignment Instructions"
//                         value={assignmentInstructions}
//                         onChange={(e) => setAssignmentInstructions(e.target.value)}
//                         fullWidth
//                         multiline
//                         rows={4}
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     {markingCriteria.map((criteria, index) => (
//                         <Box key={index} marginBottom={2}>
//                             <TextField
//                                 label="Marking Criteria Title"
//                                 name="title"
//                                 value={criteria.title}
//                                 onChange={(event) => handleMarkingCriteriaChange(index, event)}
//                                 fullWidth
//                             />
//                             <TextField
//                                 label="Marking Criteria Description"
//                                 name="description"
//                                 value={criteria.description}
//                                 onChange={(event) => handleMarkingCriteriaChange(index, event)}
//                                 fullWidth
//                                 multiline
//                                 rows={2}
//                             />
//                         </Box>
//                     ))}
//                     <Button onClick={addMarkingCriteria}>Add Marking Criteria</Button>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <FileUpload />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Button type="submit" variant="contained" color="primary">Create Assignment</Button>
//                 </Grid>
//             </Grid>
//         </form>
//     );
// };

// export default AssignmentInstructions;
