import fs from "fs";
import path from "path";
import { db } from "./db";

export  async function initDB() {
  const sqlPath = path.resolve(
    __dirname,
    "../database/init.sql"
  );

  const sql = fs.readFileSync(sqlPath, "utf-8");

  await db.query(sql);

  console.log("✅ Banco de dados inicializado com sucesso!");
  process.exit(0);
}

initDB().catch(err => {
  console.error("❌ Erro ao inicializar o banco:", err);
  process.exit(1);
});

