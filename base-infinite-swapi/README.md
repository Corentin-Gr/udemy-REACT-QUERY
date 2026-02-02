### Problem with using ReactQuery and React InfiniteScroll

*** The symptom ***
Page 2 loads twice on load. 

*** The explanation ***
The <InfiniteScroll> component automatically loads what it THINKS is the first page (the value of ReactQuery's loadMore function)
However, the actual first page gets loaded via useQuery and the first result of loadMore is the second page.

*** The solution ***
We can eliminate the duplicate page 2 fetch by settings the <InfiniteScroll>'s initialLoad prop to false


### A note on Bi-directional Scrolling
- Bi-directional is useful when starting in the middle
- All *next* methods and properties have equivalent for *previous*