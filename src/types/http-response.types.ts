export type HttpResponse<T> = {
  subscription: T | null;
  loading: boolean;
  error: Error | null;
};
