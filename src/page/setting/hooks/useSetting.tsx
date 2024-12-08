import { settingFilterParam, settingParam } from "@/param/setting.param";
import { getSettings, updateSetting } from "@/service/api/setting.api"
import { Setting, SettingFilter } from "@/types/setting.type";
import { Paginate } from "@/types/wraper";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const useSetting = () => {
    const [settings, setSettings] = useState<Paginate<Setting>>();
    const [filters, setFilters] = useState<SettingFilter>(settingFilterParam);
    const [input, setInput] = useState<Setting>(settingParam);

    const handleFetchSetting = () => {
        getSettings(filters).then((res) => {
            setSettings(res)
        });
    }

    const handleUpdateSetting = (e?: FormEvent) => {
        e?.preventDefault();
        const id = toast.loading("Updating setting value...");
        updateSetting(input).then(() => {
            toast.update(id, {
                render: "Setting value updated",
                type: "success",
                isLoading: false,
                autoClose: 2000
            });
            handleFetchSetting();
        });
    }

    return {
        settings,
        filters,
        setFilters,
        setInput,
        input,
        handleFetchSetting,
        handleUpdateSetting
    }
}

export default useSetting