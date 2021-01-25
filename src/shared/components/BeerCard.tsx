import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { animated, interpolate } from 'react-spring';
import { ReactEventHandlers } from 'react-use-gesture/dist/types';

const useStyles = makeStyles({
    container: {
        backgroundColor: 'white',
        backgroundSize: 'auto 85%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        width: '45vh',
        maxWidth: '300px',
        height: '85vh',
        maxHeight: '570px',
        willChange: 'transform',
        borderRadius: '10px',
        boxShadow:
            '0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)',
    },
});

export interface IBeerCardProps {
    rot: number;
    scale: number;
    index: number;
    img: string;
    bind?: (...args: any[]) => ReactEventHandlers;
}

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: any) =>
    `perspective(1500px) rotateX(30deg) rotateY(${
        r / 10
    }deg) rotateZ(${r}deg) scale(${s})`;

export function BeerCard(props: IBeerCardProps) {
    const classes = useStyles();

    function bindExist() {
        if (props.bind) {
            return (
                /* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */
                <animated.div
                    {...(props.bind ? props.bind(props.index) : {})}
                    className={classes.container}
                    style={{
                        transform: interpolate([props.rot, props.scale], trans),
                        backgroundImage: `url(${props.img})`,
                    }}
                />
            );
        } else {
            return (
                <div
                    className={classes.container}
                    style={{
                        transform: trans(props.rot, props.scale),
                        backgroundImage: `url(${props.img})`,
                    }}
                ></div>
            );
        }
    }
    return bindExist();
}
