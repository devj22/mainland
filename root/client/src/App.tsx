import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import UserDetails from "@/pages/UserDetails";
import Dashboard from "@/pages/admin/Dashboard";
import PropertyManager from "@/pages/admin/PropertyManager";
import BlogManager from "@/pages/admin/BlogManager";
import AddProperty from "@/pages/admin/AddProperty";
import EditProperty from "@/pages/admin/EditProperty";
import AddBlogPost from "@/pages/admin/AddBlogPost";
import EditBlogPost from "@/pages/admin/EditBlogPost";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/properties" component={Properties} />
      <Route path="/properties/:id" component={PropertyDetail} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/contact" component={Contact} />
      <Route path="/user-details" component={UserDetails} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={Dashboard} />
      <Route path="/admin/properties" component={PropertyManager} />
      <Route path="/admin/properties/add" component={AddProperty} />
      <Route path="/admin/properties/edit/:id" component={EditProperty} />
      <Route path="/admin/blog" component={BlogManager} />
      <Route path="/admin/blog/add" component={AddBlogPost} />
      <Route path="/admin/blog/edit/:id" component={EditBlogPost} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
