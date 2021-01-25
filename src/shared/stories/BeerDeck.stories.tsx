import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { BeerDeck } from '../components/BeerDeck';

export default {
    title: 'Example/BeerDeck',
    component: BeerDeck,
} as Meta;

const Template: Story<{}> = (args) => <BeerDeck {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
