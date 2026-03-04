import Header from "@/components/ui/Header";

export default function CourseHeaderSection({ breadcrumbs }) {
  return (
    <div className="h-[5vh] min-h-14 shrink-0">
      <Header
        menu={false}
        breadcrumbs={breadcrumbs}
      />
    </div>
  );
}
