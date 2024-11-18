import TableCake from "./components/CakeTable";
import useCakes from "./hooks/useCakes";

const Cakes = () => {
  const { cakes } = useCakes();

  return (
    <div className="p-4">
      <TableCake
        data={cakes}
        columns={5}
        onDelete={() => {}}
        onChangePage={() => {}}
        loading={false}
        onSearch={() => {}}
        onFilter={() => {}}
        onClearFilter={() => {}}
        filter={[
          {
            name: "status",
            options: [
              { id: 2, name: "scheduled" },
              { id: 3, name: "junk" },
              { id: 1, name: "consideration" },
            ],
            onSelect: () => {},
          },
        ]}
      />
    </div>
  );
};

export default Cakes;
