import React from 'react';
import axios from 'axios';

class F extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      biisi1: [],
    }
}

fetchaus = (props) => {
  
  let i = props.biisinnumero;
  let value = props.esittäjä[i] + "+" + props.kappale[i];
  //API_KEY:n kohdalle tarvitaan Youtubeapin key, jotta kappaleita voidaan hakea Youtubesta. 
   const API_KEY = "";
   const ROOT_URL_REQUEST = "https://www.googleapis.com/youtube/v3/search/?&part=snippet&key=";
   const ROOT_URL_EMBED = "https://www.youtube.com/embed";


       axios.get(`${ROOT_URL_REQUEST}${API_KEY}&q=${value}&type=video`)
           .then(res => {
             // Kappaleet soivat 30 sekuntia ennen pysäytystä.
              const biisi = ROOT_URL_EMBED + "/" + res.data.items[0].id.videoId + '?autoplay=1&controls=0&disablekb=1&end=30&modestbranding="1"';
              this.setState(()=> {
                return {
                  biisi1: biisi
                }
              });
           })
           
}
// Päivitetään komponentti jolloin seuraava kappale lähtee soimaan. 
componentWillReceiveProps(nextProps) {
  this.fetchaus(nextProps);
}
// Iframe, jossa playerin tiedot ja joitain määrityksiä. Yksi tapa peittää video näkymästä ja tehdä pelistä mielenkiintoisempaa
// on käyttää style={{width:0,height:0,border:0,}}, jolloin video peittyy näkyvistä. Se ei kuitenkaan taida olla Youtube APIn käyttöehtojen mukaista.
render() {
  return <iframe id="youtube_player" title="youtube" className="iframe" width="320" height="240" src={this.state.biisi1}  allowFullScreen={false} allowscriptaccess="always" frameBorder="1"></iframe>;
}
}
export default F;
