import { useSnackbar } from 'notistack';
import { useQuery } from 'react-query';
import TheBeerBookAPI from '../../core/TheBeerBookAPI';
import { IBeerVoteModel } from '../../shared/models/IVoteModel';

interface IQueryParams {
    limit?: number;
    skip?: number;
    id?: string;
}

const KEY = 'useGetAllVotes';
const path = '/vote';

const get = (params?: IQueryParams) => {
    const fullPath = `${path}?limit=${params?.limit ?? 0}&skip=${
        params?.skip ?? 0
    }${params?.id ? `&beerId=${params.id}` : ''}`;
    return TheBeerBookAPI.handler.get<IBeerVoteModel[]>(fullPath);
};

function useGetAllVotes(params?: IQueryParams) {
    const snacky = useSnackbar();
    return useQuery([KEY, params], () => get(params), {
        retry: false,
        onError: (err) => {
            snacky.enqueueSnackbar('Error retrieving data', {
                variant: 'error',
            });
        },
        refetchInterval: 5000, // Simulate "live" data
    });
}

export default useGetAllVotes;
