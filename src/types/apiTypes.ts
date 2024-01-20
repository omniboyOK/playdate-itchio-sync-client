export interface FetchResponse<T> {
  json(): Promise<T>;
}
