import { useAppointments } from '../hooks/useAppointments';
import { AppointmentDateMap } from '../types';

import {
    act,
    createQueryClientWrapper,
    renderHook,
    waitFor,
} from '@/test-utils';

// a helper function to get the total number of appointments for an AppointmentDate object
const getAppointmentCount = (appointments: AppointmentDateMap) => {
    return Object.values(appointments).reduce(
        (runningCount, appointmentsOnDate) =>
            runningCount + appointmentsOnDate.length,
        0,
    );
};

test('filter appointments by availability', async () => {
    const { result } = renderHook(() => useAppointments(), {
        wrapper: createQueryClientWrapper(),
    });

    // wait for appointments to populate
    await waitFor(() => {
        expect(
            getAppointmentCount(result.current.appointments),
        ).toBeGreaterThan(0);
    });

    // appointments start ou filtered (show only available)
    const filteredAppointmentsLength = getAppointmentCount(
        result.current.appointments,
    );

    console.log('filteredAppointmentsLength', filteredAppointmentsLength);

    // set to return all appointments
    act(() => result.current.setShowAll(true));

    // wait for count of appointments to be greater than when filtered
    await waitFor(() =>
        expect(
            getAppointmentCount(result.current.appointments),
        ).toBeGreaterThan(filteredAppointmentsLength),
    );
});
