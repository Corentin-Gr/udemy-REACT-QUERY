import { useCallback, useState } from 'react';

import type { Staff } from '@shared/types';

import { filterByTreatment } from '../utils';

import { axiosInstance } from '@/axiosInstance';
import { queryKeys } from '@/react-query/constants';
import { useQuery } from '@tanstack/react-query';

// query function for useQuery
async function getStaff(): Promise<Staff[]> {
    const { data } = await axiosInstance.get('/staff');
    return data;
}

export function useStaff() {
    const fallback: Staff[] = [];

    // for filtering staff by treatment
    const [filter, setFilter] = useState('all');

    const selectFn = useCallback(
        // take only one argument, data, so the function can be passed by reference as the useQuery 'select' value
        (data: Staff[]) => {
            if (filter == 'all') return data;
            return filterByTreatment(data, filter);
        },
        [filter],
    );

    const { data: staff = fallback } = useQuery({
        queryKey: [queryKeys.staff],
        queryFn: getStaff,
        select: selectFn, // note, the function here is memoized in the definition of selectFn, not if was an anonymous fuction (...) => {...}
    });

    return { staff, filter, setFilter };
}
