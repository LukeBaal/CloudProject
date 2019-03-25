import { describe } from 'riteway';
import React from 'react';
import render from 'riteway/render-component';
import Permissions from '../src/components/permissions/Permissions';

describe('Permission Component', async assert => {
  const createPermissions = permission =>
    render(<Permissions permissions={permission} />);

  {
    const permission = {
      pairKey: 'pair-key',
      company: 'some-company',
      name: true,
      email: true,
      phone: false,
      address: false,
      age: false
    };

    const PermissionsComponent = createPermissions(permission);

    assert({
      given: 'a permission item',
      should: 'render the permission item',
      actual: [
        PermissionsComponent('li[name="name"]')
          .html()
          .trim(),
        PermissionsComponent('li[name="email"]')
          .html()
          .trim(),
        PermissionsComponent('li[name="phone"]')
          .html()
          .trim(),
        PermissionsComponent('li[name="address"]')
          .html()
          .trim(),
        PermissionsComponent('li[name="age"]')
          .html()
          .trim()
      ],
      expected: [
        'Name: <i class="ml-2 fas fa-check text-success"></i>',
        'Email: <i class="ml-2 fas fa-check text-success"></i>',
        'Phone: <i class="ml-2 fas fa-times text-danger"></i>',
        'Address: <i class="ml-2 fas fa-times text-danger"></i>',
        'Age: <i class="ml-2 fas fa-times text-danger"></i>'
      ]
    });
  }

  {
    const permission = {
      pairKey: 'pair-key2',
      company: 'some-company2',
      name: true,
      email: false,
      phone: true,
      address: true,
      age: false
    };

    const PermissionsComponent = createPermissions(permission);

    assert({
      given: 'a different permission item',
      should: 'render the permission item',
      actual: [
        PermissionsComponent('li[name="name"]')
          .html()
          .trim(),
        PermissionsComponent('li[name="email"]')
          .html()
          .trim(),
        PermissionsComponent('li[name="phone"]')
          .html()
          .trim(),
        PermissionsComponent('li[name="address"]')
          .html()
          .trim(),
        PermissionsComponent('li[name="age"]')
          .html()
          .trim()
      ],
      expected: [
        'Name: <i class="ml-2 fas fa-check text-success"></i>',
        'Email: <i class="ml-2 fas fa-times text-danger"></i>',
        'Phone: <i class="ml-2 fas fa-check text-success"></i>',
        'Address: <i class="ml-2 fas fa-check text-success"></i>',
        'Age: <i class="ml-2 fas fa-times text-danger"></i>'
      ]
    });
  }
});
