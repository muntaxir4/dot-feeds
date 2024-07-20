import BlogCard from "./BlogCard";

interface BlogCardDataProps {
  title: string;
  content: string;
  updatedAt: Date;
  authorId: string;
}

export default function BlogCardArray({
  blogs,
}: {
  blogs: BlogCardDataProps[];
}) {
  return (
    <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {blogs.map((blog, index) => (
        <BlogCard
          key={index}
          title={blog.title}
          content={blog.content}
          updatedAt={blog.updatedAt}
          authorId={blog.authorId}
        />
      ))}
    </div>
  );
}
