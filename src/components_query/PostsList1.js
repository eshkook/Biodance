import { useQuery } from "@tanstack/react-query"
import { getPosts } from "../api/posts.js"

export default function PostsList1() {

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: 5000, // will make newly fetched data 'fresh' for 5 seconds before becoming 'stale'
                     // When data is fresh, React Query will not attempt to refetch it 
                     //         when components re-render or when new components that need the same data are mounted. 
    // refetchInterval: 10000 , // will re-fetch every 10 seconds, even if it is fresh at a given moment                  
    placeholderData: [{ id: 1, title: "Initial Data" }], // will be displayed initially until response comes in.
                                    // it overrides the later code :'if (postsQuery.status === "loading") return <h1>Loading...</h1>'
  })

  if (postsQuery.status === "loading") return <h1>Loading...</h1> // will not show as it is overridden by placeholderData above
  if (postsQuery.status === "error") {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>
  }

  return (
    <div>
      <h1>Posts List 1</h1>
      <ol>
        {postsQuery.data.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  )
}