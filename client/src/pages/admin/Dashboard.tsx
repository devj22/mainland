import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import AdminLayout from './components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, FileText, Mail, Eye, Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Property, BlogPost, Message } from '@shared/schema';
import { format } from 'date-fns';

// Dashboard Stats Card Component
interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  iconBg: string;
}

const StatCard = ({ title, value, change, icon, iconBg }: StatCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className={`${iconBg} p-3 rounded-full`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-[#2C3E50]">{value}</p>
      <p className="text-sm text-gray-600">{change}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  // Fetch properties
  const { data: properties, isLoading: loadingProperties } = useQuery({
    queryKey: ['/api/properties'],
  });

  // Fetch blog posts
  const { data: blogPosts, isLoading: loadingPosts } = useQuery({
    queryKey: ['/api/blog'],
  });

  // Fetch messages
  const { data: messages, isLoading: loadingMessages } = useQuery({
    queryKey: ['/api/messages'],
  });

  // Format date helper function
  const formatDate = (date: string) => {
    return format(new Date(date), 'MMM d, yyyy');
  };

  const isLoading = loadingProperties || loadingPosts || loadingMessages;

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isLoading ? (
          <>
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </>
        ) : (
          <>
            <StatCard
              title="Total Properties"
              value={properties?.length || 0}
              change="+3 this month"
              icon={<Building2 className="h-5 w-5 text-[#E74C3C]" />}
              iconBg="bg-[#ECF0F1]"
            />

            <StatCard
              title="Active Listings"
              value={(properties?.filter((p: Property) => p.featured) || []).length}
              change="+2 this week"
              icon={<Eye className="h-5 w-5 text-[#3498DB]" />}
              iconBg="bg-[#ECF0F1]"
            />

            <StatCard
              title="Blog Posts"
              value={blogPosts?.length || 0}
              change="+1 this week"
              icon={<FileText className="h-5 w-5 text-[#E74C3C]" />}
              iconBg="bg-[#ECF0F1]"
            />

            <StatCard
              title="New Inquiries"
              value={(messages?.filter((m: Message) => !m.read) || []).length}
              change="+5 since yesterday"
              icon={<Mail className="h-5 w-5 text-[#E74C3C]" />}
              iconBg="bg-[#ECF0F1]"
            />
          </>
        )}
      </div>

      {/* Recent Properties */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Recent Properties</h3>
            <Button asChild variant="outline">
              <Link href="/admin/properties">View All</Link>
            </Button>
          </div>

          {loadingProperties ? (
            <div className="space-y-4">
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties?.slice(0, 5).map((property: Property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">{property.title}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {property.status}
                        </span>
                      </TableCell>
                      <TableCell>${property.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="link"
                            className="h-auto p-0 text-[#3498DB]"
                            asChild
                          >
                            <Link href={`/admin/properties/edit/${property.id}`}>
                              Edit
                            </Link>
                          </Button>
                          <Button
                            variant="link"
                            className="h-auto p-0 text-[#E74C3C]"
                            asChild
                          >
                            <Link href={`/properties/${property.id}`}>
                              View
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Blog Posts and Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Blog Posts */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Recent Blog Posts</h3>
              <Button asChild variant="outline">
                <Link href="/admin/blog">View All</Link>
              </Button>
            </div>

            {loadingPosts ? (
              <div className="space-y-4">
                <Skeleton className="w-full h-20" />
                <Skeleton className="w-full h-20" />
                <Skeleton className="w-full h-20" />
              </div>
            ) : (
              <div className="space-y-4">
                {blogPosts?.slice(0, 3).map((post: BlogPost) => (
                  <div key={post.id} className="flex gap-4 items-center">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium line-clamp-1">{post.title}</h4>
                      <p className="text-sm text-gray-500">
                        {formatDate(post.createdAt)} by {post.author}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2"
                      asChild
                    >
                      <Link href={`/admin/blog/edit/${post.id}`}>Edit</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Recent Messages</h3>
              <Button asChild variant="outline">
                <Link href="/admin/messages">View All</Link>
              </Button>
            </div>

            {loadingMessages ? (
              <div className="space-y-4">
                <Skeleton className="w-full h-20" />
                <Skeleton className="w-full h-20" />
                <Skeleton className="w-full h-20" />
              </div>
            ) : (
              <div className="space-y-4">
                {messages?.slice(0, 3).map((message: Message) => (
                  <div key={message.id} className="p-4 border rounded-md">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{message.name}</h4>
                      <span className="text-sm text-gray-500">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                      {message.message}
                    </p>
                    <div className="flex justify-between items-center">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          message.read
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {message.read ? 'Read' : 'New'}
                      </span>
                      <div className="text-sm text-gray-500">
                        Subject: {message.subject}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
