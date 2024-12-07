import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import blog from "../../data/BlogContent";

const Blog = () => {
  return (
    <main>
      <div className="w-full mt-[99px] h-auto flex flex-col items-center gap-[33px]">
        <div className="max-w-sm md:max-w-xl text-center lg:text-center">
          <Typography variant="title">
            <strong className="text-emerald-700">Blog</strong>
          </Typography>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <Typography variant="h2" className="text-center mb-6">
          Unlock the Secrets of Ddsgnr with Our Expert Analysis
        </Typography>
        <Typography variant="p" className="text-center text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>

        {/* Hero Card */}
        <div className="mt-8 flex justify-center">
          <Card className="w-full hover:shadow-lg transition-shadow">
            <Link to={`/blog/${blog[0].id}`} className="block h-full">
              <div className="flex flex-wrap lg:flex-nowrap">
                <img
                  src={blog[0].image}
                  alt={blog[0].title}
                  className="w-full lg:w-2/3 h-64 lg:h-auto object-cover rounded-lg lg:rounded-l-lg lg:rounded-r-none"
                />
                <div className="p-6 flex flex-col justify-center w-full lg:w-1/3">
                  <Typography variant="h3" className="text-gray-800">
                    {blog[0].title}
                  </Typography>
                  <p className="text-gray-600 text-sm mt-2">{blog[0].description}</p>
                  <div className="flex items-center mt-4">
                    <img
                      src="https://via.placeholder.com/50"
                      alt={blog[0].author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">{blog[0].author}</p>
                      <p className="text-sm text-gray-500">
                        {blog[0].date} · {blog[0].readTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Featured blog posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blog.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <Link to={`/blog/${post.id}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardContent className="p-4">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">{post.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-500 mt-2">
                      {post.date} · {post.readTime}
                    </CardDescription>
                  </CardHeader>
                  <p className="text-gray-600 text-sm mt-2">{post.description}</p>
                  <span className="text-emerald-700 font-medium text-sm mt-4 block">
                    Read more &rarr;
                  </span>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Blog;
