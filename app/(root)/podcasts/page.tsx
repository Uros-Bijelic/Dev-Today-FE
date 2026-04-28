import PodcastsHome from '@/components/content/PodcastsHome';
import { auth } from '@/lib/auth';
import {
  IContentPagesResponse,
  IContentPagesSidebarResponse,
} from '@/types/content';
import { ESortByFilter } from '@/types/queries';
import { typedFetch } from '@/utils/api';
import { parseSearchParams } from '@/utils/query';

// ----------------------------------------------------------------

interface IPodcastsPageProps {
  searchParams: Promise<{
    tag: string | string[] | undefined;
    sortBy: string | string[] | undefined;
  }>;
}

const PodcastsPage: React.FC<IPodcastsPageProps> = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;

  const tag = parseSearchParams(resolvedSearchParams.tag, '').toLowerCase();
  const sortBy = parseSearchParams(
    resolvedSearchParams.sortBy,
    ''
  ) as ESortByFilter;

  const session = await auth();
  if (!session) throw new Error('User not available!');

  const postsData = await typedFetch<IContentPagesResponse>({
    url: `/content?type=podcast&viewerId=${session.user.id}&tag=${tag}&sortBy=${sortBy}`,
  });

  if (!postsData)
    throw new Error("Something went wrong, can't show posts at the moment!");

  const sidebarData = await typedFetch<IContentPagesSidebarResponse>({
    url: `/content/stats?meetups=true&posts=true&viewerId=${session.user.id}`,
  });
  if (!sidebarData)
    throw new Error("Something went wrong, can't show posts at the moment!");

  return (
    <section className="px-3.5 lg:px-5">
      <PodcastsHome
        selectedTag={tag}
        podcastsData={postsData}
        viewerId={session.user.id}
        sortBy={sortBy}
        sidebarData={sidebarData}
      />
    </section>
  );
};

export default PodcastsPage;
