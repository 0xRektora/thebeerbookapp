import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import useGetAllBeers from '../../hooks/Beers/useGetAllBeers';
import useReactToVoteSnackbar, {
    TVoteType,
} from '../../hooks/utils/useReactToVoteSnackbar';
import { BeerDeck } from '../../shared/components/BeerDeck';
import { IBeerModel } from '../../shared/models/IBeerModel';

// The number of cards in a single deck
const CARD_STACK = 10;

function BeerVote() {
    const beersQuery = useGetAllBeers();
    const [beersDeck, setBeersDeck] = useState<IBeerModel[]>([]);
    const reactToVoteSnackbar = useReactToVoteSnackbar();

    useEffect(() => {
        hydrateBeerDeck();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [beersQuery.data?.data]);

    function hydrateBeerDeck() {
        setBeersDeck(getBeerDeckShuffledData());
    }

    function getBeerDeckShuffledData(): IBeerModel[] {
        return _.shuffle(beersQuery.data?.data).slice(0, CARD_STACK);
    }

    function onDeckIsEmpty() {
        hydrateBeerDeck();
    }

    function onVoteOccurs(id: number, voteType: TVoteType) {
        reactToVoteSnackbar(beersDeck[id], voteType);
    }

    return (
        <>
            <BeerDeck
                cards={beersDeck}
                onDeckIsEmpty={onDeckIsEmpty}
                onVoteOccurs={onVoteOccurs}
            />
        </>
    );
}

export default React.memo(BeerVote);
