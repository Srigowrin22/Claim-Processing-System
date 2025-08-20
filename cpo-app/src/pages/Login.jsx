// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   CircularProgress,
//   Alert,
//   Stack,
//   Checkbox,
//   FormControlLabel,
//   Tabs,
//   Tab,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import bgImage from '../assets/image.png';
// import PolicyHolderLoginPage from './policyHolder/PolicyHolderLoginPage'; // <-- Make sure this exists
 
// export default function Login() {
//   const [tab, setTab] = useState(0); // 0 = Staff, 1 = Policyholder
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [remember, setRemember] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
 
//   // Staff login logic (your original code)
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
 
//     try {
//       const userRes = await fetch(
//         `http://localhost:9090/users?user_email=${encodeURIComponent(email)}&user_password=${encodeURIComponent(password)}`
//       );
//       const users = await userRes.json();
 
//       if (!users.length) {
//         setError('User not found or password incorrect.');
//         setLoading(false);
//         return;
//       }
 
//       const user = users[0];
 
//       if (user.is_active === false) {
//         setError('User account is inactive.');
//         setLoading(false);
//         return;
//       }
 
//       let roleRes = await fetch(`http://localhost:9090/roles?role_id=${user.role_id}`);
//       let roles = await roleRes.json();
 
//       if (!roles.length) {
//         roleRes = await fetch(`http://localhost:9090/roles?role_id="${user.role_id}"`);
//         roles = await roleRes.json();
//       }
 
//       if (!roles.length) {
//         setError('Role not found.');
//         setLoading(false);
//         return;
//       }
 
//       const role = roles[0];
//       const roleName = role.role_name;
 
//       localStorage.setItem('user', JSON.stringify({
//         name: user.user_name,
//         email: user.user_email,
//         role: role.role_name,
//         // avatar: user.avatar, // if you have an avatar property
//       }));
 
//       if (roleName === "Admin") {
//         navigate("/admin");
//       } else if (roleName === "Claim Processing Officer") {
//         navigate("/cpo");
//       } else if (roleName === "Medical Validator") {
//         navigate("/medical-validator");
//       } else if (roleName === "Insurance Coordinator") {
//         navigate("/insurance-coordinator");
//       } else if (roleName === "Regional Head") {
//         navigate("/regional-head");
//       } else {
//         setError("No dashboard found for this role.");
//       }
 
//       setLoading(false);
//     } catch (err) {
//       setError('An error occurred during login.');
//       setLoading(false);
//     }
//   };
 
//   // Policyholder login handler (called from PolicyHolderLoginPage)
//   const handlePolicyHolderLogin = (customer) => {
//     // Already stored in PolicyHolderLoginPage, but you can store here too if you want:
//     // localStorage.setItem('policyholder', JSON.stringify(customer));
//     localStorage.setItem('policyholder', JSON.stringify(customer));
 
//     navigate('/policyholder-dashboard');
//   };
 
