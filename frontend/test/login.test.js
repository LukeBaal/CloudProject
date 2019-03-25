import { describe } from 'riteway';
import React from 'react';
import render from 'riteway/render-component';
import Login from '../src/components/auth/Login';

describe('Login Component', async assert => {
  const createLogin = () => render(<Login />);

  {
    const LoginComponent = createLogin();

    LoginComponent('input#email').val('john@gmail.com');

    assert({
      given: 'an email',
      should: 'update the email form input',
      actual: LoginComponent('input#email').val(),
      expected: 'john@gmail.com'
    });
  }

  {
    const LoginComponent = createLogin();
    LoginComponent('input#email').val('bob@gmail.com');

    assert({
      given: 'a different email',
      should: 'update the email form input',
      actual: LoginComponent('input#email').val(),
      expected: 'bob@gmail.com'
    });
  }

  {
    const LoginComponent = createLogin();
    LoginComponent('input#password').val('123456');

    assert({
      given: 'a password',
      should: 'update the password form input',
      actual: LoginComponent('input#password').val(),
      expected: '123456'
    });
  }
});
