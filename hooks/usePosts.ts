"use client";

import { useState, useEffect } from "react";
import { Post } from "@/types";
import { PAGINATION, API_ENDPOINTS } from "@/constants";

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPosts = async (userId?: number, page: number = 1) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (userId) params.append("userId", userId.toString());
      params.append("page", page.toString());
      params.append("limit", PAGINATION.DEFAULT_PAGE_SIZE.toString());
      
      const url = `${API_ENDPOINTS.POSTS}?${params.toString()}`;
      const res = await fetch(url);
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP ${res.status}: Failed to fetch posts`);
      }
      
      const data = await res.json();
      setPosts(data.posts);
      setPagination(data.pagination);
      setCurrentPage(page);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error fetching posts. Please try again.";
      setError(errorMessage);
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserFilter = (userId: number | null) => {
    setSelectedUserId(userId);
    setCurrentPage(1);
    fetchPosts(userId || undefined, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchPosts(selectedUserId || undefined, page);
  };

  const deletePost = async (id: number) => {
    try {
      const res = await fetch(API_ENDPOINTS.POSTS, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete post");

      setPosts(posts.filter((p) => p.id !== id));
      return { success: true };
    } catch (err) {
      setError("Error deleting post. Please try again.");
      console.error("Error deleting post:", err);
      return { success: false };
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    selectedUserId,
    pagination,
    currentPage,
    handleUserFilter,
    handlePageChange,
    deletePost,
    setError,
  };
}
