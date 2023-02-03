import { Select } from "antd";
import ButtonBack from "components/button/back";
import Header from "components/layout/header";
import { FaSearch } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReducerType } from "states";
import { SEARCH } from "utils/constant";
import { PROFILE, USER } from "utils/routes";

const TO_USER_FLAG = "TO_USER_PROFILE";

function ExploreHeader() {
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const state = useSelector<ReducerType, ReducerType>((state) => state);

    const query = params.get(SEARCH);

    const backHandler = () => {
        navigate("/");
    };

    const onSelectInput = (value?: any) => {
        if (!value) {
            setParams({});
            return;
        }
        if (value.includes(TO_USER_FLAG)) {
            const userId = value.split(TO_USER_FLAG)[1];
            if (userId === state?.user?.id) {
                navigate(PROFILE);
                return;
            }
            navigate(USER + "/" + userId);
            return;
        }
        setParams({ [SEARCH]: value });
    };

    const tags = [...new Set(state?.threads?.threads?.map((thread) => "#" + thread.category) || [])];
    const usersIds = state?.threads?.threads?.map((thread) => thread.ownerId);
    const users = state?.user?.users?.filter((usr) => usersIds.includes(usr.id));

    return (
        <Header>
            <div className="w-full flex items-center gap-9">
                <ButtonBack title="Back" onClick={backHandler} />
                <div className="flex flex-col w-full">
                    <Select
                        value={query || undefined}
                        mode="tags"
                        maxTagCount={1}
                        maxLength={1}
                        size="large"
                        showSearch
                        className="!w-[90%] search-explore"
                        placeholder="Search"
                        suffixIcon={null}
                        optionFilterProp="label"
                        allowClear
                        optionLabelProp="value"
                        clearIcon={<IoCloseCircle className="text-primary text-3xl absolute -top-2 -left-3" />}
                        onSelect={onSelectInput}
                        tagRender={({ value }) => <p className="m-0 ml-4 font-normal">{value}</p>}
                        onClear={onSelectInput}
                    >
                        {tags?.map((tag) => (
                            <Select.Option key={tag} {...{ label: tag }} value={tag}>
                                <div className="w-full p-2 flex items-center">
                                    <FaSearch className="text-xl" />
                                    <p className="m-0 ml-4 text-xl">{tag}</p>
                                </div>
                            </Select.Option>
                        ))}
                        {users?.map((usr) => (
                            <Select.Option key={usr.id} value={TO_USER_FLAG + usr.id}>
                                <div className="w-full flex items-start gap-4 py-2">
                                    <img src={usr?.avatar} className="w-9 h-9 rounded-full object-cover" alt="" />
                                    <p className="font-semibold m-0">{usr?.name}</p>
                                </div>
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            </div>
        </Header>
    );
}

export default ExploreHeader;
