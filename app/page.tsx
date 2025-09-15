import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Blog App
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A simple blog application built with Next.js, TypeScript, and Prisma.
        </p>
        <div className="space-y-4">
          <Link
            href="/posts"
            className="block w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            View All Posts
          </Link>
          <p className="text-sm text-gray-500">
            Filter posts by author and manage your blog content
          </p>
        </div>
      </div>
    </div>
  );
}
