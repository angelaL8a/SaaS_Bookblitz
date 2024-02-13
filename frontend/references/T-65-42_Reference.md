## Design and implement registration and login pages, including necessary logic to authenticate users and manage their sessions

With the assistance of the `graphql-request` https://github.com/jasonkuhrt/graphql-request library, it's possible to send requests, mutations, and queries to the GraphQL API. To streamline this process, a GraphQL client was implemented in `graphql/client.js`, which handles these operations.

Additionally, the `graphql/mutations` and `graphql/queries` directories were created to contain mutation and query definitions, respectively. These files are responsible for defining the specific operations sent to the GraphQL server.

To enhance the user experience, toasts were implemented using the library https://ui.shadcn.com/docs/components/toast. These toasts are utilized to alert users when their inputs are incorrect or not associated with the correct data.

For managing state and authentication-related logic, the `use-auth.js` hook was created. This hook handles user session state, caches data, and performs authentication-related actions.

Finally, in the `login.jsx` and `register.jsx` files, the necessary logic was implemented to send authentication and registration requests, respectively. If the operation is successful, the corresponding response to registration or login is handled. Otherwise, an error toast is displayed indicating the encountered error.
