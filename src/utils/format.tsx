import { useRouter } from "next/navigation";

export const useCustomRouter = () => {
  return useRouter();
};

export const handleNavigation = (router: ReturnType<typeof useRouter>, path: string) => {
  router.replace(path);
};

export const CapitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}