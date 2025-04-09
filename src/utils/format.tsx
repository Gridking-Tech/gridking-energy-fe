import { useRouter } from "next/navigation";

export const router = useRouter();

export const handleNavigation = (path: string) => {
  router.replace(path);
};
