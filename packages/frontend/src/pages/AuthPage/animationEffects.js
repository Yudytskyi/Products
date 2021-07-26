const marginLeftValues = {
  login: '40px',
  signup: '50%',
  logout: 'calc(100% - 40px)',
};

const formInputs = {
  login: ['email', 'password'],
  signup: [
    'firstName',
    'lastName',
    'userName',
    'email',
    'password',
    'repass',
    'role',
  ],
  logout: ['email'],
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

  // add rotation on button title
  setTimeout(() => {
    document.getElementById('submit').style.transform =
      'rotate3d(1, 0, 0, 0deg)';
  }, 300);

  // create current form
  const container = document.querySelector('#inputList');
  const inputWrappers = container.querySelectorAll('li');
  inputWrappers.forEach((element) => {
    const name = element.attributes.name?.value;

    if (name && !formInputs[currentForm].includes(name)) {
      element.style.height = '0px';
      element.style.margin = 0;
    }
  });

  // form.reset();

  return () => {
    // before changed form type deleted rotation
    document.getElementById('submit').style.transform =
      'rotate3d(1, 0, 0, 90deg)';

    // before changed form type set default value of height and margin
    inputWrappers.forEach((element) => {
      element.style.height = '';
      element.style.margin = '';
    });
  };
};
