import Header from "@/components/ui/Header";

export default function CourseHeaderSection({ breadcrumbs }) {
  return (
    <Header
      menu={false}
      breadcrumbs={breadcrumbs}
    />
  );
}
