import { useRouter } from 'next/navigation';
import NProgress from "@/config/nProgress"

export const useRouterPush = () => {
  const router = useRouter();

  const pushRoute = (href: string) => {
    NProgress.start();
    router.push(href);
  };

  return pushRoute;
};
