const Product = require("../models/product");
module.exports = {
    getAll(req, res) {
        Product.find().then(products => {
            res.send(products);
        });
    },
    get(req, res) {
        const id = req.params.id;
        Product.findById(id).then(product => {
            res.send(product);
        });
    },
    create(req, res) {
        console.log(req.body);
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            categories: [req.body.categories],
            allergenes: [req.body.allergenes],
            price_type: req.body.price_type,
            price: req.body.price,
            promotion: req.body.promotion,
            highlighted: req.body.highlighted,
            available: req.body.available
        });
        product.save().then(() => {
            res.send({ result: `Création du produit ${product.name}` });
        });
    },
    update(req, res) {
        console.log(req.body);
        const id = req.body._id;
        if (id) {
            Product.findByIdAndUpdate(id, req.body).then(product => {
                res.send(`Mise à jour du produit ${product.name}`);
            });
        } else {
            res.send({ result: "Un id est nécessaire pour mettre à jour le produit" });
        }
    },
    delete(req, res) {
        const id = req.body._id;
        Product.findByIdAndRemove(id).then(product => {
            res.send({ result: `Suppression du produit ${product.name}` });
        });
    }
}