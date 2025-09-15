import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import LoadingSpinner from "@/components/LoadingSpinner";

interface PostsListProps {
  posts: Post[];
  onDeleteClick: (post: Post) => void;
  isLoading?: boolean;
}

export default function PostsList({ posts, onDeleteClick, isLoading = false }: PostsListProps) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
}
