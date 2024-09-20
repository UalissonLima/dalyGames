"use client";
import { useState } from "react";
import { DiVim } from "react-icons/di";
import { FiEdit, FiX } from "react-icons/fi";

export default function FavoriteCard() {
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [gameName, setGameName] = useState("");

  function handleButton() {
    setShowInput(!showInput);

    if (input !== "") {
      setGameName(input);
    }

    setInput("");
  }

  return (
    <div className="w-full bg-gray-900 p-4 h-44 text-white rounded-lg flex flex-col justify-between">
      {showInput ? (
        <div className="flex items-center justify-center">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="w-full rounded-md h-8 text-black px-2"
          />
          <button onClick={handleButton}>
            <FiX
              size={24}
              color="white
            "
            />
          </button>
        </div>
      ) : (
        <button
          className="self-start hover:scale-110 duration-200 transition-all"
          onClick={handleButton}
        >
          <FiEdit size={24} color="white" />
        </button>
      )}

      {gameName && (
        <div>
          <span className="text-white">Jogo Favorito:</span>
          <p className="font-bold text-white">{gameName}</p>
        </div>
      )}

      {!gameName && <p className="font-bold text-white">Adicionar jogo</p>}
    </div>
  );
}
