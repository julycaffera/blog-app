import { Post } from "@/types";
import { TrashIcon } from '@heroicons/react/24/outline';

interface PostCardProps {
  post: Post;
  onDeleteClick: (post: Post) => void;
}

export default function PostCard({ post, onDeleteClick }: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.body}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            By <span className="font-medium">{post.user.name}</span>
          </p>
          <button
            onClick={() => onDeleteClick(post)}
            className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors duration-200 cursor-pointer"
          >
            <TrashIcon className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
