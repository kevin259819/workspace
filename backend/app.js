
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

/**
 * Esperamos que el frontend mande algo así:
 *
 * {
 *   "usuarioId": null,
 *   "subtotal": 1234,
 *   "iva": 271,
 *   "envio": 0,
 *   "total": 1505,
 *   "articles": 2,
 *   "items": [
 *     {
 *       "id": 1,
 *       "name": "Nombre del producto",
 *       "currency": "USD",
 *       "unitCost": 100,
 *       "quantity": 2,
 *       "image": "https://..."
 *     }
 *   ]
 * }
 */

app.post('/cart', async (req, res) => {
  const { usuarioId, subtotal, iva, envio, total, articles, items } = req.body;

  // Validar que haya items
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'No se enviaron items en el carrito.' });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 1) Insertar un carrito
    const [cartResult] = await connection.execute(
      `INSERT INTO Carrito (usuario_id, subtotal, iva, envio, total, articles)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        usuarioId || null,
        subtotal || 0,
        iva || 0,
        envio || 0,
        total || 0,
        articles || items.reduce((acc, it) => acc + (it.quantity || 0), 0)
      ]
    );

    const carritoId = cartResult.insertId;

    // 2) Insertar cada ítem en Carrito_Producto
    const sqlItem = `
      INSERT INTO Carrito_Producto
        (carrito_id, producto_id, name, currency, unit_cost, quantity, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    for (const item of items) {
      await connection.execute(sqlItem, [
        carritoId,
        item.id || null,     // id de Producto si lo conocés, si no queda NULL
        item.name,
        item.currency,
        item.unitCost,
        item.quantity,
        item.image || null
      ]);
    }

    await connection.commit();

    res.status(201).json({
      message: 'Carrito guardado correctamente',
      cartId: carritoId
    });
  } catch (error) {
    console.error('Error al guardar el carrito:', error);
    await connection.rollback();
    res.status(500).json({ error: 'Error al guardar el carrito en la base de datos' });
  } finally {
    connection.release();
  }
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
