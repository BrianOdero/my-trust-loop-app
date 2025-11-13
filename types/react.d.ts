declare module 'react' {
  const React: any;
  export default React;
  export function useState<T = any>(initial: T): [T, (v: T) => void];
}


