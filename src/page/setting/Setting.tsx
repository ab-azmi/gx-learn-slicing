import { useEffect, useState } from "react";
import useSetting from "./hooks/useSetting";
import SettingTable from "./components/SettingTable";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import handleInput from "@/helpers/input.helper";
import Button from "@/components/Button";
import { settingFilterParam } from "@/param/setting.param";

const Setting = () => {
  const { 
      settings, 
      handleFetchSetting, 
      filters, setFilters, 
      input, setInput,
      handleUpdateSetting
    } = useSetting();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    handleFetchSetting();
  }, [])

  return (
    <div>
      <SettingTable
        data={settings}
        columns={3}
        loading={false}
        filters={filters}
        setFilters={setFilters}
        onFilter={() => handleFetchSetting()}
        onChangePage={() => { }}
        onClearFilter={() => {
          setFilters((prev) => {
            handleFetchSetting();
            return { ...prev, ...settingFilterParam }
          });
        }}
        onSelected={(item) => {
          setShowModal(true);
          setInput(item)
        }}
      />

      <Modal
        title="Update Setting Data"
        show={showModal}
        onClose={() => setShowModal(false)}>
        <form>
          <div className="hstack mb-2">
            <b>Key :</b>
            <span>{input.key}</span>
          </div>
          <Input
            placeholder="100"
            label="Value"
            type="text"
            name="value"
            value={input.value}
            onChange={(e) => handleInput(e, setInput, input)} />
          <Input
            placeholder="hello"
            label="Description"
            type="text"
            name="description"
            value={input.description}
            onChange={(e) => handleInput(e, setInput, input)} />
          <Button className="mt-2 w-100" type="button" onClick={() => {
            handleUpdateSetting();
            setShowModal(false);
          }}>Save</Button>
        </form>
      </Modal>
    </div>
  )
}

export default Setting