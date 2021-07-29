const marginLeftValues = {
  create: '12.5%',
  get: '37.5%',
  update: '62.5%',
  delete: '87.5%',
};

const formPages = {
  create: ['productName', 'productType', 'attributes'],
  get: ['productId'],
  update: ['productId', 'productName', 'productType', 'attributes'],
  delete: ['productId'],
};

export const animationEffects = (currentForm) => {
  // add active type on selected form
  document.querySelectorAll('li').forEach((li) => {
    li.id === currentForm
      ? li.setAttribute('active', 'true')
      : li.removeAttribute('active');
  });

  // set arrow on active form
  document.getElementById('arrowWrapper').style.marginLeft =
    marginLeftValues[currentForm];
};
