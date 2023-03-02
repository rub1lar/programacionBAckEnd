import express from "express";
import ProductManager from "..app/ProductManager.js";

const item = new ProductManager();
const app = express();

//params

//lista limitada items///
app.get("/products", async (req,res) => {
    const {limit} = req.query; //creo una variable para que limit sea definido por el qery param en la barra url por ejemplo ?limit=3 (limit seria = 3)
    const prods = await item.getProducts(); //capturo todos los productos
    if(!limit){ //si no existe limit
       await res.send(prods); //aca muestra los productos completos
    }

    // filtrado de el numero de items///
    const filtered = prods.splice(0,limit); // aca creo una variable para mostrar la cantidad filtrada   por ejemplo para mostrar 3 productos ---> ?limit=3
    await res.send(filtered); //muestro el resultado de los productos filtrados por cantidad que seleccione en el query param
});

//busco por el id//
app.get("/products/:id", async (req,res) => {
    const prodId = await Number(req.params.id);//variable para capturar los productos con ese id

    const result = await item.getProductById(prodId); //aca lo guardo en una variable asi desp muestro el resultado
    await res.send(result);//muestro resultado
})

//escuchando el server//
app.listen(8080, () => {
console.log("listening 8080");
})

