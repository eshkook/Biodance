import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

const POSTS = [
  { id: 1, title: "post 1" },
  { id: 2, title: "post 2" }
]

export default function Query_1() {

  const queryClient = useQueryClient() // with this hook we determine later where we want to refetch data
  const postsQuery = useQuery({ // it is like a "get" request
    queryKey: ["posts"], // a unique identifier for your query
    // queryFn: () => Promise.reject("Error Message"),
    queryFn: () => wait(1000).then(() => [...POSTS]),
  })

  const newPostMutation = useMutation({ // it is like a "post" request. to trigger it you need 'newPostMutation.mutate'
    mutationFn: title => {
      return wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title })
      )
    },
    onSuccess: () => { // when we changed something in POSTS we want to re-fetch it with the 'postsQuery' useQuery 
      queryClient.invalidateQueries(["posts"])
    }
  })

  if (postsQuery.isLoading) return <h1>Loading...</h1>
  if (postsQuery.isError) {
    return <pre>{JSON.stringify(postsQuery.error)}</pre>
  }

  return (
    <div style={{ marginTop: 20 }}>
      {postsQuery.data.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
      <br />
      <button
        disabled={newPostMutation.isLoading}  // will disable the button when loading the new post we just added
        onClick={() => newPostMutation.mutate("New Post")}>
        Add New Post
      </button>
    </div>
  )
}

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}