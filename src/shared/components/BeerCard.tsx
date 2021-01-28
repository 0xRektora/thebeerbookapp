import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import _ from 'lodash';
import React, { useRef } from 'react';
import { animated, interpolate } from 'react-spring';
import { ReactEventHandlers } from 'react-use-gesture/dist/types';
import CONFIG from '../../core/config';
import { IBeerModel } from '../models/IBeerModel';
import { Utils } from '../utils/Utils';

type TClassesProps = {
    color: string;
    fontTextColor: string;
};

const useStyles = makeStyles((props: TClassesProps) => ({
    container: {
        backgroundColor: 'rgba(255,255,255,0.7)',
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
        letterSpacing: '.15em',
        textShadow: '1px 2px 0 #969696, 1px 5px 5px #aba8a8',
        fontStyle: 'italic',
        fontSize: 'larger',
        color: (props: TClassesProps) => props.fontTextColor,
    },
}));

export interface IBeerCardProps {
    rotation: number;
    scale: number;
    index: number;
    disableWoodBackground?: boolean;
    height?: string | number;
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
    const color = useRef(getRandomColor());
    const fontTextColor = useRef(
        color.current === CONFIG.palette.primary ? 'dark' : 'white',
    );

    const classes = useStyles({
        fontTextColor: fontTextColor.current,
        color: color.current,
    });

    function renderImg() {
        return (
            <div className={classes.img_container}>
                <img
                    className={classes.img}
                    src={props.data?.imageUrl}
                    alt={props.data?.imageUrl ?? 'Blank'}
                />
            </div>
        );
    }

    function getRandomColor(): string {
        const colors = [
            CONFIG.palette.blue,
            CONFIG.palette.primary,
            CONFIG.palette.red,
            CONFIG.palette.secondary,
        ];
        return _.sample(colors) as string;
    }

    function renderContent() {
        return (
            <Grid
                container
                alignItems="center"
                style={{
                    height: '100%',
                    flexFlow: 'column',
                    backgroundColor: color.current,
                    borderRadius: '15px',
                }}
                spacing={0}
            >
                <Grid item>
                    <strong className={classes.details_title}>
                        {Utils.formatAlcoholPercentage(
                            props.data?.percentage ?? 0,
                        )}
                    </strong>
                </Grid>

                <Grid item style={{ height: '100%', backgroundColor: 'white' }}>
                    {renderImg()}
                </Grid>

                <Grid item>
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
