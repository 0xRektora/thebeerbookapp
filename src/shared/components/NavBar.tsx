import { Divider, Grid, IconButton } from '@material-ui/core';
import TableChartIcon from '@material-ui/icons/TableChart';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useClasses = makeStyles({
    container: {
        width: '100%',
        height: '50px',
        margin: '10px auto',
    },
    navBar: {
        width: '80%',
        height: '100%',
        margin: 'auto',
        backgroundColor: (props: INavBarProps) =>
            props.backgroundColor ?? 'rgba(255,255,255,0.8)',
        borderRadius: 10,
    },
    button: {
        color: (props: INavBarProps) => props.btnColor ?? 'unset',
    },
});

export interface INavBarProps {
    btnColor?: string;
    backgroundColor?: string;
    onClickTableChartIcon?: () => void;
    onClickThumbsIcon?: () => void;
}

function NavBar(props: INavBarProps) {
    const classes = useClasses(props);

    function handleOnClickTableChartIcon() {
        props.onClickTableChartIcon && props.onClickTableChartIcon();
    }

    function handleOnClickThumbsIcon() {
        props.onClickThumbsIcon && props.onClickThumbsIcon();
    }

    return (
        <div className={classes.container}>
            <Grid
                container
                className={classes.navBar}
                justify="space-evenly"
                alignItems="center"
            >
                <Grid item>
                    <IconButton onClick={handleOnClickTableChartIcon}>
                        <TableChartIcon className={classes.button} />
                    </IconButton>
                </Grid>
                <Grid item style={{ padding: 5, height: '100%' }}>
                    <Divider orientation="vertical" />
                </Grid>
                <Grid item>
                    <IconButton onClick={handleOnClickThumbsIcon}>
                        <ThumbsUpDownIcon className={classes.button} />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );
}

export default React.memo(NavBar);
