import _ from 'lodash';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { IBeerModel } from '../../shared/models/IBeerModel';

export type TVoteType = 'left' | 'right';
export type TVoteTypeSubtype = 'down5' | 'up5' | 'up10';

type TVoteComments = {
    [x in TVoteType]: {
        [x in TVoteTypeSubtype]: string[];
    };
};
const VOTE_COMMENTS: TVoteComments = {
    left: {
        down5: [
            "Well, we'll get along.",
            "That's probably for the best.",
            "I'm out of idea.",
        ],
        up5: [
            'Everyone has opinions, and we should respect them.',
            'Give it a try again sometimes!',
            'I see.',
        ],
        up10: [
            'Veni Vidi Vici.',
            "The man's search for meaning just started.",
            '"Judge a man by his questions rather than his answers."',
        ],
    },
    right: {
        down5: [
            'Meh.',
            "It's a joke right?",
            "Surely you're the funny one at parties.",
            "You think you're better than me?",
        ],
        up5: [
            "That's a start.",
            "I've been waiting for this!",
            "Now we're talking.",
        ],
        up10: [
            'Oh boy.',
            'Here comes the choo-choo!',
            'Great choice!',
            'Ah, a connoisseur i see!',
        ],
    },
};

function useVoteSnackComment() {
    const snacky = useSnackbar();
    const [lastComments] = useState<Set<string>>(new Set());

    function reactToVoteSnackbar(beerObject: IBeerModel, voteType: TVoteType) {
        const message = getVoteMessage(beerObject, voteType);
        handleNewComment(message);

        snacky.enqueueSnackbar(message, {
            variant: voteType === 'left' ? 'error' : 'success',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
            },
        });
    }

    function handleNewComment(message: string) {
        lastComments.add(message);
        if (lastComments.size === 4)
            lastComments.delete(Array.from(lastComments)[0]);
        console.log(lastComments);
    }

    function getVoteMessage(beerObject: IBeerModel, voteType: TVoteType) {
        if (beerObject.percentage <= 5) {
            return getCommentForVote(voteType, 'down5');
        } else if (beerObject.percentage > 5) {
            return getCommentForVote(voteType, 'up5');
        } else {
            return getCommentForVote(voteType, 'up10');
        }
    }

    function getCommentForVote(
        voteType: TVoteType,
        voteTypeSubtype: TVoteTypeSubtype,
    ): string {
        const comment =
            _.sample(VOTE_COMMENTS[voteType][voteTypeSubtype]) ?? '';
        if (!lastComments.has(comment)) return comment;
        else return getCommentForVote(voteType, voteTypeSubtype);
    }

    return reactToVoteSnackbar;
}

export default useVoteSnackComment;
