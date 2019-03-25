import { describe } from 'riteway';
import React from 'react';
import render from 'riteway/render-component';
import UpdateProfile from '../src/components/user/UpdateProfile';
import AuthContext from '../src/contexts/AuthContext';

describe('UpdateProfile Component', async assert => {
  const user = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john@gmail.com',
    address: '26 Main St.',
    phone: '555-555-1234',
    age: 34
  };

  const auth = {
    isAuthenticated: true,
    user
  };
  const createUpdateProfile = () =>
    render(
      <AuthContext.Provider value={auth}>
        <UpdateProfile />
      </AuthContext.Provider>
    );
  {
    const UpdateProfileComponent = createUpdateProfile();

    UpdateProfileComponent('input#firstname').val('John');
    UpdateProfileComponent('input#lastname').val('Doe');
    UpdateProfileComponent('input#address').val('25 Main St.');

    assert({
      given: "a user's name",
      should: 'update the name fields',
      actual: [
        UpdateProfileComponent('input#firstname').val(),
        UpdateProfileComponent('input#lastname').val(),
        UpdateProfileComponent('input#address').val()
      ],
      expected: ['John', 'Doe', '25 Main St.']
    });
  }

  {
    const UpdateProfileComponent = createUpdateProfile();

    UpdateProfileComponent('input#firstname').val('Mary');
    UpdateProfileComponent('input#lastname').val('Williams');

    assert({
      given: "a user's name",
      should: 'update the name fields',
      actual: [
        UpdateProfileComponent('input#firstname').val(),
        UpdateProfileComponent('input#lastname').val()
      ],
      expected: ['Mary', 'Williams']
    });
  }
});
