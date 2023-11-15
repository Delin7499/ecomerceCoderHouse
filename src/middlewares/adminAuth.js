export const adminAuthMiddleware = (req, res, next) => {
  if (req.session.role !== "Admin") {
    return res.status(401).json({ message: "Unauthorized - Not Admin" });
  }
  next();
};
