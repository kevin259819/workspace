const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 3000;

app.get("/json/:folder/:file", (req, res) => {
  const { folder, file } = req.params;

 
  const filePath = path.join(__dirname, "json", folder, file);

  console.log("=== VERIFICANDO RUTA ===");
  console.log("Folder:", folder);
  console.log("File:", file);
  console.log("Ruta generada:", filePath);
  console.log("Existe?:", fs.existsSync(filePath));

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "Archivo no encontrado" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend funcionando en http://localhost:${PORT}`);
});