const shopView = (req, res) => {
    res.send("Shop HOME");
};
const idView = (req, res) => {
    res.send("Shop ITEM ID");
};
const itemView = (req, res) => {
    res.send("Shop ITEM ID ADD");
};
const cartView = (req, res) => {
    res.send("Cart GET");
};
const checkoutView = (req, res) => {
    res.send("Cart POST");
};

module.exports = {
    shopView,
    idView,
    itemView,
    cartView,
    checkoutView
};