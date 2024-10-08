import React from "react";
import Container from "../components/container";
import Image from "next/image";
import userImg from "../../../public/user.png";
import { FaShareAlt } from "react-icons/fa";
import FavoriteCard from "./components/favorite";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Meu perfil - Daly Games sua plataforma de jogos!",
  description:
    "Perfil Sujeito Programador | Daly Games sua plataforma de jogos!",
};

export default function Profile() {
  return (
    <main className="w-full text-black">
      <Container>
        <section className="mt-8 mb-6 flex flex-col items-center justify-between relative gap-3 sm:flex-row">
          <div className="w-full flex items-center gap-4 flex-col justify-center sm:flex-row sm:justify-normal">
            <Image
              src={userImg}
              alt="Imagem usuario"
              className="rounded-full w-56 h-56 object-cover"
            />
            <h1 className="font-bold text-2xl">Ualisson Lima</h1>
          </div>

          <div className="sm:absolute flex top-0 right-0 gap-3 items-center justify-center">
            <button className="bg-gray-700 px-4 py-3 rounded-lg text-white font-bold">
              Configurações
            </button>

            <button className="bg-gray-700 px-4 py-3 rounded-lg">
              <FaShareAlt size={24} color="white" />
            </button>
          </div>
        </section>

        <section className="flex flex-wrap gap-5 flex-col sm:flex-row">
          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>

          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>

          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>
        </section>
      </Container>
    </main>
  );
}
