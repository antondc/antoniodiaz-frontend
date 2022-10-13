import { stringify } from 'qs';

import { UserLoadApiResponse, UsersState } from 'Modules/Users/users.types';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import { LoaderResult } from 'Root/src/shared/types/LoaderResult';
import HttpClient from 'Services/HttpClient';

export const initialUserLoader = async ({ query, params }: RequestParameters = {}): LoaderResult<{
  Users: UsersState;
}> => {
  try {
    const { data: userData }: UserLoadApiResponse = await HttpClient.get(
      '/users/' + params?.userId + '?' + stringify(query)
    );

    const result = {
      Users: {
        byKey: {
          [userData?.attributes?.id]: {
            ...userData.attributes,
          },
        },
        currentIds: [userData?.attributes?.id],
        loading: true,
      },
    };

    return result;
  } catch (error) {
    console.log(error);
  }
};
