import React from 'react'
import genre from '../genre.json';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

export function ChooseGenre() {
  //tuodaan genre.jsonista last.fm -palvelun top 50 suosituimman genren lista. Arvotaan niistä buttoneita varten 6 genreä.
            let i;
            let genrelista = [];
    for (i = 0; i <= 49; i++) {
      genrelista[i] = genre.tag[i].name;
    }
    let k;
    let randomnumero = [];
    for (k = 0; k <= 5; k++) {
      randomnumero[k] = Math.floor(Math.random() * 49);
    }
    let genres = [];
    let g;
    for (g = 0; g <= 5; g++) {
      genres.push(genrelista[randomnumero[g]]);
    }
    return genres;
};
//luodaan buttonit joiden avulla genre valitaan. 
export function MakeButtons(props) {
    let s;
    let array = [];
for (s = 0; s < props.Kategoriat.length; s++) {
  array = [...array,<Button type="submit" className="btn" role="group" variant="outline-success" size="sm" id={s} onClick={(event)  => props.handleOnClick(event)}>{props.Kategoriat[s]} </Button>]; 
}
return array;
};


const API_URL = 'http://ws.audioscrobbler.com/2.0/';
const rest = '&api_key=35d3a46b16e0113dd4437ac6deef84b2&format=json';

//haetaan kappaleita valitun genren mukaan. Palauttaa 50 suosituinta genren kappaletta last.fm palvelusta. 
export function GetSongs(ans, Pelaajat) {
  let esittäjä = [];
  let kappale = [];
  console.log(ans);
  ans = ans.substring(0,ans.length-1);

  return new Promise((resolve,reject) => {
    axios.get(`${API_URL}?method=tag.gettoptracks&tag=${ans}${rest}`)
      .then(res => {
        let { track } = res.data.tracks;
        for (let i = 0; i < 49; i++) {
          esittäjä = [...esittäjä, track[i].artist.name];
          kappale = [...kappale, track[i].name];
        }
        let k;
        //arvotaan kappaleista pelaajien määrän mukaan kappaleita, viisi kutakin pelaajaa kohden. 
    let randomnumero = [];
    let kerroin = sessionStorage.getItem("pelaajat"); 
    for (k = 0; k <= 5 * kerroin; k++) {
      randomnumero[k] = Math.floor(Math.random() * 49);
    }
    console.log(randomnumero);
    let biisit = [];
    let laulajat = [];
    let g;
    //laitetaan arvotut kappaleet arrayhin ja siirretään ne app.jssaan. Lopuksi löytyvät app.jssan statesta kohdasta esittäjä ja kappale. 
    for (g = 0; g <= 5 * kerroin; g++) {
      biisit.push(kappale[randomnumero[g]]);
      laulajat.push(esittäjä[randomnumero[g]]);
    }

        resolve({biisit, laulajat});
      })
      .catch(err => reject({ result: err }));
    });
}