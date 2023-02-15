import { ComponentStory } from "@storybook/react";
import Tabs from "components/tabs";

export default {
    title: "Components/Tabs",
    component: Tabs,
};

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {
    active: "tab-1",
    items: [
        { key: "tab-1", title: "Tab 1" },
        { key: "tab-2", title: "Tab 2" },
        { key: "tab-3", title: "Tab 3" },
    ],
    onChangeActive: () => {},
};
