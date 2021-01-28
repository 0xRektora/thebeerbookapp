import { Column } from 'material-table';
import React, { useMemo } from 'react';
import useGetAllVotes from '../../hooks/Votes/useGetAllVotes';
import { IBeerVoteModel } from '../../shared/models/IVoteModel';
import BeerLeaderboard from './BeerLeaderboard';

export interface ITableColumn {
    title: string;
    field: TTableColumnField;
}

export interface ITableData {
    name: string;
    description: string;
    percentage: string;
    votes: number;
}
type TTableColumnField = 'name' | 'description' | 'percentage' | 'votes';

function BeerLeaderboardContainer() {
    const votesQuery = useGetAllVotes();
    const TABLE_NAME = 'The Beer Leaderboard';

    function generateColumns(): ITableColumn[] {
        const name: ITableColumn = { title: 'Name', field: 'name' };
        const percentage: ITableColumn = {
            title: 'Percentage',
            field: 'percentage',
        };
        const votes: ITableColumn & Column<{}> = {
            title: 'votes',
            field: 'votes',
            defaultSort: 'desc',
        };
        return [name, percentage, votes];
    }

    const memoizedGenerateColumns = useMemo(() => generateColumns(), []);

    function mapQueryDataToTableData(data?: IBeerVoteModel[]): ITableData[] {
        if (!data?.length) return [];

        return data.map((e) => ({
            name: e.beer.name,
            description: e.beer.description,
            percentage: String(e.beer.percentage),
            votes: e.count.beerId,
        }));
    }

    const memoizedMapQueryDataToTableData = useMemo(
        () => mapQueryDataToTableData(votesQuery.data?.data),
        [votesQuery.data?.data],
    );

    return (
        <BeerLeaderboard
            title={TABLE_NAME}
            columns={memoizedGenerateColumns}
            data={memoizedMapQueryDataToTableData}
        />
    );
}

export default React.memo(BeerLeaderboardContainer);
