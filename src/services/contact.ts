import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import contactsData from '@lib/data/contacts.json';
import {
  ContactAlert,
  ContactAlertsDataResponse,
  ContactDataResponse,
} from '@models/contact';
import { STATUS_SYMBOL } from '@utils/constants';
import { getUTCTime } from '@utils/datetime';
import { getRandomId } from '@utils/helpers';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    getContactById: build.query<ContactDataResponse, string | undefined>({
      queryFn: (id) => {
        try {
          const contact = contactsData.find((c) => c.contactId === id);

          if (!contact) {
            return {
              error: {
                status: 404,
                statusText: 'Not Found',
                data: 'Resource not found',
              },
            };
          }

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { alerts, ...contactWithoutAlerts } = contact;

          return {
            data: {
              contact: contactWithoutAlerts,
            },
          };
        } catch {
          return {
            error: {
              status: 500,
              statusText: 'Server Error',
              data: 'Failed to fetch data',
            },
          };
        }
      },
    }),
    getAllContactAlerts: build.query<ContactAlertsDataResponse, void>({
      queryFn: () => {
        try {
          const contactAlerts: ContactAlert[] = [];

          contactsData.map((contact) => {
            // Separate alerts from contact data
            const { alerts, ...contactsWithoutAlerts } = contact;

            if (Array.isArray(alerts)) {
              for (const alert of alerts) {
                // Skip warnings - not needed for this dashboard based on my own assumption and what I see in the live GRM demo
                let errorSeverity = alert.errorSeverity.toLowerCase();
                if (errorSeverity == 'warning') {
                  errorSeverity = 'caution';
                } else if (
                  !Object.values(STATUS_SYMBOL).includes(
                    errorSeverity as ContactAlert['errorSeverity']
                  )
                ) {
                  errorSeverity = 'off';
                }
                const errorTimestamp = alert.errorTime;
                const contactTimestampDiff = Math.abs(
                  contactsWithoutAlerts.contactBeginTimestamp -
                    contactsWithoutAlerts.contactEndTimestamp
                );

                contactAlerts.push({
                  ...alert,
                  _id: getRandomId(),
                  contactId: contactsWithoutAlerts.contactId,
                  contactName: contactsWithoutAlerts.contactName,
                  contactTime: getUTCTime(contactTimestampDiff),
                  errorSeverity: errorSeverity as ContactAlert['errorSeverity'],
                  errorTime: getUTCTime(errorTimestamp),
                  errorTimestamp,
                });
              }
            }
          });

          // Sort alerts in descending order by 'errorTimestamp' (most recent)
          contactAlerts.sort((a, b) => {
            // Use 0 as fallback
            const timeA = a.errorTimestamp ?? 0;
            const timeB = b.errorTimestamp ?? 0;

            return timeB - timeA;
          });

          return {
            data: {
              alerts: contactAlerts,
            },
          };
        } catch {
          return {
            error: {
              status: 500,
              statusText: 'Server Error',
              data: 'Failed to fetch data',
            },
          };
        }
      },
    }),
    updateContactAlerts: build.mutation({
      // Bypassing the baseQuery since not making an actual API call - update the cache directly in onQueryStarted
      queryFn: () => {
        return { data: null };
      },
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        // Update 'getAllContactAlerts' cache
        const patchResult = dispatch(
          contactApi.util.updateQueryData(
            'getAllContactAlerts',
            undefined,
            (cache) => {
              const alert = cache.alerts.find((a) => a._id === id);
              if (alert) {
                // Mutate the cache
                Object.assign(alert, patch);
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          // If the mutation fails, undo the optimistic update
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetContactByIdQuery,
  useGetAllContactAlertsQuery,
  useUpdateContactAlertsMutation,
} = contactApi;
