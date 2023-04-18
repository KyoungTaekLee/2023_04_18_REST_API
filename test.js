const https = require('https');

const getPokemonData = (url, pokemonName)=>{
  if(typeof(url)==="string" && typeof(pokemonName)==="string"){
    let assembleUrl = url + pokemonName;
    return new Promise((resolve,reject)=>{
      https.get(assembleUrl, (res)=>{
        let body = '';
        res.on('data',(chunk)=>{
          body += chunk;
        })
        res.on('end', ()=>{
          let data = JSON.parse(body);
          resolve(data);
        })
      })
      .on('error',(err)=>{
        reject(err);
      })
    })
  }else {
    console.log("두개의 매개변수는 모두 문자열을 요구합니다.");
  }
}

const main = async () =>{
  console.time("time-check");
  try{
    const pokemonName = 'pikachu';
    const pokemonData = await getPokemonData('https://pokeapi.co/api/v2/pokemon/',pokemonName);

    const types = await pokemonData.types.map(typeInfo => typeInfo.type.name);

    console.log(`Name: ${pokemonData.name}`);
    console.log(`Types: ${types}`);
  }catch(error){
    console.error("error fetching data from poke api: ", error);
  }
  console.timeEnd("time-check");
}

main();