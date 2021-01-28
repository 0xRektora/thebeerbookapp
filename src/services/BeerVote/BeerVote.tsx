import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { LocalStorageAPI } from '../../core/LocalStorageAPI';
import useGetAllBeers from '../../hooks/Beers/useGetAllBeers';
import useReactToVoteSnackbar, {
    TVoteType,
} from '../../hooks/utils/useReactToVoteSnackbar';
import useUUID from '../../hooks/utils/useUUID';
import useMutVote from '../../hooks/Votes/useMutVote';
import { BeerDeck } from '../../shared/components/BeerDeck';
import { IBeerModel } from '../../shared/models/IBeerModel';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';

// The number of cards in a single deck
const CARD_STACK = 10;

function BeerVote() {
    const snacky = useSnackbar();
    const beersQuery = useGetAllBeers();
    const [beersDeck, setBeersDeck] = useState<IBeerModel[]>([]);
    const reactToVoteSnackbar = useReactToVoteSnackbar();
    const handleVoteMutation = useMutVote();
    const { getUUID } = useUUID();

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

        snacky.enqueueSnackbar('Again! Again! Again!', {
            variant: 'success',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
            },
        });
        snacky.closeSnackbar();
    }

    function onVoteOccurs(id: number, voteType: TVoteType) {
        reactToVoteSnackbar(beersDeck[id], voteType);
        callHandleVoteMutation(id, voteType);
    }

    function callHandleVoteMutation(id: number, voteType: TVoteType) {
        const beer = beersDeck[id];
        const uuid = getUUID(new LocalStorageAPI(), uuidv4);
        handleVoteMutation.mutate({
            bodyParams: { beerId: beer.id, uuid: uuid },
            voteType,
        });
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
