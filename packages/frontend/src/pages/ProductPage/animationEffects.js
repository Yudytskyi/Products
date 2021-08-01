const forms = {
  create: {
    fields: [{ name: 'productName', timeout: 300 }],
    marginLeftValue: '12.5%',
  },
  get: {
    fields: [{ name: 'productId', timeout: 300 }],
    marginLeftValue: '37.5%',
  },
  update: {
    fields: [
      { name: 'productId', timeout: 300 },
      { name: 'productName', timeout: 300 },
      { name: 'productType', timeout: 300 },
      { name: 'weight', timeout: 75 },
      { name: 'color', timeout: 75 },
      { name: 'dualSim', timeout: 75 },
      { name: 'graphicsCard', timeout: 75 },
    ],
    marginLeftValue: '62.5%',
  },
  delete: {
    fields: [{ name: 'productId', timeout: 300 }],
    marginLeftValue: '87.5%',
  },
};

export const animationEffects = currentForm => {
  const form = forms[currentForm];

  // add active type on selected form
  document.querySelectorAll('li').forEach(li => {
    li.id === currentForm
      ? li.setAttribute('active', 'true')
      : li.removeAttribute('active');
  });

  // set arrow on active form
  document.getElementById('arrowWrapper').style.marginLeft =
    form.marginLeftValue;

  // create current form
  const currentFormFields = form.fields.filter(field =>
    document.getElementById(field.name) ? field : undefined
  );

  // currentFormFields.forEach((field, i) => {
  //   const formInput = document.getElementById(field);
  //   if (formInput) {
  //     formInput.style.height = '0px';
  //     formInput.style.overflow = 'hidden';
  //     setTimeout(() => {
  //       formInput.style.height = '72px';
  //       formInput.style.overflow = '';
  //     }, i * timeout);
  //   }
  // });

  // change title and logo
  document
    .getElementById('logoLink')
    .setAttribute('href', `./logos/${currentForm}.png`);
  document.getElementById('title').innerHTML = currentForm;
};
