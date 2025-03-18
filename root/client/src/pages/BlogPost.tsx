import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { format } from 'date-fns';

const BlogPost = () => {
  const { id } = useParams();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: [`/api/blog/${id}`],
  });
  
  // Format date helper function
  const formatDate = (date: string) => {
    return format(new Date(date), 'MMMM d, yyyy');
  };

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Error Loading Article</h2>
          <p className="mb-6">We couldn't find the blog post you're looking for.</p>
          <Button asChild className="bg-[#3498DB]">
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <>
            <Skeleton className="h-10 w-3/4 mb-2" />
            <div className="flex items-center mb-6">
              <Skeleton className="h-4 w-32 mr-4" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-[300px] w-full mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </>
        ) : (
          <>
            <Button 
              variant="outline"
              className="mb-6 flex items-center gap-2"
              asChild
            >
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">{post.title}</h1>
            
            <div className="flex items-center mb-6 text-gray-600">
              <span className="flex items-center mr-6">
                <Calendar className="h-4 w-4 mr-2 text-[#E74C3C]" />
                {formatDate(post.createdAt)}
              </span>
              <span className="flex items-center">
                <User className="h-4 w-4 mr-2 text-[#E74C3C]" />
                {post.author}
              </span>
            </div>
            
            <div className="mb-8 rounded-lg overflow-hidden shadow-md">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-[400px] object-cover"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <Card>
                  <CardContent className="p-8">
                    <div className="prose max-w-none">
                      {post.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#2C3E50]">Share this article:</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon" className="rounded-full">
                            <Facebook className="h-4 w-4 text-[#3b5998]" />
                          </Button>
                          <Button variant="outline" size="icon" className="rounded-full">
                            <Twitter className="h-4 w-4 text-[#1da1f2]" />
                          </Button>
                          <Button variant="outline" size="icon" className="rounded-full">
                            <Linkedin className="h-4 w-4 text-[#0077b5]" />
                          </Button>
                          <Button variant="outline" size="icon" className="rounded-full">
                            <Share2 className="h-4 w-4 text-[#2C3E50]" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-4">About the Author</h3>
                    <div className="flex items-center mb-4">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80" 
                        alt={post.author} 
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <p className="font-bold">{post.author}</p>
                        <p className="text-sm text-gray-600">Real Estate Expert</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-4">
                      Real estate professional with over 10 years of experience in the market. 
                      Specializes in residential properties and investment opportunities.
                    </p>
                    
                    <h3 className="text-lg font-bold text-[#2C3E50] mb-3 mt-6">Related Articles</h3>
                    <ul className="space-y-3">
                      <li>
                        <Link href="/blog/1">
                          <a className="text-[#3498DB] hover:underline text-sm">2023 Real Estate Market Trends to Watch</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog/2">
                          <a className="text-[#3498DB] hover:underline text-sm">Top 5 Home Renovations That Add Value</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog/3">
                          <a className="text-[#3498DB] hover:underline text-sm">First-Time Buyer's Guide to Property Investment</a>
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
