"use strict";

function criarTemplatePersonagem(item) {
  const card = document.createElement("div");
  card.classList.add("card-personagem");

  const img = document.createElement("img");
  img.src = item.character.images.jpg.image_url;
  img.alt = item.character.name;

  const p = document.createElement("p");
  p.classList.add("descricao-personagem");
  p.textContent = `${item.character.name} - ${item.role}`;

  card.appendChild(img);
  card.appendChild(p);

  return card;
}

async function buscarPersonagens() {
  const nomeAnime = document.getElementById("digitar-anime").value;
  const galeria = document.getElementById("galeria-personagens");

  if (nomeAnime === "") {
    return;
  } else {
    const respostaAnime = await fetch(
      `https://api.jikan.moe/v4/anime?q=${nomeAnime}&limit=1`,
    );
    const dadosAnime = await respostaAnime.json();
    const animeId = dadosAnime.data[0]?.mal_id;

    if (!animeId)
      return (galeria.innerHTML =
        "<p>Nenhum personagem encontrado ou nome do anime invalido.</p>");

    const respostaPersonagens = await fetch(
      `https://api.jikan.moe/v4/anime/${animeId}/characters`,
    );
    const dadosPersonagens = await respostaPersonagens.json();

    galeria.replaceChildren();

    if (!dadosPersonagens.data?.length)
      return (galeria.innerHTML = "<p>Nenhum personagem encontrado</p>");

    dadosPersonagens.data.forEach((item) => {
      const cardPronto = criarTemplatePersonagem(item);
      galeria.appendChild(cardPronto);
    });
  }
}

document
  .getElementById("buscar-personagens")
  .addEventListener("click", buscarPersonagens);
