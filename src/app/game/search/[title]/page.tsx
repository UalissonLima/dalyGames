import Container from "@/app/components/container";
import GameCard from "@/app/components/GameCard";
import Input from "@/app/components/input";
import { GameProps } from "@/utils/types/game";

async function getData(title: string) {
  try {
    const decode = decodeURI(title);
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&title=${title}`
    );
    return res.json();
  } catch (err) {
    return null;
  }
}

export default async function Search({
  params: { title },
}: {
  params: { title: string };
}) {
  const games: GameProps[] = await getData(title);
  return (
    <main className="w-full text-black">
      <Container>
        <Input />

        <h1 className="font-bold text-xl mt-8 mb-5">
          Veja o que encontramos em nossa base
        </h1>

        {!games && <p>Esse jogo não foi encontrado!...</p>}

        <section>
          {
            <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {games &&
                games.map((item) => <GameCard key={item.id} data={item} />)}
            </section>
          }
        </section>
      </Container>
    </main>
  );
}
