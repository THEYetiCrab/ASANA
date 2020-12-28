import React, { useCallback } from 'react';
import AccountList from './AccountList.jsx'
import Button from '@material-ui/core/Button';
import PlaidButton from './PlaidButton.jsx'


const NavBar = () => {

      return (
        <div className = "navbar">
          
        <PlaidButton />
        <AccountList />
        </div>
      );
};

// export default App;


export default NavBar;