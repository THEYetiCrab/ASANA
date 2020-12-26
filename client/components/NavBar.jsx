import React, { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';


const Connect = () => {
  const onSuccess = useCallback((token, metadata) => {
    // send token to server
  }, []);

  const config = {
    token: '<GENERATED_LINK_TOKEN>',
    onSuccess,
    // ...
  };

  const { open, ready, error } = usePlaidLink(config);

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
};


// import { usePlaidLink } from '../src';

// const App = props => {
//   const onSuccess = useCallback(
//     (token, metadata) => console.log('onSuccess', token, metadata),
//     []
//   );

//   const onEvent = useCallback(
//     (eventName, metadata) => console.log('onEvent', eventName, metadata),
//     []
//   );

//   const onExit = useCallback(
//     (err, metadata) => console.log('onExit', err, metadata),
//     []
//   );

//   const config = {
//     token: props.token,
//     onSuccess,
//     onEvent,
//     onExit,
//     // –– optional parameters
//     // receivedRedirectUri: props.receivedRedirectUri || null,
//     // ...
//   };

//   const { open, ready, error } = usePlaidLink(config);

//   return (
//     <>
//       <button
//         type="button"
//         className="button"
//         onClick={() => open()}
//         disabled={!ready || error}
//       >
//         Open Plaid Link
//       </button>
//     </>
//   );
// };

// export default App;




export default Connect;


// import React, { useCallback } from 'react';
// import { usePlaidLink } from 'react-plaid-link';

// const App = () => {
//   const onSuccess = useCallback((token, metadata) => {
//     // send token to server
//   }, []);

//   const config = {
//     token: '<GENERATED_LINK_TOKEN>',
//     onSuccess,
//     // ...
//   };

//   const { open, ready, error } = usePlaidLink(config);

//   return (
//     <MyButton onClick={() => open()} disabled={!ready}>
//       Connect a bank account
//     </MyButton>
//   );
// };
// export default App;