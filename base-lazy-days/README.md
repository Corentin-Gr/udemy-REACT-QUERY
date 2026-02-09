### Prefetch treatments

_Example_

- User loads home page
- > queryClient.prefetchQuery adds treatments data to cache
- > User loads treatments page
- > Within gcTime (garbage collector time) ?
    - > Yes -> treatments data loaded from cache used as placeholder, useQuery fetches fresh data
    - > No -> No placeholder, useQuery fetches fresh data

### Pre-populating data options

- pre-fetch
- setQueryData
- placeholderData,
- initialData

# Pre-fetch to pre-populate cache

- on component render
- on page update (useEffect)
- use keys as dependency arrays

### setQueryData on signin, removeQueries on signout

### Setup for Tests

_Better to test user interactions rather than what is happening internally_

- npm i vitest
- npm i @testing-library/react
- npm i @testing-library/jest-dom
- Config:
    - vite.config.js
    - setupTests.js
    - tsconfig.json -> compiler options: typeRoots and types
- npm i eslint-plugin-vitest eslint-plugin-testing-library
    - Config in .eslintrc.cjs:
        - Require eslint-plugin-vitest
        - Add vitest globals to globals array
        - Add items to extends array
        - Turn off expect/expect rule (prevents showing squiggly lines when missing expect statement)
- Mock Service Worker
    - Purpose:
        - intercept network calls
        - return specified response
    - Prevents network calls during tests
    - Set up test conditions using server response
    - npm i msw
    - MSW setup in src/mocks & src/setupTests.js

# NB
- Wrap components and hooks in a query provider
    - With a separate query client per test to avoid to avoid cross contamination 
    - Query client should use same defaults as production to replicate real env (and can be expanded upon from there)
- Suppress retries when testing errors (retries take a while and can cause testing timeouts)
