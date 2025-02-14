import { useState } from "react";
import {
  useGetPostsQuery,
  useCreatePostsMutation,
} from "./services/jsonPlaceholderApi";

interface Post {
  userId?: number;
  id: number;
  title: string;
  body: string;
}

function App() {
  const [newPost, setNewPost] = useState<Partial<Post>>({
    title: "",
    body: "",
  });

  const { data, error, isLoading, refetch } = useGetPostsQuery();
  const [createPost, { isLoading: isCreating, error: createError }] =
    useCreatePostsMutation();

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (createError)
    return (
      <p className="text-center text-red-500">
        There was an error creating a post 
      </p>
    );
  if (error)
    return <p className="text-center text-red-500">There was an error :(</p>;

  const handleCreatePost = async () => {
    await createPost(newPost);
    refetch();
    setNewPost({ title: "", body: "" }); // Clear input fields after creating a post
  };



  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">

        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Malahima's Blog
        </h1>
        


        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title..."
              value={newPost.title}
              onChange={(e) =>
                setNewPost((prev: Partial<Post>) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Body..."
              value={newPost.body}
              onChange={(e) =>
                setNewPost((prev: Partial<Post>) => ({
                  ...prev,
                  body: e.target.value,
                }))
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCreatePost}
              disabled={isCreating}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            >
              {isCreating ? "Creating..." : "Create Post"}
            </button>
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Posts</h2>
          <div className="space-y-4">
            {data?.map((post: Post) => (
              <div
                key={post.id}
                className="p-4 border border-gray-200 rounded-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-blue-600">
                  {post.title}
                </h3>
                <p className="text-gray-700">{post.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
