const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategoriesData = await Category.findAll({include: Product});
    res.status(200).json(allCategoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryIdData = await Category.findByPk(req.params.id, {
      // JOIN with Product
      include: [{ model: Product}]

    });

    if (!categoryIdData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryIdData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createdCategoryData = await Category.create(req.body);
    res.status(200).json(createdCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedCategoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(updatedCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategoryData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedCategoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(deletedCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
