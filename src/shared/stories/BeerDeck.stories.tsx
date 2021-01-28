// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BeerDeck, IBeerDeckProps } from '../components/BeerDeck';

export default {
    title: 'Example/BeerDeck',
    component: BeerDeck,
} as Meta;

const Template: Story<IBeerDeckProps> = (args) => <BeerDeck {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    disableWoodBackground: true,
    cards: [
        {
            id: '1',
            name: 'Strength!',
            percentage: 100,
            description: 'The best',
            imageUrl:
                'https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg',
        },
        {
            id: '2',
            name: '<Will power>!',
            percentage: 100,
            description: 'The best',
            imageUrl:
                'https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg',
        },
        {
            id: '2',
            name: '¡ZA, WARUDO!',
            description: 'The best',
            percentage: 100,
            imageUrl:
                'https://upload.wikimedia.org/wikipedia/en/f/ff/RWS_Tarot_21_World.jpg',
        },
    ],
};
