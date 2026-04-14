import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaMysql } from "@prisma/adapter-mysql";
import mysql from "mysql2/promise";

const connectionString = process.env.DATABASE_URL;
const pool = mysql.createPool(connectionString);
const adapter = new PrismaMysql(pool);

const prisma = new PrismaClient({ adapter });

export default prisma;
