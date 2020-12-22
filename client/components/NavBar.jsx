import React, { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';


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
        <MyButton onClick={() => open()} disabled={!ready}>
          Connect a bank account
        </MyButton>
      );
};



export default NavBar;
