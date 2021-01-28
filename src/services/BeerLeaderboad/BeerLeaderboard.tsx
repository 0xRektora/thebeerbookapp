import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import React from 'react';
import { animated, config as springConfig, useSpring } from 'react-spring';
import { Utils } from '../../shared/utils/Utils';
import { ITableColumn, ITableData } from './BeerLeaderboardContainer';

interface IUseClassesProps {
    mobile: boolean;
}

const useClasses = makeStyles((props: IUseClassesProps) => ({
    container: {
        padding: '5px',
        width: (props: IUseClassesProps) => (props.mobile ? '100%' : '50%'),
        height: '100%',
        margin: 'auto',
    },
}));

export interface IBeerLeaderboardProps {
    title: string;
    columns: ITableColumn[];
    data: ITableData[];
}

function BeerLeaderboard(props: IBeerLeaderboardProps) {
    const classes = useClasses({
        mobile: Utils.isMobileDevice(),
    });

    const springProps = useSpring({
        config: springConfig.gentle,
        from: {
            opacity: 0,
            width: '0%',
            height: '0%',
        },
        to: {
            opacity: 1,
            width: '100%',
            height: '100%',
        },
    });

    return (
        <div className={classes.container}>
            <animated.div style={springProps}>
                <MaterialTable
                    title={props.title}
                    columns={props.columns}
                    data={props.data}
                />
            </animated.div>
        </div>
    );
}

export default React.memo(BeerLeaderboard);
