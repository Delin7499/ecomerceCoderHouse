export const adminAuthMiddleware = (req, res, next) => {
  if (req.session.role !== "Admin" && req.session.role !== "Premium") {
    return res
      .status(401)
      .json({ message: "Unauthorized - Not Admin or Premium" });
  }
  next();
};
