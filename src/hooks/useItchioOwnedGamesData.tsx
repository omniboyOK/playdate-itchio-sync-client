import useItchioStore from "store/itchio";

const useItchioOwnedGamesData = () => {
  const games = useItchioStore(state => state.ownedGames);
  const fetchItchioOwnedGames = useItchioStore(
    state => state.fetchItchioOwnedGames,
  );
  const isLoading = useItchioStore(state => state.loadingGames);

  return {games, isLoading, fetchItchioOwnedGames};
};

export default useItchioOwnedGamesData;
