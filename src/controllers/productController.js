const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  res.status(200).json({products});
};

const getProductById = async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await prisma.product.findUnique({ where: { id } });
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

const createProduct = async (req, res) => {
  const { name, price, categoryId } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        categoryId,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: "Error creating product" });
  }
};

const updateProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, categoryId } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, price, categoryId },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
};

const deleteProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.product.delete({
      where: { id },
    });
    res.status(204).send(); // No content
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
};

module.exports = {getProductById, getProducts, createProduct, updateProduct, deleteProduct}
