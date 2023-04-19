export const getApi = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
