import Table from "@/components/request/table";

const Request = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-2xl">Requests</h3>
      </div>
      <Table />
    </div>
  );
};

export default Request;
