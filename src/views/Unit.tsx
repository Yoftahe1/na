import Table from "@/components/unit/table";
import Create from "@/components/unit/create";

const Unit = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-2xl">Unit</h3>
        <Create />
      </div>
      <Table />
    </div>
  );
};

export default Unit;
