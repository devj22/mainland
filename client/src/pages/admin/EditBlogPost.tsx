import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useParams } from 'wouter';
import AdminLayout from './components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { insertBlogPostSchema } from '@shared/schema';
import { z } from 'zod';
import { FileText, ArrowLeft } from 'lucide-react';

// Extend the blog post schema with validation
const blogPostFormSchema = insertBlogPostSchema.extend({
  // Add any additional validation rules here
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  content: z.string().min(100, { message: "Content must be at least 100 characters" }),
  author: z.string().min(2, { message: "Author name must be at least 2 characters" }),
  imageUrl: z.string().url({ message: "Please enter a valid URL for the image" }),
  excerpt: z.string().min(10, { message: "Excerpt must be at least 10 characters" }).max(200, { message: "Excerpt must not exceed 200 characters" }),
});

type BlogPostFormValues = z.infer<typeof blogPostFormSchema>;

const EditBlogPost = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  // Fetch blog post data
  const { data: blogPost, isLoading, error } = useQuery({
    queryKey: [`/api/blog/${id}`],
  });

  // Initialize the form
  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: {
      title: "",
      content: "",
      author: "",
      imageUrl: "",
      excerpt: "",
    },
  });

  // Update form when blog post data is loaded
  useEffect(() => {
    if (blogPost) {
      form.reset({
        title: blogPost.title,
        content: blogPost.content,
        author: blogPost.author,
        imageUrl: blogPost.imageUrl,
        excerpt: blogPost.excerpt,
      });
    }
  }, [blogPost, form]);

  // Update blog post mutation
  const mutation = useMutation({
    mutationFn: (data: BlogPostFormValues) => {
      return apiRequest('PUT', `/api/blog/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/blog/${id}`] });
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      toast({
        title: "Blog post updated",
        description: "The blog post has been successfully updated.",
      });
      setLocation('/admin/blog');
    },
    onError: (error) => {
      toast({
        title: "Error updating blog post",
        description: error.message || "There was a problem updating the blog post.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: BlogPostFormValues) => {
    mutation.mutate(data);
  };

  // Generate excerpt from content
  const generateExcerpt = () => {
    const content = form.getValues('content');
    if (content) {
      const excerpt = content.substring(0, 150) + (content.length > 150 ? '...' : '');
      form.setValue('excerpt', excerpt);
    }
  };

  if (error) {
    return (
      <AdminLayout title="Edit Blog Post">
        <div className="flex flex-col items-center justify-center h-96">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Error Loading Blog Post</h2>
          <p className="mb-6">We couldn't find the blog post you're looking for.</p>
          <Button 
            className="bg-[#3498DB]"
            onClick={() => navigate('/admin/blog')}
          >
            Back to Blog Posts
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Blog Post">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/blog')}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog Posts
        </Button>
        
        <h2 className="text-2xl font-bold flex items-center">
          <FileText className="mr-2 h-6 w-6" />
          Edit Blog Post
        </h2>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-32 bg-gray-200 rounded animate-pulse my-6"></div>
          <div className="flex justify-end">
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Post Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter blog post title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter author name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>Featured Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter image URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter blog post content"
                        className="min-h-[300px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between items-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={generateExcerpt}
                >
                  Generate Excerpt
                </Button>
                
                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem className="flex-1 ml-4">
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter a brief excerpt (or click 'Generate Excerpt')"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/blog')}
                  disabled={mutation.isPending}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-[#3498DB]"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Updating..." : "Update Blog Post"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </AdminLayout>
  );
};

export default EditBlogPost;
