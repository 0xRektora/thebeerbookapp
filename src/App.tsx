import React from 'react';
import { BeerCard } from './shared/components/BeerCard';
import { BeerDeck } from './shared/components/BeerDeck';

function App() {
    return (
        <div className="App">
            {/* <BeerDeck /> */}
            <BeerCard
                index={1}
                rot={36}
                scale={36}
                img="https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg"
            />
        </div>
    );
}

export default App;
