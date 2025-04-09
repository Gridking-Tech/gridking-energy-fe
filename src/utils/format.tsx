import { useRouter } from "next/navigation";

export const useCustomRouter = () => {
  return useRouter();
};

export const handleNavigation = (router: ReturnType<typeof useRouter>, path: string) => {
  router.replace(path);
};
