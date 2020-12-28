import React, { useCallback, useEffect, useState } from 'react'; 
import { usePlaidLink } from 'react-plaid-link'; 

function PlaidButton() {

  const [linkToken, setLinkToken] = useState(''); 
  
  //Load the link token immediately when page renders and store in state
  useEffect(() => {
    const token = fetch('/test/get_link_token',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    ).then(response => response.json())
    .then(data => {
      setLinkToken(data); 
    })
  }, [])

  
  const onSuccess = useCallback((public_token, metadata) => { 
    fetch('/test/get_access_token', {
      method: 'POST',
      body: JSON.stringify({
        public_token: public_token,
        accounts: metadata.accounts,
        institution: metadata.institution,
        link_session_id: metadata.link_session_id,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    // send token to server
  }, []);
  
  //Set up config to pass into usePlaidLink
  const config = {
    token: linkToken, 
    onSuccess: onSuccess
  }

  const {open, ready, error } = usePlaidLink(config); 


return (
  <button className="linkButton" onClick={() => open()} disabled={!ready}>Link Account</button>
)
}
export default PlaidButton;