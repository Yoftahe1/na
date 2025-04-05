import Table from "@/components/lesson/table";
import Create from "@/components/lesson/create";

const Lesson = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-2xl">Lesson</h3>
        <Create />
      </div>
      <Table />
    </div>
  );
};

export default Lesson;
