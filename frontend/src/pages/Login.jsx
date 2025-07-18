import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await api.post('/auth/login', credentials);
      localStorage.setItem('access_token', res.data.access_token);
      const user = res.data.user;
      dispatch(setUser(user));
      if (user?.role === 'Admin') {
        navigate('/dashboard/products');
      } else {
        navigate('/dashboard/bom');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: '#f5f5f5' }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: 400,
          borderRadius: 2,
          border: '1px solid #ddd',
          backgroundColor: '#fff',
        }}
      >
        <form onKeyDown={handleKeyDown}>
          <Stack spacing={3}>
            <Typography variant="h5" align="center" fontWeight={600}>
              BOM Manager
            </Typography>

            <TextField
              label="Username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              fullWidth
              autoFocus
            />

            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              onClick={handleLogin}
              disabled={loading}
              fullWidth
              sx={{ textTransform: 'none' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
