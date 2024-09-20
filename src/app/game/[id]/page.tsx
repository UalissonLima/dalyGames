import Container from "@/app/components/container";
import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import React from "react";
import { redirect } from "next/navigation";
import { Label } from "@/app/components/label";
import GameCard from "@/app/components/GameCard";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

interface PropsParams {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PropsParams): Promise<Metadata> {
  try {
    const response: GameProps = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`,
      { next: { revalidate: 60 } }
    )
      .then((res) => res.json())
      .catch(() => {
        return {
          title: "DalyGames - Descubra jogos incríveis para se divertir.",
        };
      });

    return {
      title: response.title,
      description: `${response.description.slice(0, 100)}...`,
      openGraph: {
        title: response.title,
        images: [response.image_url],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "DalyGames - Descubra jogos incríveis para se divertir.",
    };
  }
}

async function getData(id: string) {
  // https://sujeitoprogramador.com/next-api/?api=game&id=

  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
      { cache: "no-store" }
    );

    return res.json();
  } catch (error) {
    throw new Error("ERROR");
  }
}

async function getRecomendGame() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { cache: "no-store" }
    );
    return res.json();
  } catch (err) {
    throw new Error("Falha ao carregar informações");
  }
}

export default async function GameDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const dataGame: GameProps = await getData(id);
  const dalyGame: GameProps = await getRecomendGame();

  if (!dataGame) {
    redirect("/");
  }

  return (
    <main className="w-full text-black">
      <div className="bg-black h-80 sm:h-96 w-full relative">
        <Image
          src={dataGame.image_url}
          alt="Imagem do jogo"
          priority={true}
          fill={true}
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
          className="object-cover w-full h-80 sm:h-96 opacity-80"
        />
      </div>

      <Container>
        <h1 className="font-bold text-xl my-6">{dataGame.title}</h1>
        <p>{dataGame.description}</p>
        <h3 className="font-bold my-6">Plataformas disponíveis:</h3>
        <div className="flex gap-2 flex-wrap">
          {dataGame.platforms.map((item) => (
            <Label name={item} key={item} />
          ))}
        </div>
        <h3 className="font-bold my-6">Categorias:</h3>
        <div className="flex gap-2 flex-wrap">
          {dataGame.categories.map((item) => (
            <Label name={item} key={item} />
          ))}
        </div>
        <h3 className="font-bold my-6">
          Lançamento: <span className="font-normal">{dataGame.release}</span>
        </h3>

        <h3 className="font-bold my-6">Outros jogos que recomendamos:</h3>

        <div className="flex">
          <div className="flex-grow">
            <GameCard data={dalyGame} />
          </div>
        </div>
      </Container>
    </main>
  );
}
