class ProductManager {
    constructor (){
        this.products = [];
    }
    addProduct(item) {
        const products = this.getProducts();
        const addSuccessfully = 'Product has been add successfully'
        if(products.length){
            
            const result = products.find( element => element.code === item.code )
            
            if(result){
                return console.log('This products has already been added!!')
            } else {
                let lastIndex = products.length - 1;
                let lastId = products[lastIndex].id;
                item.id = lastId + 1;
                let id = item.id;
                this.products.push(item);
                console.log(addSuccessfully)
                return id;
            }

        } else {
            item.id = 1;
            this.products.push(item);
            console.log(addSuccessfully)
        }
        }
    getProducts() {
        const products = this.products;
        return products;
    }
    getProductById(id){
        const products = this.getProducts();
        let productsById;
        products.map(el => {
            el.id === id && (productsById = el);
        });
        return productsById ? console.log(productsById) : console.log('No encontrado');
    }
}

const productsManager = new ProductManager();

productsManager.addProduct({
    title:'Palo de Hockey Adidas',
    description:'(90% Carbono, curva perfecto para arrastrada y flick',
    price: 50200,
    thumbnail: 'Sinimagen',
    code:'behqhf55',
    stock: 4
});

productsManager.addProduct({
    title:'Palo de Hockey TK',
    description:'(90% Carbono, curva perfecto para arrastrada y flick',
    price: 50300,
    thumbnail: 'Sinimagen',
    code:'behqhf55bfuoe',
    stock: 1
});

console.log(productsManager.getProducts());

productsManager.getProductById(3);