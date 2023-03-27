import { PrismaClient } from "../../prisma/local";


const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export default prisma;