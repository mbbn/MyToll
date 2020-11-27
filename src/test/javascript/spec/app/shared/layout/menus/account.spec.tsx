import React from 'react';
import { shallow } from 'enzyme';

import { AccountMenu } from 'app/shared/layout/menus';

describe('AccountMenu', () => {
  let mountedWrapper;

  const authenticatedWrapper = () => {
    if (!mountedWrapper) {
      mountedWrapper = shallow(<AccountMenu isAuthenticated />);
    }
    return mountedWrapper;
  };
  const guestWrapper = () => {
    if (!mountedWrapper) {
      mountedWrapper = shallow(<AccountMenu />);
    }
    return mountedWrapper;
  };

  beforeEach(() => {
    mountedWrapper = undefined;
  });

  // All tests will go here
});
