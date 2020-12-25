import React, { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import Button from '@material-ui/core/Button';



const NavBar = () => {
  const onSuccess = useCallback((token, metadata) => {
    //     // send token to server
      }, []);

      const config = {
        token: '<GENERATED_LINK_TOKEN>',
        onSuccess,
        // ... 
      };

      const { open, ready, error } = usePlaidLink(config);


      return (
        <div className = "navbar">
          <Button variant="contained" color="primary">
        {/* <MyButton onClick={() => open()} disabled={!ready}> */}
          Connect a bank account
          </Button>
        {/* </MyButton> */}
        </div>
      );
};



export default NavBar;
