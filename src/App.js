import React from 'react';
import './App.css';
import { ChooseGenre, MakeButtons} from './Components/ChooseGenre';
import ChooseGamers from './Components/ChooseGamers'
import {GetSongs} from './Components/ChooseGenre';
import F from './Components/Questions';
import Pelaajat from './Components/ChooseGamers';
import Buttongroup from 'react-bootstrap/ButtonGroup';
import swal from 'sweetalert';

class App extends React.Component {
  constructor(props) { 
    super(props);
  this.state = {
    Kategoriat: ChooseGenre(),
    napit : MakeButtons,
    valinta: "", 
    esittäjä: "",
    kappale: "",
    Pelaaja: [],
    Pelaajat1: Pelaajat,
    vastaus: [],
    vastaus1: [],
    klikki: [],
    otsikko: 1,
    pelaajannumero: 1,
    pelaajataulukko: "",
    }
    }

  Pelurit = (event) => {
    let Pelaaja = event.target.id;
    this.setState({
      Pelaaja: Pelaaja
    });
    sessionStorage.setItem("pelaajat", event.target.id);
  }

  saveName = (event) => {
   let nappi = event.target.innerHTML;
    this.setState({
      valinta: nappi
    },async () => {
      const obj = await GetSongs(this.state.valinta, this.state.Pelaaja);
      this.setState({
        esittäjä: obj.laulajat,
        kappale: obj.biisit
      });
    });
    console.log(this.state.esittäjä, this.state.kappale);
  }
  
//handle vastauksien tallentamiseen. Esittäjä tässä kohdassa.
  handleChange = (event) => {
    const vastaus = event.target.value;

      this.setState({
          
          vastaus: vastaus
      })
    }
// sama kuin edellinen, mutta kappaleet. 
      handleChange1 = (event) => {
        const vastaus1 = event.target.value;
    
          this.setState({
              
              vastaus1: vastaus1
          })
        }
        //vastauksen tarkistaminen. Pelissä vastataan pienillä kirjaimilla ja myös oikeat vastaukset pakotetaan
        //pieniin kirjaimiin, jotta vastaaminen helpottuu.
    handleClickkaus = (event) => {
      let i = this.state.otsikko;
  let tarkistus = this.state.vastaus + this.state.vastaus1;
  tarkistus = tarkistus.toLowerCase();
  let tarkistus1 = this.state.esittäjä[i] + this.state.kappale[i];
  tarkistus1 = tarkistus1.toLowerCase();
  if (tarkistus === tarkistus1) {
    swal ("Oikein!", "hienoa työtä, jatka samaan malliin.", "success");

    }
    else {
       swal ("Nääh, ei toimi.", "väärin valitettavasti(oletettavasti)", "warning");
  }
  if (this.state.esittäjä.length < this.state.otsikko + 2) {
    swal ("Voittaja!", "Pelaaja x voitti pelin pistein:","success");
    // lopuksi tyhjennetään localstorage ja ladataan sivu uudelleen pelin aloittamiseksi alusta. 
    let clearaus = () => {
      localStorage.clear();
      window.location.reload(true)
      }
    setTimeout(clearaus, 10000);
  }
  }

  laskuri = (props) => {
    let pelinumero;
    let lause = this.state.pelaajannumero;
    if (lause <= 5) {
      pelinumero = "Pelaaja 1";
    } else {
      if (lause > 5 || lause <= 10) {
         pelinumero = "Pelaaja 2";
      } else {
        if (lause > 10 || lause <= 15 ) {
          pelinumero = "Pelaaja 3";
        } else {
          if (lause > 15 || lause <= 20) {
          pelinumero = "Pelaaja 4";
          }
        }
      }
      return pelinumero;
    }
  }

  render() {
    return (
      <div className="App" >
        <div className="container">
            <h2> Musavisa </h2>
        <p> Peli on hyvin yksinkertainen: valitaan genre jossa kisataan ja pelaajien määrä. Jokaisesta oikeasta vastauksesta saa yhden pisteen.</p><p>Pelaaja arvaa vuorollaan viisi kappaletta. Se, kenellä on eniten pisteitä, voittaa.</p>
        <br></br>
        <br></br>
        <Buttongroup><ChooseGamers handleOnClick={this.Pelurit}/> </Buttongroup>
        <Buttongroup><MakeButtons Kategoriat={this.state.Kategoriat} data={this.state.ChooseGenre} handleOnClick={this.saveName}/></Buttongroup>
            <h2>Pelaaja - {this.laskuri()} Biisi - {this.state.otsikko}</h2>
            <br></br>
            <center><F esittäjä={this.state.esittäjä} kappale={this.state.kappale} biisinnumero={this.state.otsikko} pelaajat={this.state.Pelaajat1} /><p></p></center>
            <p> Esittäjä:
            <input type="text" onChange={this.handleChange} id="1" value={this.state.vastaus.value} />
            Kappale:
            <input type="text" onChange={this.handleChange1} id="2" value={this.state.vastaus1.value} />
            <input type="button" onClick={() => {this.handleClickkaus(); this.setState({otsikko: this.state.otsikko +1}); this.setState({pelaajannumero: this.state.pelaajannumero +1});}} value="Lähetä vastaus" />
              </p>

            </div> 
      </div>
    );
  }
}

export default App;
