export {};
declare global {
  interface Window {
    loading: (state: boolean) => void;
  }
}
