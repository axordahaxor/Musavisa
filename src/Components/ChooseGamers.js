import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

export function ChooseGamers(props) {
        let s;
        let array = ["","1.Pelaaja", "2.Pelaajaa", "3.Pelaajaa", "4.Pelaajaa"];
        let Pelaajat = [];
        
    for (s = 1; s < array.length; s++) {
      Pelaajat = [...Pelaajat,<Button type="submit" className="btn" variant="outline-warning" size="sm" id={s} onClick={(event)  => props.handleOnClick(event)}>{array[s]} </Button>]; 
    }
    return Pelaajat;
    };
export default ChooseGamers;