import Table from "@/components/course/table";
import Create from "@/components/course/create";

const Course = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-2xl">Course</h3>
        <Create />
      </div>
      <Table />
    </div>
  );
};

export default Course;
