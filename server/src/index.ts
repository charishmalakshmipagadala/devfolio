import express from "express";
import cors from "cors";
import http from "http";
import path from "path";
import { Server as SocketServer } from "socket.io";
import { config } from "./config/env";
import { redis } from "./config/redis";
import "./config/queue"; // start workers
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/authRoutes";
import portfolioRoutes from "./routes/portfolioRoutes";
import uploadRoutes from "./routes/uploadRoutes";

const app = express();
const httpServer = http.createServer(app);

// Socket.io setup
const io = new SocketServer(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  },
});

// Track live viewers per portfolio slug
const portfolioViewers = new Map<string, Set<string>>();

io.on("connection", (socket) => {
  console.log(`🔌 Socket connected: ${socket.id}`);

  // User starts viewing a portfolio
  socket.on("join_portfolio", (slug: string) => {
    socket.join(`portfolio:${slug}`);

    if (!portfolioViewers.has(slug)) {
      portfolioViewers.set(slug, new Set());
    }
    portfolioViewers.get(slug)!.add(socket.id);

    const count = portfolioViewers.get(slug)!.size;
    io.to(`portfolio:${slug}`).emit("viewer_count", { slug, count });
    console.log(
      `👁 ${socket.id} viewing portfolio: ${slug} (${count} viewers)`,
    );
  });

  // User leaves portfolio
  socket.on("leave_portfolio", (slug: string) => {
    socket.leave(`portfolio:${slug}`);
    portfolioViewers.get(slug)?.delete(socket.id);

    const count = portfolioViewers.get(slug)?.size || 0;
    io.to(`portfolio:${slug}`).emit("viewer_count", { slug, count });
  });

  // Cleanup on disconnect
  socket.on("disconnect", () => {
    portfolioViewers.forEach((viewers, slug) => {
      if (viewers.has(socket.id)) {
        viewers.delete(socket.id);
        const count = viewers.size;
        io.to(`portfolio:${slug}`).emit("viewer_count", { slug, count });
      }
    });
    console.log(`🔌 Socket disconnected: ${socket.id}`);
  });
});

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Health check
app.get("/health", async (req, res) => {
  const redisStatus = await redis
    .ping()
    .then(() => "connected")
    .catch(() => "disconnected");
  res.json({
    success: true,
    message: "DevFolio API running",
    redis: redisStatus,
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/portfolios", portfolioRoutes);
app.use("/api/v1/upload", uploadRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

httpServer.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
  console.log(`🔌 WebSocket server ready`);
  console.log(`📦 Redis caching enabled`);
  console.log(`📧 Email queue worker started`);
});

export default app;
