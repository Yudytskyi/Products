const { sequelize, Product, ProductType, Attribute } = require('../../models');
const { prepareObjects } = require('../../services');
const { getValueByKeys } = require('../../services');
const {
  db: { modelPreparedProduct },
} = require('../../config/db.json');

const updateByIdProducts = async (req, res, next) => {
  const {
    body,
    params: { productId },
  } = req;

  try {
    const productInstance = await Product.findByPk(productId);
    if (!productInstance) {
      res.status(404).send(`Product by id: ${productId} does not exist`);
    }

    const transaction = await sequelize.transaction();

    const [updatedProductCount] = await Product.update(
      { name: body.data.name },
      {
        where: { id: productId },
        returning: true,
        transaction,
      }
    );

    const productTypeInstance = await ProductType.findOne({
      where: { typeName: body.data.typeName },
      transaction,
    });
    const productTypeId = getValueByKeys(productTypeInstance, 'id');

    const [updatedAttributesCount] = await Attribute.update(
      body.data.attributes,
      {
        where: { productId, productTypeId },
        returning: true,
        transaction,
      }
    );

    updatedProductCount === 1 && updatedAttributesCount === 1
      ? await transaction.commit()
      : (await transaction.rollback(), next(createError(400)));

    const updatedProduct = await Product.findByPk(productId, {
      include: [ProductType, Attribute],
    });

    res.status(200).send({
      data: prepareObjects(updatedProduct, modelPreparedProduct),
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = updateByIdProducts;
