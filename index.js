require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");

// const expressLayouts = require("express-ejs-layouts");
// Poner sitio en mantenimiento
// app.use((req, res, next) => {
//     next();
//     res.send("Sitio En Mantenimiento");
// });
//instalo npm i override para que el form pueda simular un PUT o DELETE. Y lo llamo
const methodOverride = require("method-override");
const sequelize = require("./src/config/conn.js");
// Motor de vistas
app.set("view engine", "ejs");
//Ahora le digo en donde van a estar las vistas
app.set("views", "./src/views");

//Pido que use express-layouts
// app.use(expressLayouts);
// y le digo que cuando lo busque, lo busque en layout/layout
// app.set("layout", "layouts/layout");

// Pido que use el _method de override
app.use(methodOverride("_method"));


// Uso un middleware propio de express para definir qué va a ser público. Todo lo que esté en la carpeta "public" estará a la vista de todos
app.use(express.static(path.join(__dirname, "/public")));
// Middleware que me permite tomar lo del formulario
app.use(express.urlencoded({ extended: false}));
// Pagína de Inicio + Express Router con modulos
// AHORA EMPIEZO A MOVER ESTOS MODULOS A LOS mainRoutes SI SON PUBLICOS, O ARMO admRoutes PARA LA ADMINISTRACION INTERNA DE PRODUCTOS LES CAMBIO EL APP POR ROUTER
// app.get("/", (req, res) => {
//     res.send("Primera página");
// });
// Página de Contacto
//también la llevo a mainRoutes
// app.get("/contacto", (req, res) => {
//     res.send("Contacto");
// });
// Página de FAQs
// app.get("/faqs", (req, res) => {
//     res.send("Preguntas Frecuentes");
// });
// Página Admin
// app.get("/admin", (req, res) => {
//     res.send("Administrador de Productos");
// });
//PARA PODER MOVER TODO LO DE ARRIBA TUVE QUE DECIRLE DESDE DONDE SE MANEJARÁN ESAS RUTAS

// /producto/2?licencia=StarWars&sort=desc&local=Centro
// Solicito un producto con un id en particular y con query los datos extra que necesite. Los parámetros los tengo que definir, las querys no.
app.get("/producto/:id", (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    
    console.log(req.query);
    const licence = req.query.licence;

    console.log(req.query);
    const category = req.query.category;
    
    res.send({ id, licence, category });
});

// const mainRoutes = require("./src/routes/mainRoutes.js");
// app.use(mainRoutes);
// lo mismo que arriba pero simplificado en una linea
app.use("/", require("./src/routes/mainRoutes.js"));
app.use("/admin/productos", require("./src/routes/adminRoutes.js"));
app.use("/shop", require("./src/routes/shopRoutes.js"));
app.use("/auth", require("./src/routes/authRoutes.js"));

// Manejo de errores
app.use((req, res, next) => {
    res.status(404).send("La Página no existe");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.log(error);
    }
    
    console.log(`http://localhost:${PORT}`);
});
