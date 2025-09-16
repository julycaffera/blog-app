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
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
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
    retryFetchPosts,
    retryDeletePost,
  } = usePosts();

  const {
    users,
    loading: usersLoading,
    error: usersError,
    setError: setUsersError,
  } = useUsers();

  const handleDeleteClick = (post: Post) => {
    setPostToDelete(post);
    setDeleteError(null);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;

    setIsDeleting(true);
    setDeleteError(null);
    
    const result = await deletePost(postToDelete.id);
    if (result.success) {
      setDeleteModalOpen(false);
      setPostToDelete(null);
      setDeleteError(null);
    } else {
      setDeleteError(result.error || "Failed to delete post. Please try again.");
    }
    setIsDeleting(false);
  };

  const handleRetryDelete = async () => {
    if (!postToDelete) return;

    setIsDeleting(true);
    setDeleteError(null);
    
    const result = await retryDeletePost(postToDelete.id);
    if (result.success) {
      setDeleteModalOpen(false);
      setPostToDelete(null);
      setDeleteError(null);
    } else {
      setDeleteError(result.error || "Failed to delete post. Please try again.");
    }
    setIsDeleting(false);
  };

  const loading = postsLoading || usersLoading;
  const error = postsError || usersError; // Only show fetch errors on main page, delete errors stay in modal

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

          {error && <ErrorMessage 
            message={error} 
            onClose={() => {
              if (postsError) setPostsError("");
              if (usersError) setUsersError("");
            }}
            onRetry={postsError ? retryFetchPosts : undefined}
            showRetry={!!postsError}
          />}
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
            setDeleteError(null);
          }}
          onConfirm={handleDeleteConfirm}
          onRetry={handleRetryDelete}
          postTitle={postToDelete?.title || ""}
          error={deleteError || undefined}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
}