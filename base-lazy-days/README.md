### Prefetch treatments
*Example*

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