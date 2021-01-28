// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react';
import React from 'react';
import BeerLeaderboard, {
    IBeerLeaderboardProps,
} from '../../services/BeerLeaderboad/BeerLeaderboard';

export default {
    title: 'Example/BeerLeaderboard',
    component: BeerLeaderboard,
} as Meta;

const Template: Story<IBeerLeaderboardProps> = (args) => (
    <BeerLeaderboard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    columns: [
        { field: 'name', title: 'name' },
        { field: 'percentage', title: 'percentage' },
        { field: 'votes', title: 'votes' },
    ],
    data: [{ name: 'test', description: 'test', percentage: '5', votes: 1 }],
    title: 'Example',
};
