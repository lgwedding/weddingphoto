import AdminLayout from "@/app/_components/admin/AdminLayout";
import BlogList from "@/app/_components/admin/blogs/BlogList";
import { Container } from "@mui/material";

export default function BlogsPage() {
  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
        <BlogList />
      </Container>
    </AdminLayout>
  );
}
