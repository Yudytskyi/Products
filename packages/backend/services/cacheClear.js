const cacheClear = async (model, id) => {
  const modelName = model.name;

  if (id) {
    await model.cache(`${modelName}:${id}`).clear();
  }

  await model.cache(`getAll${modelName}s`).clear();
};

module.exports = cacheClear;
