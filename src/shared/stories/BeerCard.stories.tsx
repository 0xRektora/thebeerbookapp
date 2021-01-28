import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { BeerCard, IBeerCardProps } from '../components/BeerCard';

export default {
    title: 'Example/BeerCard',
    component: BeerCard,
} as Meta;

const Template: Story<IBeerCardProps> = (args) => <BeerCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    disableWoodBackground: true,
    data: {
        id: '',
        name: 'Strength!',
        percentage: 100,
        description: 'The best',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg',
    },
};
