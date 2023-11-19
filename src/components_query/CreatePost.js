import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { createPost } from "../api/posts";
import Post from "./Post";

export default function CreatePost({ setCurrentPage }) {
    const titleRef = useRef(); // useRef hook is a reference to input elements. 
                               // difference from useState as it does not trigger re-render when changed
    const bodyRef = useRef();
    const userIdRef = useRef();
    const queryClient = useQueryClient();

    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: data => {
            // if we stayed in this page and needed to access data, the following 2 commands could be relevant.
            //   queryClient.setQueryData(["posts", data.id], data); // It updates the cache with the new post data
            //   queryClient.invalidateQueries(["posts"], { exact: true }); // the '{ exact: true }' says that only 
            //   the exact ["posts"] url and not its extensions
            setCurrentPage(<Post id_prop={data.id} />); // the better way to do it is with Link
        },
    });

    function handleSubmit(e) {
        e.preventDefault(); // the default action is to send the form data to the server and reload the page. we don't want it
        const userIdInt = parseInt(userIdRef.current.value, 10) // The 'userIdRef.current.value' expression gets the current value of 
        // the User ID input field. This value is then passed to the parseInt 
        // function to ensure that it is converted to an integer (if possible). 
        // The 10 argument specifies that the conversion should be done assuming a 
        // base-10 number system.
        createPostMutation.mutate({
            title: titleRef.current.value,
            body: bodyRef.current.value,
            userId: userIdInt,  // include userId in the mutation data
        });
    }

    return (
        <div>
            {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" ref={titleRef} />
                </div>
                <div>
                    <label htmlFor="body">Body</label>
                    <input id="body" ref={bodyRef} />
                </div>
                <div>
                    <label htmlFor="userId">User ID</label>  {/* New User ID input field */}
                    <input id="userId" ref={userIdRef} />
                </div>
                <button disabled={createPostMutation.isLoading}>
                    {createPostMutation.isLoading ? "Loading..." : "Create"}
                </button>
            </form>
        </div>
    );
}

