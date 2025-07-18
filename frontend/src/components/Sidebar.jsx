import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { clearUser } from "../store/userSlice";

const allMenuItems = [
  { label: "Product", path: "products", roles: ["Admin"] },
  { label: "Material", path: "materials", roles: ["Admin"] },
  { label: "Units", path: "units", roles: ["Admin"] },
  { label: "Supplier", path: "suppliers", roles: ["Admin"] },
  { label: "BOM", path: "bom", roles: ["Designer"] },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { username, role } = useSelector((state) => state.user);

  const visibleItems = allMenuItems.filter((item) => item.roles.includes(role));

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login"); // Update to your login path
  };

  return (
    <Paper
      sx={{
        width: "15vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(to bottom, #c3222b, #e15c2a)",
        color: "#fff",
        py: 2,
      }}
      elevation={2}
    >
      <Box>
        <List>
          {visibleItems.map((item) => (
            <ListItem
              button
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                color: "white",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Bottom User Info + Logout */}
      <Box>
        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)", mb: 2 }} />
        <Stack alignItems="center" spacing={1}>
          <Avatar
            sx={{ width: 56, height: 56, bgcolor: "#fff", color: "#c3222b" }}
          >
            {username?.[0]?.toUpperCase() || "U"}
          </Avatar>
          <IconButton
            onClick={handleLogout}
            sx={{
              mt: 1,
              color: "#fff",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Stack>
      </Box>
    </Paper>
  );
};

export default Sidebar;
