function AbstractProduct(id, name, description, price, quantity, reviews, images, date, brand) {
    
    if (this.constructor === AbstractProduct) {
        throw new Error("FYI: Instance of Abstract class cannot be instantiated");
    }

    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.reviews = reviews;
    this.images = images;
    this.date = date;
    this.brand = brand;  
}

Object.assign(AbstractProduct.prototype, {
    getID() {
        return this.ID;
    },
    setID(id) {
        this.ID = id;
    },

    getName() {
        return this.name;
    },
    setName(name) {
        this.name = name;
    },

    getDescription() {
        return this.description;
    },
    setDescription(description) {
        this.description = description;
    },

    getPrice() {
        return this.price;
    },
    setPrice(price) {
        this.price = price;
    },

    getQuantity() {
        return this.quantity;
    },
    setQuantity(quantity) {
        this.quantity = quantity;
    },

    getBrand() {
        return this.brand;
    },
    setBrand(brand) {
        this.brand = brand;
    },

    getDate() {
        return this.date;
    },
    setDate(date) {
        this.date = date;
    },

    getReviews() {
        return this.reviews;
    },
    setReviews(reviews) {
        this.reviews = reviews;
    },

    getImages() {
        return this.images;
    },
    setImages(images) {
        this.images = images;
    },
    
    getFullInformation() {
        console.log(`id - ${this.id}, name - ${this.name}, description - ${this.description}, price - ${this.price}, quantity - ${this.quantity}, reviews - ${this.reviews}, images - ${this.images}, date - ${this.date}, brand - ${this.brand}`);
    },

    getPriceForQuantity(int) {
        return `$${this.getPrice() * int}`
    },

    getterSetter(prop, value) {
        if (value === undefined) {
            return this[prop];
        } else {
            this[prop] = value;
        }
    },

    toString() {
        return "Product {ID: " + this.id + ", name: " + this.name + ", price: " + this.price + "}"
    }

  })

function Clothes (id, name, description, price, quantity, reviews, images, date, brand, activeSize, material, color) {
    AbstractProduct.call(this, id, name, description, price, quantity, reviews, images, date, brand);
    this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    this.activeSize = activeSize;
    this.material = material;
    this.color = color;
}

Clothes.prototype = Object.create(AbstractProduct.prototype);
Clothes.prototype.constructor = Clothes;
Object.assign(Clothes.prototype, {

    getSizes() {
        return this.sizes;
    },
    setSizes(sizes) {
        this.sizes = sizes;
    },

    getActiveSize() {
        return this.activeSize;
    },
    setActiveSize(activeSize) {
        this.activeSize = activeSize;
    },
    
    getMaterial() {
        return this.material;
    },
    setMaterial(material) {
        this.material = material;
    },

    getColor() {
        return this.color;
    },
    setColor(color) {
        this.color = color;
    },

    getReviewByID(id) {
        for (let review of this.getReviews()) {
            if (review.ID === id) {
                return review;
            }
        }
    },

    getImage(idx = 0) {
        return this.getImages()[idx];
    },

    addSize(size) {
        this.getSizes().push(size);
    },

    deleteSize(size) {
        for (let i = 0; i < this.getSizes().length; i++) {
            if (this.getSizes()[i] === size) {
                this.getSizes().splice(i, 1);
            } 
        }
    },

    addReview(review) {
        this.getReviews().push(review);
    },

    deleteReview(id) {
        for (let i = 0; i < this.getReviews().length; i++) {
            if (this.getReviews()[i].ID === id) {
                this.getReviews().splice(i, 1);
            } 
        }
    },

    getAverageRating() {
        let sum = 0;
        let count = 0;

        for (let review of this.getReviews()) {
            for (let key in review.rating) {
                sum += review.rating[key];
                count++;
            }
        }
        return sum / count;
    },

})


function Electronics(id, name, description, price, quantity, reviews, images, date, brand, warranty, power) {
    AbstractProduct.call(this, id, name, description, price, quantity, reviews, images, date, brand);
    this.warranty = warranty;
    this.power = power;
}

Electronics.prototype = Object.create(AbstractProduct.prototype);
Electronics.prototype.constructor = Electronics;
Object.assign(Electronics.prototype, {
    getWarranty() {
        return this.warranty;
    },
    setWarranty(warranty) {
        this.warranty = warranty;
    },

    getPower() {
        return this.power;
    },
    setPower(power) {
        this.power = power;
    },

})

function searchProducts(products, search) {
    let result = [];
    search = search.toLowerCase();
    for (let product of products) {
        let  normalizedName = product.getName().toLowerCase();
        let  normalizedDescription = product.getDescription().toLowerCase();

        if (normalizedName.includes(search) || normalizedDescription.includes(search)) {
            result.push(product);
        }
    }
    return result;
}

function sortProducts(products, sortRule) {
    switch (sortRule) {
        case "name":
            products.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name == b.name) return 0;
                if (a.name < b.name) return -1;
            });
            break;
        case "price":
            products.sort((a, b) => {
                return a.price - b.price;
            });
            break;
        default:
            products.sort((a, b) => {
                return a.ID - b.ID;
            });
            break;
    }
}

//const abstractProduct = new AbstractProduct(); //FYI: Instance of Abstract class cannot be instantiated
const shirt = new Clothes(1, "shirt", "very good", 249.49, 5, [{}], ["1.png", "2.png", "3.png"], "2022-06-27 13:49:52.63", "BAD BRAND", "M", "cotton", "red");
const dress = new Clothes(2, "dress", "beautiful and light", 150.98, 5, [{}], ["1.png", "2.png", "3.png"], "2022-06-27 13:49:52.63", "BAD BRAND", "M", "cotton", "red");
shirt.getFullInformation();
console.log(shirt.getPriceForQuantity(4));
shirt.addSize("BigBoss")
console.log(shirt.getSizes());
shirt.getterSetter("price", 239.49);
console.log("New price:", shirt.getterSetter("price"));

const car = new Electronics(3, "automobile", "quickly and reliably", 1399.49, 9, [{}], ["11.png", "12.png", "13.png"], "2022-06-27 13:49:52.63", "Cars and Son's", 10, 150);
const motorbike = new Electronics(4, "motorbike", "cool and solid", 789.05, 9, [{}], ["11.png", "12.png", "13.png"], "2022-06-27 13:49:52.63", "Cars and Son's", 10, 150)
car.getFullInformation();
console.log(car.getPriceForQuantity(2));
car.getterSetter("power", 158);
console.log("New power:", car.getterSetter("power"));

let products = [shirt, dress, car, motorbike];
console.log(products.toString());
console.log(searchProducts(products, "and").toString());
sortProducts(products, "price")
console.log(products.toString());