// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react';
import React from 'react';
import NavBar, { INavBarProps } from '../components/NavBar';

export default {
    title: 'Example/NavBar',
    component: NavBar,
    argTypes: {
        backgroundColor: { control: 'color' },
        btnColor: { control: 'color' },
    },
} as Meta;

const Template: Story<INavBarProps> = (args) => <NavBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
