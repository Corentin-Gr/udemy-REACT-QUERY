### NOTES

*** staleTime *** 
Whether or not to refetch. How old am I willing to let the data get before having to go back to the server and check whether it's still accurate.

*** gcTime *** 
'Garbage collector time'
How long data is kept after inactivity. Is used as placeholder while contacting the server.

*** isFetching vs isLoading ***
- isFetching -> the async query function hasn't yet resolved
- isLoading -> no chaced data, PLUS isFetching (isLoading meaning isFetching but the other way around isn't true)

*** Query keys ***
Dependency arrays for the queries