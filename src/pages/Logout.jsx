import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Header, Icon, Table } from 'semantic-ui-react';

const Logout = () => {

  return (
    <div>
      <div>
        <Header as="h1">
          <Icon name="drivers license" />
          {' '}
          Logged out
          {' '}
        </Header>
        <p>
          You have been successfully logged out.
        </p>
      </div>
    </div>
  );
};

export default Logout;
