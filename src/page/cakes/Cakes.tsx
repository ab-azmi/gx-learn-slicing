import TableCake from "./components/TableCake";
import useCakes from "./hooks/useCakes";

const Cakes = () => {
  const { 
    cakes, 
    filters, 
    setFilters, 
    loading, 
    fetchCakes,
    handleDelete, 
    clearFilter } = useCakes();

  return (
    <div className="p-4">
      <TableCake
        data={cakes}
        columns={5}
        onDelete={(id) => handleDelete(id)}
        onChangePage={(page) => fetchCakes(page)}
        loading={loading}
        filters={filters}
        setFilters={setFilters}
        onFilter={() => fetchCakes()}
        onClearFilter={() => clearFilter()}
      />
    </div>
  );
};

export default Cakes;
