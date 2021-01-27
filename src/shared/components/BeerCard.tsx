import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { animated, interpolate } from 'react-spring';
import { ReactEventHandlers } from 'react-use-gesture/dist/types';
import { IBeerModel } from '../models/IBeerModel';
import { Utils } from '../utils/Utils';

const useStyles = makeStyles({
    container: {
        background: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        width: '45vh',
        maxWidth: '300px',
        height: '85vh',
        maxHeight: '570px',
        willChange: 'transform',
        borderRadius: '10px',
        boxShadow:
            '0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)',
        cursor: 'pointer',
    },
    img_container: {
        backgroundColor: 'white',
        height: '100%',
    },
    img: {
        width: '100%',
        height: '100%',
        maxHeight: 'calc(100vh - 25vh)',
        pointerEvents: 'none',
    },
    details: {
        padding: '5%',
    },
    details_title: {
        fontStyle: 'italic',
        fontSize: 'larger',
    },
});

export interface IBeerCardProps {
    rotation: number;
    scale: number;
    index: number;
    disableWoodBackground?: boolean;
    bind?: (...args: any[]) => ReactEventHandlers;
    data?: IBeerModel;
}

/**
 *  This is being used down there in the view, it interpolates rotation and scale into a css transform
 **/
const trans = (r: number, s: any) =>
    `perspective(1500px) rotateX(30deg) rotateY(${
        r / 10
    }deg) rotateZ(${r}deg) scale(${s})`;

export function BeerCard(props: IBeerCardProps) {
    const classes = useStyles();

    function renderImg() {
        return (
            <div
                className={classes.img_container}
                style={{
                    ...(props.disableWoodBackground
                        ? {}
                        : {
                              background:
                                  'url("https://images.unsplash.com/photo-1589874497556-65019ae69438?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80") no-repeat center',
                          }),
                }}
            >
                <img
                    className={classes.img}
                    src={props.data?.imageUrl}
                    alt={props.data?.imageUrl ?? 'Blank'}
                />
            </div>
        );
    }

    function renderContent() {
        return (
            <Grid
                container
                alignItems="center"
                style={{ height: '100%', flexFlow: 'column' }}
                spacing={1}
            >
                <Grid item>
                    <strong>
                        {Utils.formatAlcoholPercentage(
                            props.data?.percentage ?? 0,
                        )}
                    </strong>
                </Grid>

                <Grid item style={{ height: '100%' }}>
                    {renderImg()}
                </Grid>

                <Grid item style={{ textAlign: 'center' }}>
                    <strong className={classes.details_title}>
                        {props.data?.name}
                    </strong>
                </Grid>
            </Grid>
        );
    }

    /**
     * Will render conditionally a gesture bound card, or a simple div with the proper data
     */
    function bindExist() {
        if (props.bind) {
            return (
                /* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */
                <animated.div
                    {...(props.bind ? props.bind(props.index) : {})}
                    className={classes.container}
                    style={{
                        transform: interpolate(
                            [props.rotation, props.scale],
                            trans,
                        ),
                    }}
                >
                    {renderContent()}
                </animated.div>
            );
        } else {
            return <div className={classes.container}>{renderContent()}</div>;
        }
    }
    return bindExist();
}
