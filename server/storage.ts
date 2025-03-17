import { 
  User, InsertUser, 
  Property, InsertProperty, 
  BlogPost, InsertBlogPost, 
  Message, InsertMessage 
} from '@shared/schema';

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Property methods
  getProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  getFeaturedProperties(): Promise<Property[]>;
  searchProperties(query: {
    location?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;
  
  // Blog methods
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  // Contact message methods
  getMessages(): Promise<Message[]>;
  getMessage(id: number): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<Message | undefined>;
  deleteMessage(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private blogPosts: Map<number, BlogPost>;
  private messages: Map<number, Message>;
  private userId: number;
  private propertyId: number;
  private blogPostId: number;
  private messageId: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.blogPosts = new Map();
    this.messages = new Map();
    this.userId = 1;
    this.propertyId = 1;
    this.blogPostId = 1;
    this.messageId = 1;
    
    // Initialize with admin user
    this.createUser({
      username: 'admin',
      password: 'admin123',
      isAdmin: true
    });
    
    // Add sample properties
    this.createProperty({
      title: "Luxury Villa with Ocean View",
      description: "Beautiful luxury villa with stunning ocean views. This property features high-end finishes, spacious rooms, and a private pool.",
      price: 850000,
      status: "For Sale",
      type: "Villa",
      location: "Beachside",
      address: "123 Coastal Drive, Beachside",
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
      lat: "40.7128",
      lng: "-74.0060",
      featured: true,
    });
    
    this.createProperty({
      title: "Modern Apartment in Downtown",
      description: "Contemporary apartment in the heart of downtown. Features modern design, great city views, and is close to restaurants and shopping.",
      price: 2500,
      status: "For Rent",
      type: "Apartment",
      location: "Downtown",
      address: "456 Urban Street, Downtown",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
      lat: "40.7138",
      lng: "-74.0070",
      featured: true,
    });
    
    this.createProperty({
      title: "Spacious Family Home with Garden",
      description: "Perfect family home with a large garden. Features open living spaces, updated kitchen, and a great neighborhood for children.",
      price: 420000,
      status: "For Sale",
      type: "House",
      location: "Suburbs",
      address: "789 Maple Avenue, Suburbs",
      bedrooms: 5,
      bathrooms: 3,
      area: 2800,
      imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
      lat: "40.7148",
      lng: "-74.0080",
      featured: true,
    });
    
    // Add sample blog posts
    this.createBlogPost({
      title: "2023 Real Estate Market Trends to Watch",
      content: "The real estate market is constantly evolving, and staying ahead of trends is crucial for both buyers and sellers. In 2023, we're seeing several emerging patterns that could significantly impact your property decisions.\n\nFirst, interest rates continue to fluctuate, affecting mortgage availability and terms. Buyers should closely monitor these rates and be prepared to act quickly when favorable conditions arise.\n\nSecond, the demand for sustainable and energy-efficient homes is growing stronger than ever. Properties with green features are not only attracting environmentally conscious buyers but are also proving to offer better long-term value.\n\nThird, remote work continues to influence housing preferences, with many buyers seeking homes with dedicated office spaces or relocating to areas that previously weren't on their radar.\n\nFinally, technology integration in homes is becoming a significant selling point. Smart home features like automated lighting, security systems, and energy management are increasingly expected rather than considered luxury additions.\n\nUnderstanding these trends can help you navigate the market more effectively, whether you're buying your first home or expanding your investment portfolio.",
      author: "John Smith",
      imageUrl: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
      excerpt: "Discover the emerging trends that will shape the real estate market this year and how they might affect your property investment decisions."
    });
    
    this.createBlogPost({
      title: "Top 5 Home Renovations That Add Value",
      content: "When it comes to home renovations, not all projects deliver equal return on investment. If you're looking to increase your property's value, focusing on these five key renovations can make a significant difference.\n\n1. Kitchen Updates: The kitchen remains the heart of the home and a major selling point. Even minor renovations like replacing cabinet fronts, updating hardware, or installing new appliances can yield substantial returns.\n\n2. Bathroom Improvements: Modern, clean bathrooms are highly desirable. Consider replacing outdated fixtures, adding efficient storage, or upgrading to water-saving features.\n\n3. Energy Efficiency Upgrades: Investments in better insulation, energy-efficient windows, or solar panels not only reduce utility costs but also appeal to environmentally conscious buyers.\n\n4. Outdoor Living Spaces: Creating functional outdoor spaces like decks, patios, or landscaped gardens extends the living area and adds immediate appeal.\n\n5. Fresh Paint and Flooring: Never underestimate the power of fresh paint and updated flooring. These relatively affordable upgrades can transform the look and feel of your entire home.\n\nBefore embarking on any renovation project, consider your local market and consult with a real estate professional to ensure your investments align with buyer expectations in your area.",
      author: "Sarah Johnson",
      imageUrl: "https://images.unsplash.com/photo-1626178793926-22b28830aa30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
      excerpt: "Learn which home improvements can significantly increase your property's market value and provide the best return on investment."
    });
    
    this.createBlogPost({
      title: "First-Time Buyer's Guide to Property Investment",
      content: "Entering the real estate market for the first time can be both exciting and overwhelming. This guide aims to provide essential knowledge for first-time buyers navigating the complex world of property investment.\n\nFirst, establish a clear budget before you begin your search. This means understanding not just the purchase price you can afford, but also accounting for closing costs, taxes, insurance, and potential renovation expenses. Most financial advisors recommend having savings beyond your down payment to cover unexpected costs.\n\nSecond, get pre-approved for a mortgage. This gives you a clear picture of what you can afford and makes you a more attractive buyer in competitive markets. Research different mortgage types to find the best fit for your financial situation.\n\nThird, research neighborhoods thoroughly. Consider not just current conditions but future development plans, school quality (even if you don't have children), and accessibility to services you value.\n\nFourth, assemble a reliable team including a knowledgeable real estate agent, a thorough home inspector, and a responsive mortgage broker. These professionals will guide you through the process and help you avoid costly mistakes.\n\nFinally, don't rush the process. Finding the right property at the right price takes time, and it's better to wait for the right opportunity than to settle and experience buyer's remorse.\n\nRemember that your first property purchase is likely just that—your first. Make decisions based on your current needs and financial situation while keeping an eye on future resale value.",
      author: "Michael Brown",
      imageUrl: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
      excerpt: "Essential tips and advice for first-time property buyers to navigate the complex process and make informed decisions."
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { 
      ...insertUser, 
      id,
      isAdmin: insertUser.isAdmin || null 
    };
    this.users.set(id, user);
    return user;
  }

  // Property methods
  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      (property) => property.featured
    );
  }

  async searchProperties(query: {
    location?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Property[]> {
    let properties = Array.from(this.properties.values());
    
    if (query.location && query.location !== '') {
      properties = properties.filter(p => 
        p.location.toLowerCase().includes(query.location!.toLowerCase())
      );
    }
    
    if (query.type && query.type !== '') {
      properties = properties.filter(p => p.type === query.type);
    }
    
    if (query.minPrice !== undefined) {
      properties = properties.filter(p => p.price >= query.minPrice!);
    }
    
    if (query.maxPrice !== undefined) {
      properties = properties.filter(p => p.price <= query.maxPrice!);
    }
    
    return properties;
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const id = this.propertyId++;
    const now = new Date();
    const newProperty: Property = { 
      ...property, 
      id, 
      createdAt: now,
      featured: property.featured || null
    };
    this.properties.set(id, newProperty);
    return newProperty;
  }

  async updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined> {
    const existingProperty = this.properties.get(id);
    if (!existingProperty) return undefined;
    
    const updatedProperty: Property = { ...existingProperty, ...property };
    this.properties.set(id, updatedProperty);
    return updatedProperty;
  }

  async deleteProperty(id: number): Promise<boolean> {
    return this.properties.delete(id);
  }

  // Blog methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostId++;
    const now = new Date();
    const newPost: BlogPost = { ...post, id, createdAt: now };
    this.blogPosts.set(id, newPost);
    return newPost;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) return undefined;
    
    const updatedPost: BlogPost = { ...existingPost, ...post };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  // Message methods
  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }

  async getMessage(id: number): Promise<Message | undefined> {
    return this.messages.get(id);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const id = this.messageId++;
    const now = new Date();
    const newMessage: Message = { ...message, id, read: false, createdAt: now };
    this.messages.set(id, newMessage);
    return newMessage;
  }

  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const message = this.messages.get(id);
    if (!message) return undefined;
    
    const updatedMessage: Message = { ...message, read: true };
    this.messages.set(id, updatedMessage);
    return updatedMessage;
  }

  async deleteMessage(id: number): Promise<boolean> {
    return this.messages.delete(id);
  }
}

export const storage = new MemStorage();
