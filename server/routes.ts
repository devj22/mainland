import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPropertySchema, insertBlogPostSchema, insertMessageSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // All API routes prefixed with /api
  
  // Property routes
  app.get("/api/properties", async (req, res) => {
    const properties = await storage.getProperties();
    res.json(properties);
  });
  
  app.get("/api/properties/featured", async (req, res) => {
    const featuredProperties = await storage.getFeaturedProperties();
    res.json(featuredProperties);
  });
  
  app.get("/api/properties/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }
    
    const property = await storage.getProperty(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    
    res.json(property);
  });
  
  app.get("/api/properties/search", async (req, res) => {
    const { location, type, minPrice, maxPrice } = req.query;
    
    const query = {
      location: location as string | undefined,
      type: type as string | undefined,
      minPrice: minPrice ? parseInt(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice as string) : undefined
    };
    
    const properties = await storage.searchProperties(query);
    res.json(properties);
  });
  
  app.post("/api/properties", async (req, res) => {
    try {
      const propertyData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(propertyData);
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to create property" });
    }
  });
  
  app.put("/api/properties/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }
    
    try {
      const propertyData = insertPropertySchema.partial().parse(req.body);
      const property = await storage.updateProperty(id, propertyData);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(property);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to update property" });
    }
  });
  
  app.delete("/api/properties/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }
    
    const success = await storage.deleteProperty(id);
    if (!success) {
      return res.status(404).json({ message: "Property not found" });
    }
    
    res.status(204).end();
  });
  
  // Blog routes
  app.get("/api/blog", async (req, res) => {
    const posts = await storage.getBlogPosts();
    res.json(posts);
  });
  
  app.get("/api/blog/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid blog post ID" });
    }
    
    const post = await storage.getBlogPost(id);
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    
    res.json(post);
  });
  
  app.post("/api/blog", async (req, res) => {
    try {
      const postData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(postData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });
  
  app.put("/api/blog/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid blog post ID" });
    }
    
    try {
      const postData = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(id, postData);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });
  
  app.delete("/api/blog/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid blog post ID" });
    }
    
    const success = await storage.deleteBlogPost(id);
    if (!success) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    
    res.status(204).end();
  });
  
  // Contact message routes
  app.get("/api/messages", async (req, res) => {
    const messages = await storage.getMessages();
    res.json(messages);
  });
  
  app.get("/api/messages/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid message ID" });
    }
    
    const message = await storage.getMessage(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    
    res.json(message);
  });
  
  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to send message" });
    }
  });
  
  app.put("/api/messages/:id/read", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid message ID" });
    }
    
    const message = await storage.markMessageAsRead(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    
    res.json(message);
  });
  
  app.delete("/api/messages/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid message ID" });
    }
    
    const success = await storage.deleteMessage(id);
    if (!success) {
      return res.status(404).json({ message: "Message not found" });
    }
    
    res.status(204).end();
  });

  const httpServer = createServer(app);
  return httpServer;
}
