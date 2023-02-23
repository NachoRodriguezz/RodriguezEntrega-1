import fs from 'fs';


const exitosamente = 'exitosamente';
const error = 'Error';

class ProductManager {
    constructor(ruta) {
        this.ruta = ruta
    }

    

    async readingJSON(){
        try {
            const data = await fs.promises.readFile(this.ruta, 'utf-8');
            const dataJSON = JSON.parse(data);
            return dataJSON;
        } 
        catch (error) {
            console.log(error);
        }
    }
    async fileSaving(item){
        try {
            const dataJSON = JSON.stringify(item);
            await fs.promises.writeFile(this.ruta, dataJSON);
        } 
        catch (error) {
            console.log(error);
        }
    }
    async addProducts(item){
        try {
            const products = await this.readingJSON();
            if(products.length){
                if(products.find( element => element.code === item.code )){
                    return console.log('Ya esta agregado')
                } else {
                    let lastIndex = products.length - 1;
                    let lastId = products[lastIndex].id;
                    item.id = lastId + 1;
                    let id = item.id;
                    products.push(item);
                    this.fileSaving(products);
                    console.log('Producto agregado',exitosamente)
                    return id;
                }
            } else {
                item.id = 1;
                products.push(item);
                this.fileSaving(products);
                console.log('Producto agregado',exitosamente)
            }
    
        } 
        catch (error) {
            console.log(error);
        }
    }
    async getProducts(){
        try {
            const product = await this.readingJSON();
            return console.log(product);
        } 
        catch (error) {
            console.log(error);
        }
    }
    async getProductsById(id){
        try {
            const product = await this.readingJSON();
            let productById;
            product.map(item => {
                item.id === id && (productById = item);
            });
            return productById ? console.log(productById) : console.log(error);
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateProduct(item){
        try {
            const product = await this.readingJSON();
            const productId = product.findIndex(product => product.id === item.id)
            if(productId >= 0){
                product[productId] = item
                await this.fileSaving(product);
                console.log('Actualizado', exitosamente);
            } else {
                console.log(error);
            }
        } 
        catch (error) {
            console.log(error);
        }
    }
    async deleteProduct(id){
        try {
            const product = await this.readingJSON();
            const productId = product.findIndex(item => item.id === id);
            if(productId >= 0) {
                product.splice(1, productId);
                await this.fileSaving(product);
                console.log('Producto eliminado', exitosamente);
            } else {
                console.log(error);
            }
        } 
        catch (error) {
            console.log(error);
        }
    }
}

const products = new ProductManager('./data/products.json');

await products.getProducts();

await products.addProducts({
    title:'Palo de Hockey Adidas',
    description:'(90% Carbono, curva perfecto para arrastrada y flick',
    price: 50200,
    thumbnail: 'Sinimagen',
    code:'behqhf55',
    stock: 4
});
await products.getProducts();

await products.addProducts({
    title:'Palo de Hockey TK',
    description:'(90% Carbono, curva perfecto para arrastrada y flick',
    price: 50300,
    thumbnail: 'Sinimagen',
    code:'behqhf55bfuoe',
    stock: 1
});
await products.getProductsById(1);

await products.updateProduct({
    title:'Palo de Hockey TK',
    description:'(90% Carbono, curva perfecto para arrastrada y flick',
    price: 90000,
    thumbnail: 'Sinimagen',
    code:'behqhf55bfuoe',
    stock: 5,
    id: 3
});

await products.getProducts();

await products.deleteProduct(4);

await products.getProducts();