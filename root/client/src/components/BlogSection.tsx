import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

const BlogSection = () => {
  const { data: blogPosts, isLoading, error } = useQuery({
    queryKey: ['/api/blog'],
  });

  // Format date helper function
  const formatDate = (date: string) => {
    return format(new Date(date), 'MMM d, yyyy');
  };

  // Function to render blog post skeletons while loading
  const renderSkeletons = () => {
    return Array(3).fill(0).map((_, index) => (
      <Card key={index} className="bg-[#ECF0F1] rounded-lg overflow-hidden shadow-md">
        <Skeleton className="w-full h-48" />
        <CardContent className="p-6">
          <div className="flex items-center mb-3 text-sm text-gray-600">
            <Skeleton className="h-4 w-24 mr-4" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-6 w-3/4 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <Skeleton className="h-4 w-20" />
        </CardContent>
      </Card>
    ));
  };

  return (
    <section id="blog" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">Real Estate News & Tips</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Stay updated with the latest trends, market insights, and valuable tips for property buyers and sellers.
          </p>
        </div>
        
        {error ? (
          <div className="text-center text-red-500">
            <p>Failed to load blog posts. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading 
              ? renderSkeletons()
              : blogPosts?.slice(0, 3).map(post => (
                <Card key={post.id} className="bg-[#ECF0F1] rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3 text-sm text-gray-600">
                      <span className="mr-4 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(post.createdAt)}
                      </span>
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Link href={`/blog/${post.id}`}>
                      <a className="text-[#3498DB] font-medium hover:underline">Read More</a>
                    </Link>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button 
            asChild
            className="bg-[#2C3E50] hover:bg-opacity-90 text-white py-3 px-8 rounded-md"
          >
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
