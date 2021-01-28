import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import TheBeerBookAPI from '../../core/TheBeerBookAPI';
import { TVoteType } from '../utils/useReactToVoteSnackbar';

interface IQueryParams {
    limit?: number;
    skip?: number;
}

interface IBodyParams {
    uuid: string;
    beerId: string;
}

interface IParams {
    queryParams?: IQueryParams;
    bodyParams: IBodyParams;
    voteType: TVoteType;
}

const KEY = 'useMutVote';
const path = '/vote';

const post = (params: IParams) => {
    const fullPath = path;

    if (params.voteType === 'left') {
        return TheBeerBookAPI.handler.delete(fullPath, {
            data: params.bodyParams,
        });
    } else {
        return TheBeerBookAPI.handler.post(fullPath, params.bodyParams);
    }
};

function useMutVote() {
    const snacky = useSnackbar();
    return useMutation((params: IParams) => post(params));
}

export default useMutVote;
