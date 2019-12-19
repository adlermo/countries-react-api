import React, { Component } from 'react'

import './styles.css'

import moon from '../../assets/_ionicons_svg_md-moon.svg'

export default class Header extends Component {
/*     state = {
        theme: true
    }
    // Preparation to add the Theme Changer
 */
    render() {
        return (
            <header>
                <h1>Where in the world?</h1>
                <div>
                    <img alt='moon icon' style={{height: 20 + 'px'}} src={moon} />
                    <p>Dark Mode</p>
                </div>
            </header>
        )
    }
}
