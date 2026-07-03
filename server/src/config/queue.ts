import { Queue, Worker, QueueEvents } from "bullmq";

const connection = {
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
};

export const emailQueue = new Queue("emails", {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 2000 },
    removeOnComplete: 100,
    removeOnFail: 50,
  },
});

export const emailWorker = new Worker(
  "emails",
  async (job) => {
    const { type, data } = job.data;

    switch (type) {
      case "welcome":
        console.log(`📧 [Welcome Email] Sending to ${data.email}`);
        console.log(`   Subject: Welcome to DevFolio, ${data.name}!`);
        console.log(`   Body: Your portfolio builder is ready.`);
        break;

      case "portfolio_view":
        console.log(`📧 [View Alert] ${data.portfolioName} was viewed`);
        break;

      default:
        console.log(`📧 Unknown email type: ${type}`);
    }
  },
  { connection },
);

emailWorker.on("completed", (job) => {
  console.log(`✅ Email job ${job.id} completed`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`❌ Email job ${job?.id} failed:`, err.message);
});

export const queueEvents = new QueueEvents("emails", { connection });
