import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import api from 'axios'

import './styles.css'
import search from '../../assets/_ionicons_svg_md-search.svg'


export default class Main extends Component {
    state = {
        countryInfo: [],
        regionValue: 'all',
        searchValue: ''
    }

    componentDidMount() {
        this.loadCountries()
        // Request the countries
    }

    loadCountries = async (filter) => {
        const response = await api.get(`https://restcountries.eu/rest/v2/all`)
        // get all countries

        const { ...dados } = response.data

        this.setState({ countryInfo: dados })
    }

    // event triggered on input change
    handleChange(event) {
        const searchValue = event.target.value
        // updates search value to filter countries names
        this.setState({ searchValue })
    }

    // event triggered on select tag change
    regionFilter(event) {
        const regionValue = event.target.value
        // updates search value to filter countries by region
        this.setState({ regionValue })
    }

    render() {
        const { countryInfo, searchValue, regionValue } = this.state
        
        // filter the countries by region and search input
        let filteredCountries = Object.keys(countryInfo).filter(
            country => {
                switch (regionValue) {
                    case 'africa':
                        return countryInfo[country].region.toLowerCase() === regionValue.toLowerCase() && (countryInfo[country].name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
                    case 'americas':
                        return countryInfo[country].region.toLowerCase() === regionValue.toLowerCase() && (countryInfo[country].name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
                    case 'asia':
                        return countryInfo[country].region.toLowerCase() === regionValue.toLowerCase() && (countryInfo[country].name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
                    case 'europe':
                        return countryInfo[country].region.toLowerCase() === regionValue.toLowerCase() && (countryInfo[country].name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
                    case 'oceania':
                        return countryInfo[country].region.toLowerCase() === regionValue.toLowerCase() && (countryInfo[country].name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
                    default:
                        return countryInfo[country].name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
                }
            }
        )

        return (
            <div className='country-list'>
                <section className='search-filters'>
                    {/* name='search' */}
                    <div>
                        <img alt='search icon' src={search} style={{height: 25 + 'px'}} />
                        <input onChange={this.handleChange.bind(this)}
                         placeholder='Search for a country...' />
                    </div>
                    <select name='filter' onChange={this.regionFilter.bind(this)}>
                        <option value='all'>Filter by Region</option>
                        <option value='africa'>Africa</option>
                        <option value='americas'>America</option>
                        <option value='asia'>Asia</option>
                        <option value='europe'>Europe</option>
                        <option value='oceania'>Oceania</option>
                    </select>
                </section>

                <section className='card-list'>
                {/* Allows iteration on Object keys */}
                    {filteredCountries.map( country => (
                    <Link to={`/country/${countryInfo[country].name}`} 
                         key={country} className='country-card' 
                         name={countryInfo[country].name} >
                        <img alt={`Bandeira ${countryInfo[country].name}`}
                            src={countryInfo[country].flag} />
                        <div className='description'>
                            <h2>{countryInfo[country].name}</h2>
                            <p><strong>Population: </strong>
                            {countryInfo[country].population}</p>
                            <p><strong>Region: </strong>
                            {countryInfo[country].region}</p>
                            <p><strong>Capital: </strong>
                            {countryInfo[country].capital}</p>
                        </div>
                    </Link>
                    ))}
                </section>


            </div>
        )
    }

}
