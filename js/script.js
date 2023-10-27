const inputBusca = document.querySelector(".pesquisa");
const btnBusca = document.querySelector(".botao__buscar");
const listaBusca = document.querySelector(".busca__escolha");
const cidadeNome = document.querySelector(".cidade__nome");
const cidadeTemp = document.querySelector(".cidade__temp");
const cidadeTempMax = document.querySelector(".cidade__temp__max");
const cidadeTempMin = document.querySelector(".cidade__temp__min");
const cidadeTempSensacao = document.querySelector(".cidade__temp__sensacao");

btnBusca.addEventListener("click", (evento) => {
  evento.preventDefault();
  apiCall(inputBusca.value);
});

async function apiCall(cidadeBuscada) {
  let cidade = cidadeBuscada ? cidadeBuscada : "São Paulo";
  try {
    let busca = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=5&appid=0413047e607634244f04c7ce0351c105`
    );
    let buscaConvertida = await busca.json();
    console.log(buscaConvertida);
    let buscaNome;
    try {
      buscaNome = buscaConvertida[0].local_names.pt;
    } catch {
      buscaNome = buscaConvertida[0].name;
    }
    console.log(buscaNome)
    cidadeNome.textContent = `${buscaNome}`;
    const lat = buscaConvertida[0].lat;
    const lon = buscaConvertida[0].lon;

    apiTempo(lat, lon);
  } catch (error) {
    console.log(error);
  }
}

async function apiTempo(lat, lon) {
  try {
    const busca = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=0413047e607634244f04c7ce0351c105`
    );
    const buscaConvertida = await busca.json();
    const tempAtual = Math.floor(buscaConvertida.main.temp);
    const tempMax = Math.floor(buscaConvertida.main.temp_max);
    const tempMin = Math.floor(buscaConvertida.main.temp_min);
    const tempSensacao = Math.floor(buscaConvertida.main.feels_like);

    cidadeTemp.textContent = `${tempAtual} ºC`;
    cidadeTempMax.textContent = `Max: ${tempMax} ºC`;
    cidadeTempMin.textContent = `Min: ${tempMin} ºC`;
    cidadeTempSensacao.textContent = `Sensação: ${tempSensacao} ºC`;
  } catch (error) {
    console.log(error);
  }
}

apiCall();
