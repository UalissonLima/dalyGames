"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function Input() {
  const [input, setInput] = useState("");
  const router = useRouter();

  function handleSearch(e: FormEvent) {
    e.preventDefault();

    if (input == "") return;

    router.push(`/game/search/${input}`);
  }

  return (
    <form
      action=""
      onSubmit={handleSearch}
      className="w-full bg-slate-200 my-5 flex gap-2 items-center justify-between rounded-lg p-2"
    >
      <input
        type="text"
        placeholder="Procurando algum jogo?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-slate-200 outline-none w-11/12"
      />

      <button type="submit">
        <FiSearch size={24} color="#ea580c" />
      </button>
    </form>
  );
}
