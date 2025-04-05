import Table from "@/components/question/table";
import Create from "@/components/question/create";

const Question = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-2xl">Questions</h3>
        <Create />
      </div>
      <Table />
    </div>
  );
};

export default Question;
