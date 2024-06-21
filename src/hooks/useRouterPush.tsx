import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';

export const useRouterPush = () => {
  const router = useRouter();

  const pushRoute = (href: string) => {
    nProgress.start();
    router.push(href);
  };

  return pushRoute;
};
