export interface Tecnologia {
  title: string;
  image: string;
  description: string;
  rating: number;
}

export const tecnologias: Tecnologia[] = [
  {
    title: "React",
    image: "/react.png",
    description: "Biblioteca JavaScript para construir interfaces.",
    rating: 5,
  },
  {
    title: "Next.js",
    image: "/nextjs.png",
    description: "Framework React para aplicações web.",
    rating: 4.5,
  },
];
