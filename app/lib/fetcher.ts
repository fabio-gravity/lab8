export const fetcher = async (url: string) => {
const res = await fetch(url);


if (!res.ok) {
const message = `Erro ${res.status}: ${res.statusText}`;
throw new Error(message);
}


return res.json();
};