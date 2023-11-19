import { useQuery, useQueryClient } from "@tanstack/react-query"

const POSTS = [
  {id: 1, title: "post 1"},
  {id: 2, title: "post 2"}
]

// the syntax of the queryKey:
// /posts -> ["posts"]
// /posts/1 -> ["posts", post.id]
// /posts?authorId=1 -> ["posts", {authorId: 1}]
// /posts/2/comments -> ["posts", post.id, "comments"]

export default function Query_2() {

  const queryClient = useQueryClient()
  const postsQuery = useQuery({ // it is like a "get" request
    queryKey: ["posts"], // a unique identifier for youe query
    queryFn: (obj) => // the important key of obj is queryKey
        wait(1000).then(() => {
            console.log(obj)
            return [...POSTS]
    })
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
      </div>
  )
}

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}