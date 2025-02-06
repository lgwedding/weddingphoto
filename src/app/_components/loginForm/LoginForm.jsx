import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { MdLockOutline } from "react-icons/md";

const LoginForm = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card style={{ maxWidth: 400, padding: "20px" }}>
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <MdLockOutline style={{ fontSize: 40, color: "#3f51b5" }} />
          </div>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Sign In
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </form>
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={
              isLoggedin()
                ? () => logut()
                : () => userData.email && userData.password && login(userData)
            }
          >
            {isLoggedin() ? "Logout" : "Sign In"}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default LoginForm;
