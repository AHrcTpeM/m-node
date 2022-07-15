function Product(id, name, description, price, brand, activeSize, quantity, reviews, images) {
    // this = {};  (неявно)
    this.ID = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    this.activeSize = activeSize;
    this.quantity = quantity;
    this.date = new Date();
    this.reviews = reviews;
    this.images = images;

    this.getID = function() {
        return this.ID;
    };
    this.setID = function(id) {
        this.ID = id;
    };

    this.getName = function() {
        return this.name;
    };
    this.setName = function(name) {
        this.name = name;
    };

    this.getDescription = function() {
        return this.description;
    };
    this.setDescription = function(description) {
        this.description = description;
    };

    this.getPrice = function() {
        return this.price;
    };
    this.setPrice = function(price) {
        this.price = price;
    };

    this.getBrand = function() {
        return this.brand;
    };
    this.setBrand = function(brand) {
        this.brand = brand;
    };

    this.getSizes = function() {
        return this.sizes;
    };
    this.setSizes = function(sizes) {
        this.sizes = sizes;
    };

    this.getActiveSize = function() {
        return this.activeSize;
    };
    this.setActiveSize = function(activeSize) {
        this.activeSize = activeSize;
    };

    this.getQuantity = function() {
        return this.quantity;
    };
    this.setQuantity = function(quantity) {
        this.quantity = quantity;
    };
    
    this.getDate = function() {
        return this.date;
    };
    this.setDate = function(date) {
        this.date = date;
    };

    this.getReviews = function() {
        return this.reviews;
    };
    this.setReviews = function(reviews) {
        this.reviews = reviews;
    };

    this.getImages = function() {
        return this.images;
    };
    this.setImages = function(images) {
        this.images = images;
    };


    this.getReviewByID = function(id) {
        for (let review of this.getReviews()) {
            if (review.ID === id) {
                return review;
            }
        }
    }

    this.getImage = function(idx = 0) {
        return this.getImages()[idx];
    }

    this.addSize = function(size) {
        this.getSizes().push(size);
    }

    this.deleteSize = function(size) {
        for (let i = 0; i < this.getSizes().length; i++) {
            if (this.getSizes()[i] === size) {
                this.getSizes().splice(i, 1);
            } 
        }
    }

    this.addReview = function(review) {
        this.getReviews().push(review);
    }

    this.deleteReview = function(id) {
        for (let i = 0; i < this.getReviews().length; i++) {
            if (this.getReviews()[i].ID === id) {
                this.getReviews().splice(i, 1);
            } 
        }
    }

    this.getAverageRating = function() {
        let sum = 0;
        let count = 0;

        for (let review of this.getReviews()) {
            for (let key in review.rating) {
                sum += review.rating[key];
                count++;
            }
        }
        return sum / count;
    }
    // return this;  (неявно)
}


function Reviews(id2, author, comment, rating) {
    this.ID = id2;
    this.author = author;
    this.date = new Date();
    this.comment = comment;
    this.rating = {
        'service': rating[0],
        'price': rating[1],
        'value': rating[2],
        'quality': rating[3],
    };
}

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

/* Create instances and test */
let reviews = [new Reviews(1, "Tom", "will go", [6,9,8,5]), 
               new Reviews(4, "Sam", "fly away", [7,7,4,6]), 
               new Reviews(7, "Anna", "very good", [10,5,6,7])];

let shirt = new Product(111, "shirt", "fashionable and youthful", 225, "Cool-Fool", "L", 14, reviews, ["big", "small", "medium"]);

console.log(shirt);
console.log(shirt.setID(24), shirt.getID(), shirt.getSizes());
console.log(shirt.getReviewByID(1));
console.log(shirt.getImage(2));
shirt.addSize('XXXL');
console.log(shirt.getSizes());
shirt.deleteSize('L');
console.log(shirt.getSizes());

let review1 = new Reviews(9, "Alex", "carryon", [3,2,1,5]);
shirt.addReview(review1);
console.log("addReview:", shirt.getReviews().length);
shirt.deleteReview(4);
shirt.deleteReview(7);
console.log("deleteReview:", shirt.getReviews().length);
console.log(shirt.getAverageRating());


let products = [
    new Product(111, "shirt", "fashionable AND youthful", 225, "Cool-Fool", "L", 14, reviews, ["big", "small", "medium"]),
    new Product(112, "dress", "light aNd lovely", 399, "Red-flower", "M", 8, reviews, ["chamomile", "lily", "rose flower"]),
    new Product(113, "shoes", "business And classic", 290, "Black-castle", "XL", 4, reviews, ["black", "gray", "dark gray"])]

console.log("Number of products found", searchProducts(products, "anD").length);

Product.prototype.toString = function() {
        return "Product {ID: " + this.ID + ", name: " + this.name + "}"
    }

sortProducts(products, "name");
console.log(products.toString());