import * as authService from "../services/authServices.js";

export const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { token, user } = await authService.loginUser(req.body);
    res.json({ token, user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};