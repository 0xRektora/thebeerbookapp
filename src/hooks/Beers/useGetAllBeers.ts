import { useSnackbar } from 'notistack';
import { useQuery } from 'react-query';
import TheBeerBookAPI from '../../core/TheBeerBookAPI';
import { IBeerModel } from '../../shared/models/IBeerModel';

interface IQueryParams {
    limit?: number;
    skip?: number;
}

const KEY = 'useGetAllBeers';
const path = '/beers';

const get = (params?: IQueryParams) => {
    const fullPath = `${path}?limit=${params?.limit ?? 0}&skip=${
        params?.skip ?? 0
    }`;
    return TheBeerBookAPI.handler.get<IBeerModel[]>(fullPath);
};

function useGetAllBeers(params?: IQueryParams) {
    const snacky = useSnackbar();
    return useQuery([KEY, params], () => get(params), {
        retry: false,
        onError: (err) => {
            console.log(err);

            snacky.enqueueSnackbar('Error retrieving data', {
                variant: 'error',
            });
        },
    });
}

export default useGetAllBeers;
