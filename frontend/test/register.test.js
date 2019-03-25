import { describe } from 'riteway';
import React from 'react';
import render from 'riteway/render-component';
import Register from '../src/components/auth/Register';

describe('Register Component', async assert => {
  const createRegister = () => render(<Register />);

  {
    const RegisterComponent = createRegister();

    RegisterComponent('input#firstname').val('John');
    RegisterComponent('input#lastname').val('Doe');
    RegisterComponent('input#password').val('123456');
    RegisterComponent('input#password2').val('123456');

    assert({
      given: "a user's name",
      should: 'update the name fields',
      actual: [
        RegisterComponent('input#firstname').val(),
        RegisterComponent('input#lastname').val(),
        RegisterComponent('input#password').val(),
        RegisterComponent('input#password2').val()
      ],
      expected: ['John', 'Doe', '123456', '123456']
    });
  }

  {
    const RegisterComponent = createRegister();

    RegisterComponent('input#firstname').val('Mary');
    RegisterComponent('input#lastname').val('Williams');

    assert({
      given: "a user's name",
      should: 'update the name fields',
      actual: [
        RegisterComponent('input#firstname').val(),
        RegisterComponent('input#lastname').val()
      ],
      expected: ['Mary', 'Williams']
    });
  }
});
