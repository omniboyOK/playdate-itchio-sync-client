import useItchioStore from "store/itchio";

const useItchioStoreData = () => {
  const games = useItchioStore(state => state.gamestore);
  const fetchItchioStore = useItchioStore(state => state.fetchItchioStore);
  const isLoading = useItchioStore(state => state.loadingStore);

  return {fetchItchioStore, games, isLoading};
};

export default useItchioStoreData;
