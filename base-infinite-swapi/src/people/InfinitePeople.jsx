import InfiniteScroll from 'react-infinite-scroller';
import { Person } from './Person';
import { useInfiniteQuery } from '@tanstack/react-query';

const initialUrl = 'https://swapi.dev/api/people/';
const fetchUrl = async (url) => {
    const response = await fetch(url);
    return response.json();
};

export function InfinitePeople() {
    const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } =
        useInfiniteQuery({
            queryKey: ['sw-people'],
            queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
            getNextPageParam: (lastPage) => {
                return lastPage.next || undefined;
            },
        });

    if (isLoading) return <div className='loading'>Loading...</div>;
    if (isError) return <div className='error'>An error occured...</div>;

    return (
        <>
            {isFetching && <div className='loading'>Loading...</div>}
            <InfiniteScroll
                initialLoad={false} // Prevents loading what InfiniteScroll THINKS is the first page (loadMore result). ReactQuery already takes care of everything.
                hasMore={hasNextPage}
                loadMore={() => {
                    if (!isFetching) {
                        fetchNextPage();
                    }
                }}>
                {data.pages.map((pageData) => {
                    return pageData.results.map((person) => {
                        return (
                            <Person
                                key={person.name}
                                name={person.name}
                                hairColor={person.hair_color}
                                eyeColor={person.eye_color}
                            />
                        );
                    });
                })}
            </InfiniteScroll>
        </>
    );
}
