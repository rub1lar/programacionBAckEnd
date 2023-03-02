import fs from "fs";

class ProductManager {
  #path = "./ProductosVerduleria.json";
  idAcum = 0;
  constructor(path) {
    path = this.#path
  }

  async getProducts() {
    try {
      const products = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      return [];
    }
  }

  async chkProdsById(arr, id) {
    let check = await arr.some((prod) => prod.id === id);
    return check;
  }

  async chkProdsByCode(arr, code) {
    let check = await arr.some((prod) => prod.code === code);
    return check;
  }

  async addProduct(code, title, description, price, thumbnail, stock) {
    //revisar que si esten todos los datos
    if (code && title && description && price && thumbnail && stock) {
      console.log(await "info completa gracias");
    } else {
      throw `falta informacion , 
           agregar todos los campos:
          code || title || description || price || thumbnail || stock`
      ;
    }
    //revisar que no existe codigo
    let products = await this.getProducts();
    const chk = await this.chkProdsByCode(products, code);
    if (!chk) {
      console.log(`no existe codigo: ${code} ===> SE CREARA NUEVO PRODUCTO`);
      const newProduct = {
        id: this.idAcum,
        code,
        title,
        description,
        price,
        thumbnail,
        stock,
      };
      products = [...products, newProduct];
      await fs.promises.writeFile(this.#path, JSON.stringify(products));
      this.idAcum++
    } else {
      console.log(`Ya existe el codigo ${code} y NO SE CREARA PRODUCTO`);
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const chkProductId = await this.chkProdsById(products, id);
    if (chkProductId) {
      const idFound = await products.find((prod) => prod.id === id);
      console.log(
        `producto con el id ${id} encontrado, se mostrara a continuacion`
      );
      console.log(idFound);
      return idFound;
    } else {
      console.log(`el id ${id} solicitado no existe`);
    }
  }

  async deleteProdById(id) {
    try {
      const chk = await this.getProductById(id);
      if (chk) {
        const products = await this.getProducts();
        const toDelete = await products.filter((e) => e.id !== id);
        console.log(toDelete);
        await fs.promises.writeFile(this.#path, JSON.stringify(toDelete));
        console.log(`producto con id ${id} eliminado`);
      } else{
        console.log("no se borrara por falta de id");
      }
    } catch (error) {
        console.log("error al borrar");
    }
  }


/* 
  async updateProdById(id, data) {

    const products = await this.getProducts();

    const updateProducts = products.map ((p)=>{
      if (p.id ===id){
        return {
          ...p,
          ...data,
          id,
        };
      }
      return p;
    } );
     */




  async updateProdById(id, keyToUpdate, dataUpdate) {
    if (!id || !keyToUpdate || !dataUpdate) {
      console.log("falta Información");
    } else {
      const products = await this.getProducts();
      const chkId = this.chkProdsById(products, id);
      if (chkId) {
        console.log("se actualizan los datos");
        switch (keyToUpdate) {
            case "code":
              const updateCode = await products.map((e) =>
                e.id === id ? { ...e, code: dataUpdate } : e
              );
              await fs.promises.writeFile(this.#path, JSON.stringify(updateCode));
              console.log(`elemento con id ${id} modifico el codigo`);
              await this.getProducts();
              break;
      
              case "title":
              const updateTitle = await products.map((e) =>
                e.id === id ? { ...e, title: dataUpdate } : e
              );
              await fs.promises.writeFile(this.#path, JSON.stringify(updateTitle));
              console.log(`elemento con id ${id} modifico el title`);
              await this.getProducts();
              break;
      
              case "description":
              const updateDesc = await products.map((e) =>
                e.id === id ? { ...e, description: dataUpdate } : e
              );
              await fs.promises.writeFile(this.#path, JSON.stringify(updateDesc));
              console.log(`elemento con id ${id} modifico el description`);
              await this.getProducts();
              break;
      
              case "price":
              const updatePrice = await products.map((e) =>
                e.id === id ? { ...e, price: dataUpdate } : e
              );
              await fs.promises.writeFile(this.#path, JSON.stringify(updatePrice));
              console.log(`elemento con id ${id} modifico el description`);
              await this.getProducts();
              break;
      
              case "thumnail":
              const updateThumb = await products.map((e) =>
                e.id === id ? { ...e, thumnail: dataUpdate } : e
              );
              await fs.promises.writeFile(this.#path, JSON.stringify(updateThumb));
              console.log(`elemento con id ${id} modifico el Thumnail`);
              await this.getProducts();
              break;
      
              case "stock":
              const updateStock = await products.map((e) =>
                e.id === id ? { ...e, stock: dataUpdate } : e
              );
              await fs.promises.writeFile(this.#path, JSON.stringify(updateStock));
              console.log(`elemento con id ${id} modifico el Stock`);
              await this.getProducts();
              break;
      
            default:
              console.log("no se encontró el atributo del producto con el id");
              break;
          }
      } else {
        console.log(`el id ${id} no existe y no se actualizaran los datos`);
      }
    }
  }
}
/* 
async function test() {
  //productos vacio
  const item = new ProductManager();
  await item.getProducts();

  // //se agrega un producto
  await item.addProduct(1, "manzana", "xxxx", 1200, "#.jpg", 2);
  // //se agrega segundo producto
  await item.addProduct(2, "banana", "xxxx", 1020, "#.jpg", 3);
  await item.getProductById(1);
  await item.updateProdById(1, "title", "pera");
//   await item.deleteProdById(1);
}
test(); */


export default ProductManager;