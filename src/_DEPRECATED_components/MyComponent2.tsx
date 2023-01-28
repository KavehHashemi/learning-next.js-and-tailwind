/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

export default function MyComponent2() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

async function fetchProjects(page = 0) {
  const { data } = await axios.get("/api/projects?page=" + page);
  return data;
}

function Example() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);

  const { status, data, error, isFetching, isPreviousData } = useQuery(
    ["projects", page],
    () => fetchProjects(page),
    { keepPreviousData: true, staleTime: 5000 }
  );

  // Prefetch the next page!
  useEffect(() => {
    if (data?.hasMore) {
      queryClient.prefetchQuery(["projects", page + 1], () =>
        fetchProjects(page + 1)
      );
    }
  }, [data, page, queryClient]);

  return (
    <div>
      <p>
        In this example, each page of data remains visible as the next page is
        fetched. The buttons and capability to proceed to the next page are also
        supressed until the next page cursor is known. Each page is cached as a
        normal query too, so when going to previous pages, you'll see them
        instantaneously while they are also refetched invisibly in the
        background.
      </p>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>Error: {"error"}</div>
      ) : (
        // `data` will either resolve to the latest page's data
        // or if fetching a new page, the last successful page's data
        <div>
          {data.projects.map(
            (project: {
              id: React.Key | null | undefined;
              name:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
            }) => (
              <p key={project.id}>{project.name}</p>
            )
          )}
        </div>
      )}
      <div>Current Page: {page + 1}</div>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{" "}
      <button
        onClick={() => {
          setPage((old) => (data?.hasMore ? old + 1 : old));
        }}
        disabled={isPreviousData || !data?.hasMore}
      >
        Next Page
      </button>
      {
        // Since the last page's data potentially sticks around between page requests,
        // we can use `isFetching` to show a background loading
        // indicator since our `status === 'loading'` state won't be triggered
        isFetching ? <span> Loading...</span> : null
      }{" "}
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}
