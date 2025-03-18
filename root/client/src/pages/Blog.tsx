import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationEllipsis } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, User, Search } from 'lucide-react';
import { format } from 'date-fns';
import { BlogPost } from '@shared/schema';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const postsPerPage = 6;
  
  const { data: blogPosts, isLoading, error } = useQuery({
    queryKey: ['/api/blog'],
  });
  
  // Format date helper function
  const formatDate = (date: string) => {
    return format(new Date(date), 'MMM d, yyyy');
  };
  
  // Filter blog posts based on search term
  const filteredPosts = blogPosts?.filter((post: BlogPost) => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination
  const totalPages = filteredPosts 
    ? Math.ceil(filteredPosts.length / postsPerPage) 
    : 0;
  
  const currentPosts = filteredPosts 
    ? filteredPosts.slice(
        (currentPage - 1) * postsPerPage, 
        currentPage * postsPerPage
      ) 
    : [];
  
  // Pagination controls
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };
  
  // Render blog post skeletons while loading
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <Card key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
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
    <div>
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-[#2C3E50] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4">Real Estate Blog</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Stay updated with the latest trends, market insights, and valuable tips for property buyers and sellers
          </p>
        </div>
      </div>
      
      {/* Blog Content */}
      <section className="py-16 bg-[#ECF0F1]">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-10 max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" className="bg-[#3498DB]">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
          
          {error ? (
            <div className="text-center text-red-500 py-8">
              <p>Failed to load blog posts. Please try again later.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading 
                  ? renderSkeletons()
                  : currentPosts.length > 0 
                    ? currentPosts.map(post => (
                      <Card key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
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
                    : (
                      <div className="col-span-3 text-center py-12">
                        <h3 className="text-2xl font-bold text-[#2C3E50] mb-2">No Blog Posts Found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your search term to find more articles.</p>
                        <Button 
                          onClick={() => setSearchTerm('')}
                          className="bg-[#3498DB] hover:bg-opacity-90 text-white"
                        >
                          View All Articles
                        </Button>
                      </div>
                    )
                }
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="mt-12">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationLink 
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </PaginationLink>
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(3, totalPages) }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink 
                          onClick={() => handlePageChange(index + 1)}
                          isActive={currentPage === index + 1}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    {totalPages > 6 && <PaginationEllipsis />}
                    
                    {totalPages > 3 && 
                      Array.from({ length: Math.min(3, totalPages - 3) }).map((_, index) => {
                        const pageNumber = totalPages - 2 + index;
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink 
                              onClick={() => handlePageChange(pageNumber)}
                              isActive={currentPage === pageNumber}
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })
                    }
                    
                    <PaginationItem>
                      <PaginationLink 
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </PaginationLink>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Blog;
