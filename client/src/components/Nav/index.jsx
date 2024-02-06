// import React from 'react';
// import Auth from "../../utils/auth";
// import { Link as RouterLink } from "react-router-dom";
// import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
// import { lime } from '@mui/material/colors';

// function Nav() {
//   function showNavigation() {
//     if (Auth.loggedIn()) {
//       return (
//         <Button 
//           style={{ color: lime[500] }} 
//           component={RouterLink} 
//           to="/" 
//           onClick={() => Auth.logout()}
//         >
//           Logout
//         </Button>
//       );
//     } else {
//       return (
//         <>
//           <Button 
//             style={{ color: lime[500] }} 
//             component={RouterLink} 
//             to="/signup"
//           >
//             Signup
//           </Button>
//           <Button 
//             style={{ color: lime[500] }} 
//             component={RouterLink} 
//             to="/login"
//           >
//             Login
//           </Button>
//         </>
//       );
//     }
//   }

//   return (
//     <AppBar position="static" sx={{ backgroundColor: 'black' }}>
//       <Toolbar sx={{ justifyContent: 'space-between' }}>
//         <Box sx={{ flex: 1 }}>
//           <Typography variant="h6" style={{ color: lime[500] }}>
//             <RouterLink to="/" style={{ color: lime[500], textDecoration: 'none' }}>
//               ModerAI
//             </RouterLink>
//           </Typography>
//         </Box>
//         <Box sx={{ flex: 1, textAlign: 'center' }}>
//           <Button 
//             style={{ color = "primary" }} 
//             component={RouterLink} 
//             to="/assignments"
//           >
//             Create Assignment
//           </Button>
//         </Box>
//         <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
//           {showNavigation()}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default Nav;

import React from 'react';
import Auth from "../../utils/auth";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <Button 
          variant="contained" 
          color="primary" 
          component={RouterLink} 
          to="/" 
          onClick={() => Auth.logout()}
          sx={{ textTransform: 'none', ml: 1 }}
        >
          Logout
        </Button>
      );
    } else {
      return (
        <>
          <Button 
            variant="contained" 
            color="primary" 
            component={RouterLink} 
            to="/signup"
            sx={{ textTransform: 'none', ml: 1 }}
          >
            Signup
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            component={RouterLink} 
            to="/login"
            sx={{ textTransform: 'none', ml: 1 }}
          >
            Login
          </Button>
        </>
      );
    }
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ color: 'white', flexGrow: 1 }}>
          <RouterLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            ModerAI
          </RouterLink>
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={RouterLink} 
          to="/assignments"
          sx={{ textTransform: 'none' }}
        >
          Create Assignment
        </Button>
        {showNavigation()}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
