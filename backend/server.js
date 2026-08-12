import "dotenv/config";
import express from "express";
import cors from "cors";

import chatRoutes from "./routes/chat.routes.js";
import signupRoutes from "./routes/signup.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = [
  "https://improvingjb.com",
  "https://www.improvingjb.com",
];

if (process.env.NODE_ENV !== "production") {
  allowedOrigins.push(
    "http://localhost:5173",
    "http://localhost:3000"
  );
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json({ limit: "25kb" }));

app.use("/api/chat", chatRoutes);
app.use("/api/signup", signupRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/api/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      error: "Origin not allowed",
    });
  }

  if (err.type === "entity.too.large") {
    return res.status(413).json({
      error: "Request is too large",
    });
  }

  return res.status(500).json({
    error: "Internal server error",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});