const { Product, ProductType, Attribute } = require('../../models');
const _ = require('lodash');

const {
  db: {
    fields: { includesFields },
  },
} = require('../../config/db.json');

const getById = async (req, res, next) => {
  const {
    params: { productId },
  } = req;
  try {
    // const productInstance = await Product.findByPk(productId, {
    //   attributes: ['id', 'name'],
    //   include: [
    //     {
    //       model: ProductType,
    //       as: 'product_types',
    //       attributes: ['id', 'type_name'],
    //       returning: true,
    //       through: {
    //         attributes: includesFields,
    //       },
    //     },
    //   ],
    // });

    const productInstance = await Attribute.findOne({
      where: {
        product_id: productId,
        product_type_id: productTypeId,
      },
      attributes: includesFields,
      include: [
        {
          model: ProductType,
          attributes: ['type_name'],
        },
        {
          model: Product,
          attributes: ['id', 'name'],
        },
      ],
    });

    if (productInstance) {
      const productData = productInstance.dataValues;
      const productTypeData = productData.product_types[0].dataValues;
      const productInTypeData = productTypeData.ProductInType.dataValues;

      const prepareProducts = {
        productId: productData.id,
        name: productData.name,
        typeName: productTypeData.type_name,
        ...productInTypeData,
      };
      res.status(200).send({ data: prepareProducts });
    } else {
      res.status(404).send(`Product by id: ${productId} does not exist`);
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = getById;