//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         width: '100vw',
//         background: `url(${bgImage}) center/cover no-repeat`,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         position: 'relative',
//         overflow: 'hidden',
//       }}
//     >
//       <Box
//         sx={{
//           position: "relative",
//           zIndex: 2,
//           width: "100%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: { xs: "center", sm: "flex-start" },
//           pl: { xs: 0, sm: 10, md: 16 },
//         }}
//       >
//         <Box
//           sx={{
//             p: { xs: 3, sm: 5 },
//             width: { xs: "92vw", sm: 430 },
//             borderRadius: 5,
//             boxShadow: "0 8px 40px 0 rgba(30,60,120,0.30)",
//             background: "rgba(255,255,255,0.18)",
//             backdropFilter: "blur(16px) saturate(180%)",
//             border: "1.5px solid rgba(255,255,255,0.35)",
//             mt: { xs: 0, sm: 0 },
//           }}
//         >
//           {/* Tabs for Staff/Policyholder */}
//           <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
//             <Tab label="Staff Login" />
//             <Tab label="Policy Holder Login" />
//           </Tabs>
//           {tab === 0 && (
//             <Box sx={{ mt: 2 }}>
//               <Typography
//                 variant="h4"
//                 align="center"
//                 gutterBottom
//                 sx={{
//                   color: "#fff",
//                   fontWeight: 700,
//                   letterSpacing: 1,
//                   textShadow: "0 2px 16px #1976d2"
//                 }}
//               >
//                 SUN Health Login
//               </Typography>
//               <form onSubmit={handleLogin}>
//                 <Stack spacing={2}>
//                   {/* Email row */}
//                   <Box sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     mb: 1,
//                     gap: 2
//                   }}>
//                     <Typography
//                       sx={{
//                         minWidth: 120,
//                         color: "#e3f2fd",
//                         fontWeight: 600,
//                         fontSize: "1.08rem",
//                         textAlign: "right",
//                         flexShrink: 0
//                       }}
//                     >
//                       Email&nbsp;:
//                     </Typography>
//                     <TextField
//                       type="email"
//                       value={email}
//                       onChange={e => setEmail(e.target.value)}
//                       required
//                       fullWidth
//                       autoFocus
//                       variant="outlined"
//                       placeholder="Enter your email"
//                       InputProps={{
//                         sx: {
//                           color: "#1a237e",
//                           fontWeight: 500,
//                           background: "rgba(255,255,255,0.98)",
//                           borderRadius: 2,
//                           height: 44
//                         }
//                       }}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           "& fieldset": { borderColor: "#1976d2" },
//                           "&:hover fieldset": { borderColor: "#1565c0" },
//                         },
//                         input: { color: "#1a237e", fontWeight: 500 }
//                       }}
//                     />
//                   </Box>
//                   {/* Password row */}
//                   <Box sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     mb: 1,
//                     gap: 2
//                   }}>
//                     <Typography
//                       sx={{
//                         minWidth: 120,
//                         color: "#e3f2fd",
//                         fontWeight: 600,
//                         fontSize: "1.08rem",
//                         textAlign: "right",
//                         flexShrink: 0
//                       }}
//                     >
//                       Password&nbsp;:
//                     </Typography>
//                     <TextField
//                       type="password"
//                       value={password}
//                       onChange={e => setPassword(e.target.value)}
//                       required
//                       fullWidth
//                       variant="outlined"
//                       placeholder="Enter your password"
//                       InputProps={{
//                         sx: {
//                           color: "#1a237e",
//                           fontWeight: 500,
//                           background: "rgba(255,255,255,0.98)",
//                           borderRadius: 2,
//                           height: 44
//                         }
//                       }}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           "& fieldset": { borderColor: "#1976d2" },
//                           "&:hover fieldset": { borderColor: "#1565c0" },
//                         },
//                         input: { color: "#1a237e", fontWeight: 500 }
//                       }}
//                     />
//                   </Box>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={remember}
//                         onChange={e => setRemember(e.target.checked)}
//                         sx={{
//                           color: "#1976d2",
//                           "&.Mui-checked": { color: "#1976d2" }
//                         }}
//                       />
//                     }
//                     label={
//                       <Typography sx={{ color: "#e3f2fd" }}>
//                         Remember me
//                       </Typography>
//                     }
//                   />
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     disabled={loading}
//                     fullWidth
//                     size="large"
//                     sx={{
//                       fontWeight: 700,
//                       fontSize: "1.15rem",
//                       py: 1.3,
//                       borderRadius: 3,
//                       background: "linear-gradient(90deg, #1976d2 60%, #1a237e 100%)",
//                       boxShadow: "0 4px 24px 0 rgba(30,60,120,0.25)",
//                       letterSpacing: 1,
//                       textTransform: "none",
//                       transition: "background 0.2s, box-shadow 0.2s",
//                       "&:hover": {
//                         background: "linear-gradient(90deg, #1565c0 60%, #283593 100%)",
//                         boxShadow: "0 8px 32px 0 rgba(25,118,210,0.25)",
//                       }
//                     }}
//                   >
//                     {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : 'Login'}
//                   </Button>
//                   {error && <Alert severity="error">{error}</Alert>}
//                 </Stack>
//               </form>
//             </Box>
//           )}
//           {tab === 1 && (
//             <Box sx={{ mt: 2 }}>
//               <PolicyHolderLoginPage onLogin={handlePolicyHolderLogin} />
//             </Box>
//           )}
//         </Box>
//       </Box>
//       {/* Optional: subtle overlay for extra contrast */}
//       <Box
//         sx={{
//           position: "absolute",
//           inset: 0,
//           bgcolor: "rgba(10,30,80,0.55)",
//           zIndex: 1,
//         }}
//       />
//     </Box>
//   );
// }
 

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Stack,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/image.png';
import PolicyHolderLoginPage from './policyHolder/PolicyHolderLoginPage'; // <-- Make sure this exists

