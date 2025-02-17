import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Blog {
  id?: string;
  title: string;
  imageUrl: string;
  content: string;
  slug: string;
  status: "draft" | "published";
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

class BlogService {
  private collection = "blogs";

  async createBlog(blog: Omit<Blog, "id" | "createdAt" | "updatedAt">) {
    const now = Timestamp.now();
    const newBlog = {
      ...blog,
      createdAt: now,
      updatedAt: now,
    };
    const docRef = await addDoc(collection(db, this.collection), newBlog);
    return { id: docRef.id, ...newBlog };
  }

  async updateBlog(id: string, blog: Partial<Blog>) {
    const docRef = doc(db, this.collection, id);
    const updates = {
      ...blog,
      updatedAt: Timestamp.now(),
    };
    await updateDoc(docRef, updates);
    return { id, ...updates };
  }

  async deleteBlog(id: string) {
    const docRef = doc(db, this.collection, id);
    await deleteDoc(docRef);
  }

  async getBlog(id: string) {
    const docRef = doc(db, this.collection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt as Timestamp,
        updatedAt: data.updatedAt as Timestamp,
      } as Blog;
    }
    return null;
  }

  async getBlogBySlug(slug: string) {
    const q = query(
      collection(db, this.collection),
      where("slug", "==", slug),
      where("status", "==", "published")
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt as Timestamp,
        updatedAt: data.updatedAt as Timestamp,
      } as Blog;
    }
    return null;
  }

  async getBlogs() {
    const q = query(
      collection(db, this.collection),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt as Timestamp,
        updatedAt: data.updatedAt as Timestamp,
      } as Blog;
    });
  }

  generateSlug(title: string) {
    return title
      .normalize("NFKD") // Normalize Unicode characters
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^\p{L}\p{N}-]/gu, "") // Keep only letters, numbers and hyphens using Unicode properties
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ""); // Remove leading and trailing hyphens
  }
}

export const blogService = new BlogService();
