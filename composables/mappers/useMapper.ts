import { useBestResult } from "./useBestResult";
import { useCoverCard } from "./useCoverCard";
import { useSearchItem } from "./useSearchItem";

export const useMapper = () => ({
  bestResult: useBestResult(),
  coverCard: useCoverCard(),
  searchItem: useSearchItem(),
})