export default function Login() {
  const [tab, setTab] = useState(0); // 0 = Staff, 1 = Policyholder
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Staff login logic
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userRes = await fetch(
        `http://localhost:9090/users?user_email=${encodeURIComponent(email)}&user_password=${encodeURIComponent(password)}`
      );
      const users = await userRes.json();

      if (!users.length) {
        setError('User not found or password incorrect.');
        setLoading(false);
        return;
      }

      const user = users[0];

      if (user.is_active === false) {
        setError('User account is inactive.');
        setLoading(false);
        return;
      }

      let roleRes = await fetch(`http://localhost:9090/roles?role_id=${user.role_id}`);
      let roles = await roleRes.json();

      if (!roles.length) {
        roleRes = await fetch(`http://localhost:9090/roles?role_id="${user.role_id}"`);
        roles = await roleRes.json();
      }

      if (!roles.length) {
        setError('Role not found.');
        setLoading(false);
        return;
      }

      const role = roles[0];
      const roleName = role.role_name;

      localStorage.setItem('user', JSON.stringify({
        name: user.user_name,
        email: user.user_email,
        role: role.role_name,
        // avatar: user.avatar, // if you have an avatar property
      }));

      if (roleName === "Admin") {
        navigate("/admin");
      } else if (roleName === "Claim Processing Officer") {
        navigate("/cpo");
      } else if (roleName === "Medical Validator") {
        navigate("/medical-validator");
      } else if (roleName === "Insurance Coordinator") {
        navigate("/insurance-coordinator");
      } else if (roleName === "Regional Head") {
        navigate("/regional-head");
      } else {
        setError("No dashboard found for this role.");
      }

      setLoading(false);
    } catch (err) {
      setError('An error occurred during login.');
      setLoading(false);
    }
  };

  // Policyholder login handler (called from PolicyHolderLoginPage)
  const handlePolicyHolderLogin = (customer) => {
    localStorage.setItem('policyholder', JSON.stringify(customer));
    navigate('/policyholder-dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: `url(${bgImage}) center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background overlay for contrast */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0, 77, 64, 0.6)", // dark turquoise overlay
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", sm: "flex-start" },
          pl: { xs: 0, sm: 10, md: 16 },
        }}
      >
        <Box
          sx={{
            p: { xs: 3, sm: 5 },
            width: { xs: "92vw", sm: 430 },
            borderRadius: 5,
            boxShadow: "0 8px 40px 0 rgba(0, 128, 128, 0.4)", // turquoise shadow
            background: "rgba(255,255,255,0.15)", // lighter frosted glass
            backdropFilter: "blur(20px) saturate(180%)",
            border: "1.5px solid rgba(0, 128, 128, 0.4)", // turquoise border
            mt: { xs: 0, sm: 0 },
            color: "#e0f7fa", // light turquoise text
          }}
        >
          {/* Tabs for Staff/Policyholder */}
          <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
            <Tab label="Staff Login" />
            <Tab label="Policy Holder Login" />
          </Tabs>
          {tab === 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{
                  color: "#b2dfdb", // lighter turquoise
                  fontWeight: 700,
                  letterSpacing: 1,
                  textShadow: "0 2px 8px rgba(0, 150, 136, 0.7)",
                }}
              >
                SUN Health Login
              </Typography>
              <form onSubmit={handleLogin}>
                <Stack spacing={2}>
                  {/* Email row */}
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 1,
                    gap: 2
                  }}>
                    <Typography
                      sx={{
                        minWidth: 120,
                        color: "#b2dfdb",
                        fontWeight: 600,
                        fontSize: "1.08rem",
                        textAlign: "right",
                        flexShrink: 0
                      }}
                    >
                      Email&nbsp;:
                    </Typography>
                    <TextField
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      fullWidth
                      autoFocus
                      variant="outlined"
                      placeholder="Enter your email"
                      InputProps={{
                        sx: {
                          color: "#004d40", // dark turquoise text inside input
                          fontWeight: 500,
                          background: "rgba(255,255,255,0.9)", // almost solid white background for inputs
                          borderRadius: 2,
                          height: 44,
                        }
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#009688" }, // turquoise border
                          "&:hover fieldset": { borderColor: "#00796b" }, // darker turquoise on hover
                        },
                        input: { color: "#004d40", fontWeight: 500 },
                      }}
                    />
                  </Box>
                  {/* Password row */}
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 1,
                    gap: 2
                  }}>
                    <Typography
                      sx={{
                        minWidth: 120,
                        color: "#b2dfdb",
                        fontWeight: 600,
                        fontSize: "1.08rem",
                        textAlign: "right",
                        flexShrink: 0
                      }}
                    >
                      Password&nbsp;:
                    </Typography>
                    <TextField
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      fullWidth
                      variant="outlined"
                      placeholder="Enter your password"
                      InputProps={{
                        sx: {
                          color: "#004d40",
                          fontWeight: 500,
                          background: "rgba(255,255,255,0.9)",
                          borderRadius: 2,
                          height: 44,
                        }
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#009688" },
                          "&:hover fieldset": { borderColor: "#00796b" },
                        },
                        input: { color: "#004d40", fontWeight: 500 }
                      }}
                    />
                  </Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={remember}
                        onChange={e => setRemember(e.target.checked)}
                        sx={{
                          color: "#009688",
                          "&.Mui-checked": { color: "#00796b" }
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ color: "#b2dfdb" }}>
                        Remember me
                      </Typography>
                    }
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    fullWidth
                    size="large"
                    sx={{
                      fontWeight: 700,
                      fontSize: "1.15rem",
                      py: 1.3,
                      borderRadius: 3,
                      background: "linear-gradient(90deg, #009688 60%, #004d40 100%)",
                      boxShadow: "0 4px 24px 0 rgba(0, 150, 136, 0.5)",
                      letterSpacing: 1,
                      textTransform: "none",
                      transition: "background 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        background: "linear-gradient(90deg, #00796b 60%, #00332e 100%)",
                        boxShadow: "0 8px 32px 0 rgba(0, 121, 107, 0.5)",
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={24} sx={{ color: "#e0f2f1" }} /> : 'Login'}
                  </Button>
                  {error && <Alert severity="error">{error}</Alert>}
                </Stack>
              </form>
            </Box>
          )}
          {tab === 1 && (
            <Box sx={{ mt: 2 }}>
              <PolicyHolderLoginPage onLogin={handlePolicyHolderLogin} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
