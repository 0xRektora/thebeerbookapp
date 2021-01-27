import { makeStyles } from '@material-ui/styles';
import React, { useRef, useState } from 'react';
import { animated, interpolate, useSprings } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import {
    CommonGestureState,
    Coordinates,
    SharedGestureState,
} from 'react-use-gesture/dist/types';
import { IBeerModel } from '../models/IBeerModel';
import { BeerCard } from './BeerCard';

const useStyles = makeStyles({
    container: {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        willChange: 'transform',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

// These two are just helpers, they curate spring data, values that are later being interpolated into css
// Work as the "loading" state
const to = (i: number) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
});
const from = (i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

export interface IBeerDeckProps {
    cards: IBeerModel[];
    disableWoodBackground?: boolean;
    onDeckIsEmpty?: () => void;
    onVoteOccurs?: (index: number, voteType: 'left' | 'right') => void;
}

export function BeerDeck(props: IBeerDeckProps) {
    const classes = useStyles();
    const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out

    const springRef = useRef<any>();
    const [springProps, set] = useSprings(props.cards.length, (i) => ({
        ...to(i),
        from: from(i),
        ref: i === props.cards.length - 1 ? springRef : undefined,
    })); // Create a bunch of springs using the helpers above

    // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
    const bind = useGesture(handleGesture);

    /**
     *  Handle the gestures for the cards.
     *
     *  Scale on click, X axis movements support, velocity handler
     * @param [CommonGestureState & Coordinates & SharedGestureState] react useGesture params
     */
    function handleGesture({
        args: [index],
        down,
        delta: [xDelta],
        distance,
        direction: [xDir],
        velocity,
    }: CommonGestureState & Coordinates & SharedGestureState) {
        const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
        const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
        if (!down && trigger) {
            gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
            if (props.onVoteOccurs) {
                props.onVoteOccurs(index, dir === 1 ? 'right' : 'left');
            }
        }

        //@ts-ignore
        set((i: number) =>
            updateCardAnimationOnSwipe(i, index, dir, down, velocity, xDelta),
        );
        if (!down && gone.size === props.cards.length) onDeckIsEmpty();
    }

    function updateCardAnimationOnSwipe(
        i: number,
        index: number,
        dir: -1 | 1,
        down: boolean,
        velocity: number,
        xDelta: number,
    ) {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit
        return {
            x,
            rot,
            scale,
            delay: undefined,
            config: {
                friction: 50,
                tension: down ? 800 : isGone ? 200 : 500,
            },
        };
    }

    function onDeckIsEmpty() {
        setTimeout(() => {
            if (props.onDeckIsEmpty) props.onDeckIsEmpty();
            gone.clear();
            //@ts-ignore
            set((i: number) => to(i));
        }, 600);
    }

    function renderDeck() {
        return springProps.map(({ x, y, rot, scale }, i) => {
            return (
                <animated.div
                    className={classes.container}
                    key={i}
                    style={{
                        transform: interpolate(
                            [x, y],
                            (x, y) => `translate3d(${x}px,${y}px,0)`,
                        ),
                    }}
                >
                    <BeerCard
                        bind={bind}
                        index={i}
                        rotation={rot}
                        scale={scale}
                        data={props.cards[i]}
                        disableWoodBackground={props.disableWoodBackground}
                    />
                </animated.div>
            );
        });
    }

    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    return <>{renderDeck()}</>;
}
