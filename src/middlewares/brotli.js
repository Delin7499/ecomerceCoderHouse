import zlib from "zlib";

export const brotliMiddleware = (req, res, next) => {
  const acceptEncoding = req.headers["accept-encoding"];
  if (acceptEncoding && acceptEncoding.includes("br")) {
    res.setHeader("Content-Encoding", "br");
    res.setHeader("Content-Type", "application/json");
    res.removeHeader("Content-Length");
    const stream = zlib.createBrotliCompress();
    stream.pipe(res);
    next();
  } else {
    next();
  }
};
