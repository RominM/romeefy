import { useBestResult } from "./useBestResult";
import { useCoverCard } from "./useCoverCard";

export const useMapper = () => ({
  bestResult: useBestResult(),
  coverCard: useCoverCard(),
})