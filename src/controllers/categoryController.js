const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getCategories = async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
};

const getCategoryById = async (req, res) => {
  const id = parseInt(req.params.id);
  const category = await prisma.category.findUnique({ where: { id } });
  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ message: "Category not found" });
  }
};

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await prisma.category.create({
      data: { name },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: "Error creating category" });
  }
};

const updateCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name },
    });
    res.json(updatedCategory);
  } catch (error) {
    res.status(404).json({ error: "Category not found" });
  }
};

const deleteCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.category.delete({
      where: { id },
    });
    res.status(204).send(); // No content
  } catch (error) {
    res.status(404).json({ error: "Category not found" });
  }
};

module.exports = {getCategories, getCategoryById, createCategory, updateCategory ,deleteCategory}