import React from 'react';
import NavBar from '../../shared/components/NavBar';

export type TAppView = 'Leaderboard' | 'CardGame';

interface INavigationProps {
    onChangeView?: (appView: TAppView) => void;
}

function Navigation(props: INavigationProps) {
    function onChangeView(appView: TAppView) {
        props.onChangeView && props.onChangeView(appView);
    }

    return (
        <NavBar
            onClickTableChartIcon={() => onChangeView('Leaderboard')}
            onClickThumbsIcon={() => onChangeView('CardGame')}
        />
    );
}

export default Navigation;
