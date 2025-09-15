"use client";

import { useState } from "react";
import { Post } from "@/types";
import { usePosts } from "@/hooks/usePosts";
import { useUsers } from "@/hooks/useUsers";
import UserFilter from "@/components/UserFilter";
import PostsList from "@/components/PostsList";
import DeleteModal from "@/components/DeleteModal";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import Pagination from "@/components/Pagination";

export default function PostsPage() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  
  const {
    posts,
    loading: postsLoading,
    error: postsError,
    selectedUserId,
    pagination,
    currentPage,
    handleUserFilter,
    handlePageChange,
    deletePost,
    setError: setPostsError,
  } = usePosts();

  const {
    users,
    loading: usersLoading,
    error: usersError,
    setError: setUsersError,
  } = useUsers();

  const handleDeleteClick = (post: Post) => {
    setPostToDelete(post);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;

    const result = await deletePost(postToDelete.id);
    if (result.success) {
      setDeleteModalOpen(false);
      setPostToDelete(null);
    }
  };

  const loading = postsLoading || usersLoading;
  const error = postsError || usersError;

  if (loading && posts.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Posts</h1>
          
          <UserFilter
            users={users}
            selectedUserId={selectedUserId}
            onUserChange={handleUserFilter}
          />

          {error && <ErrorMessage message={error} onClose={() => {
            if (postsError) setPostsError("");
            if (usersError) setUsersError("");
          }} />}
        </div>

        {postsLoading && posts.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <PostsList
            posts={posts}
            onDeleteClick={handleDeleteClick}
            isLoading={postsLoading}
          />
        )}

        {!postsLoading && pagination.totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setPostToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
          postTitle={postToDelete?.title || ""}
        />
      </div>
    </div>
  );
}