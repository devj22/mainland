import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'wouter';
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

const AddBlogPost = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

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

  // Create blog post mutation
  const mutation = useMutation({
    mutationFn: (data: BlogPostFormValues) => {
      return apiRequest('POST', '/api/blog', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      toast({
        title: "Blog post created",
        description: "The blog post has been successfully created.",
      });
      setLocation('/admin/blog');
    },
    onError: (error) => {
      toast({
        title: "Error creating blog post",
        description: error.message || "There was a problem creating the blog post.",
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

  return (
    <AdminLayout title="Add New Blog Post">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => setLocation('/admin/blog')}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog Posts
        </Button>
        
        <h2 className="text-2xl font-bold flex items-center">
          <FileText className="mr-2 h-6 w-6" />
          Add New Blog Post
        </h2>
      </div>

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
                onClick={() => setLocation('/admin/blog')}
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-[#3498DB]"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Creating..." : "Create Blog Post"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default AddBlogPost;
