import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Img from 'react-image'

import api from 'axios'

import './styles.css'
import arrowback from '../../assets/_ionicons_svg_md-arrow-back.svg'
import load from '../../assets/load.gif'

export default class Country extends Component {
    state = {
        country: [],
        flag: 'Bandeira',
        nativeName: '',
        population: 0,
        region: '',
        subregion: '',
        capital: '',
        topLevelDomain: [],
        currencies: [],
        languages: [],
        borders: [],
        countries: []
    }

    async componentDidMount() {
        const { name } = this.props.match.params
        // gets the prop name from country clicked

        const response = await api.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
        // gets country by the name
        const { ...docs } = response.data

        this.setState({
            flag: docs[0].flag,
            name: docs[0].name,
            nativeName: docs[0].nativeName,
            population: docs[0].population,
            region: docs[0].region,
            subregion: docs[0].subregion,
            capital: docs[0].capital,
            topLevelDomain: docs[0].topLevelDomain,
            currencies: docs[0].currencies,
            languages: docs[0].languages,
            borders: docs[0].borders,
        })

        let codelist = docs[0].borders.join(';')
        // creates the formated codelist to request border countries name

        // verifies if the country has border countries to fetch
        if (codelist != '') {
            const res = await api.get(`https://restcountries.eu/rest/v2/alpha?codes=${codelist}`)
            const { ...d } = res.data
            this.setState({ countries: d })
        }
    }

    render() {
        const { countries } = this.state
        const c = this.state
        
        let lang = Object.keys(c.languages).map( language => {
            if(language === '0'){
                return c.languages[language].name
            } else {
                return (', ' + c.languages[language].name)
            }
        })
        // formats (with a ,) the view of country languages

        var cont = 0
        let populationFormated = c.population.toString().split('').reverse().map( e => {
            let novo = ''
            if(cont >= 2){
                cont = 0
                novo += ','
                novo += e
            } else {
                cont++
                novo += e
            }
            return novo
        }).reverse()
/*         console.log(populationFormated[0])
        if(populationFormated[0] == ','){
            console.log('found a comma')
            populationFormated = populationFormated.slice(1)
        } */
        // formats (with a ,) the view of population number

        return (
            <section>
                <div>
                    <Link className='back' to='/' >
                        <img alt='back icon' src={arrowback} />
                        <p>Back</p>
                    </Link>
                </div>
                <div className='country-info'>
                    <Img className='flag' src={c.flag} 
                     loader={<img alt={`bandeira ${c.flag}`} src={load} 
                     style={{"object-fit": "contain"}} />}/>
                    <div className='info'>
                        <h2>{c.name}</h2> <br />
                        <div className='country-details'>
                            <p><strong>Native Name: </strong>
                                {c.nativeName}</p>
                            <p><strong>Population: </strong>
                                {populationFormated}</p>
                            <p><strong>Region: </strong>
                                {c.region}</p>
                            <p><strong>Sub Region: </strong>
                                {c.subregion}</p>
                            <p><strong>Capital: </strong>
                                {c.capital}</p>
                            <p><strong>Top Level Domain: </strong>
                                {c.topLevelDomain}</p>
                            <p><strong>Currencies: </strong>
                                {Object.keys(c.currencies).map( currency => 
                                    (c.currencies[currency].name))}</p>
                            <p><strong>Languages: </strong>
                                {lang}</p>
                        </div>
                        <div className='border-button'>
                            <strong>Border Countries: </strong>
                            <div>
                            {Object.keys(countries).map( bord => (
                                <Link name={countries[bord].name} className='btn' key={bord}
                                //  onClick={this.handleClick.bind(this)}
                                 to={`/border/${countries[bord].name}`} >
                                    {countries[bord].name}
                                </Link>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}