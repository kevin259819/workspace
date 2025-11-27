const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const jwt = require("jsonwebtoken"); //ENTREGA 8 PAUTA 3

const app = express();
app.use(cors());
app.use(express.json()); //ENTREGA 8 PAUTA 3 


const PORT = 3000;
const JWT_SECRET = 'CLAVE_SECRETA_PARA_JWT_DE_FICCIÓN'; //ENTREGA 8 PAUTA 3 

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

//==============================
//ENTREGA 8 PAUTA 3 
//==============================

// ENDPOINT: POST /login 
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // 1. Condición de Fallo/Éxito (Ficción de Autenticación)
    if (username && password) {
        
        // 2. CREACIÓN DEL PAYLOAD: SOLO CON BASE EN LO QUE SE RECIBE
        const payload = { 
            // Usamos un ID genérico, ya que no tenemos una BD para dar un ID real.
            id: 1, 
            username: username // <-- Usa el valor enviado por el cliente
            
        };
        
        const token = jwt.sign(
            payload, 
            JWT_SECRET, 
            { expiresIn: '1h' } 
        );

        // 3. Devolver el token
        return res.status(200).json({ 
            message: "Autenticación exitosa (generada en base a la entrada)", 
            token: token 
        });

    } else {
        // Fallo: Si falta el usuario O la contraseña.
        return res.status(401).json({ 
            error: "Fallo en la autenticación: Debe proveer un usuario y una contraseña no vacíos." 
        });
    }
});



app.listen(PORT, () => {
  console.log(`Servidor backend funcionando en http://localhost:${PORT}`);
});