"use client";

import AdminLayout from "@/app/_components/admin/AdminLayout";
import BlogEditor from "@/app/_components/admin/blogs/BlogEditor";
import { Container } from "@mui/material";
import { useParams } from "next/navigation";
export default function EditBlogPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
        <BlogEditor blogId={id === "new" ? undefined : id} />
      </Container>
    </AdminLayout>
  );
}
