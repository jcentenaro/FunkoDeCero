const index = (req, res) => {
    res.render("index",{
    title: "Home - FunkoPop",
});
};
const contact = (req, res) => {
    res.render("contact");
};
const faqs =(req, res) => {
    res.render("faqs");
};
const us = (req, res) => {
    res.send("Nosotros");
};

module.exports = {
    index,
    contact,
    faqs,
    us
};