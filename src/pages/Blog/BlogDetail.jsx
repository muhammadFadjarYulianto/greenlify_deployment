import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@/components/ui/Typography";
import blog from "../../data/BlogContent"; 
import CommentForm from "../../components/layout/CommentForm";

const BlogDetail = () => {
  const { id } = useParams();
  const blogPost = blog.find((b) => b.id === Number(id));
  const [comments, setComments] = useState([]);

  if (!blogPost) {
    return (
      <main>
        <section className="container mx-auto px-4 py-12">
          <Typography variant="h3" className="text-center text-gray-600">
            Blog not found!
          </Typography>
        </section>
      </main>
    );
  }
  const handleAddComment = (comment) => {
    setComments((prevComments) => [...prevComments, comment]);
  };

  return (
    <main>
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center">
          <img
            src={blogPost.image}
            alt={blogPost.title}
            className="w-full max-w-4xl h-64 lg:h-auto object-cover rounded-lg"
          />
          <Typography variant="h2" className="text-center mt-6 font-bold">
            {blogPost.title}
          </Typography>
          <Typography variant="p" className="text-center text-gray-600 mt-2">
            {blogPost.date} · {blogPost.readTime}
          </Typography>
          <div className="mt-6 max-w-4xl">
            {blogPost.content.split("\n").map((paragraph, index) => (
              <Typography
                key={index}
                variant="p"
                className="text-justify text-gray-800 mt-4 leading-relaxed"
              >
                {paragraph}
              </Typography>
            ))}
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-12">
        <div className="mt-8">
          <Typography variant="h3" className="mb-4 text-gray-800 font-semibold">
            Comments ({comments.length})
          </Typography>
          {comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <Typography variant="h4" className="font-bold text-gray-800">
                    {comment.name}
                  </Typography>
                  <Typography variant="p" className="text-sm text-gray-500">
                    {comment.email}
                  </Typography>
                  <Typography
                    variant="p"
                    className="mt-2 text-gray-700 leading-relaxed"
                  >
                    {comment.comment}
                  </Typography>
                </div>
              ))}
            </div>
          ) : (
            <Typography variant="p" className="text-gray-600">
              No comments yet. Be the first to comment!
            </Typography>
          )}
        </div>
        <Typography variant="h3" className="mb-6 text-center font-semibold text-gray-800">
          Leave a Comment
        </Typography>
        <CommentForm onAddComment={handleAddComment} />
      </section>
    </main>
  );
};

export default BlogDetail;
