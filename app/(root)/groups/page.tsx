import GroupsHome from '@/components/group/GroupsHome';
import { auth } from '@/lib/auth';
import type {
  IAllGroupsSidebarDetails,
  IHomePageGroupsResponse,
} from '@/types/group';
import { ESortByFilter } from '@/types/queries';
import { typedFetch } from '@/utils/api';
import { parseSearchParams } from '@/utils/query';

// ---------------------------------------- ------------------------

interface IGroupsPage {
  searchParams: Promise<{
    sortBy: string | string[] | undefined;
  }>;
}

const GroupsPage: React.FC<IGroupsPage> = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;

  const sortBy: ESortByFilter = parseSearchParams(
    resolvedSearchParams.sortBy,
    ''
  );

  const session = await auth();
  if (!session) throw new Error('User session is not available!');

  const groupsData = await typedFetch<IHomePageGroupsResponse>({
    url: `/groups?members=true&viewerId=${session.user.id}&sortBy=${sortBy}`,
  });

  if (!groupsData) throw new Error('Internal server error!');

  const sidbarDetails = await typedFetch<IAllGroupsSidebarDetails>({
    url: '/groups/stats',
  });

  return (
    <GroupsHome
      groupsData={groupsData}
      sortBy={sortBy}
      sidebarDetails={sidbarDetails}
      viewerId={session.user.id}
    />
  );
};

export default GroupsPage;
