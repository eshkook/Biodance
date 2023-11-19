import { useState } from "react"
import CreatePost from "./CreatePost.js"
import Post from "./Post.js"
import PostsList1 from "./PostsList1.js"
import PostsList2 from "./PostsList2.js"

export default function Query_3() {
    const [currentPage, setCurrentPage] = useState(<PostsList1 />)

    return (
        <div>
            <br />
            <br />
            <button onClick={() => setCurrentPage(<PostsList1 />)}>
                Posts List 1
            </button>
            <button onClick={() => setCurrentPage(<PostsList2 />)}>
                Posts List 2
            </button>
            <br />
            <br />
            <button onClick={() => setCurrentPage(<Post />)}>
                Get Post
            </button>
            <button onClick={() => setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)}>
                Create Post
            </button>
            <br />
            <br />
            {currentPage}
        </div>
    )
}
