import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import BeerLeaderboardContainer from './services/BeerLeaderboad/BeerLeaderboardContainer';
import BeerVote from './services/BeerVote/BeerVote';
import Navigation, { TAppView } from './services/Navigation/Navigation';

function App() {
    const snacky = useSnackbar();
    const [appViewState, setAppViewState] = useState<TAppView>('CardGame');
    function onChangeView(appView: TAppView) {
        snacky.closeSnackbar();
        setAppViewState(appView);
    }

    function renderContent() {
        return appViewState === 'Leaderboard' ? (
            <BeerLeaderboardContainer />
        ) : (
            <BeerVote />
        );
    }

    return (
        <div className="App">
            <Navigation onChangeView={onChangeView} />
            {renderContent()}
        </div>
    );
}

export default App;
