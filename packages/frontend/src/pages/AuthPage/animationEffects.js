const forms = {
  login: {
    fields: ['email', 'password'],
    marginLeftValue: '16.6667%',
  },
  signup: {
    fields: [
      'firstName',
      'lastName',
      'userName',
      'email',
      'password',
      'repass',
      'role',
    ],
    marginLeftValue: '50%',
  },
  logout: { fields: ['email'], marginLeftValue: '83.3333%' },
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
  document.getElementById('arrow').style.marginLeft = form.marginLeftValue;

  // add rotation on button title
  const submitButton = document.getElementById('submit');
  if (submitButton) {
    setTimeout(() => {
      submitButton.style.transform = 'rotate3d(0, 1, 0, 0deg)';
    }, 100);
  }

  // create current form
  form.fields.forEach((field, i) => {
    const formInput = document.getElementById(field);
    const timeout = 300 / form.fields.length;
    if (formInput) {
      formInput.style.height = '0px';
      formInput.style.overflow = 'hidden';
      setTimeout(() => {
        formInput.style.height = '72px';
        formInput.style.overflow = '';
      }, i * timeout);
    }
  });

  // change title and logo
  document
    .getElementById('logoLink')
    .setAttribute('href', `./logos/${currentForm}.png`);
  document.getElementById('title').innerHTML = currentForm;

  return () => {
    // before changed form type deleted rotation
    document.getElementById('submit').style.transform =
      'rotate3d(0, 1, 0, 90deg)';
  };
};
