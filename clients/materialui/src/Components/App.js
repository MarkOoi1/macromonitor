import React, { Component, Fragment } from 'react'
import { Header, Dashboard, Footer } from './Layout'

export default class App extends Component {
  state = {
    regions: [
      {name: 'Australia', market_ids: [], keywords: ['RBA','Lowe','Morrison','Australia']},
      {name: 'USA', market_ids: [], keywords: ['Powell','Williams','Clarida','Bowman','Brainard','Quarles','Harker','Mester','Kashkari','Kaplan','Rosengren','George','Bullard','Evans','Strine','Fed Reserve']},
      {name: 'Europe', market_ids: [], keywords: ['Germany','France','Italy','ECB','Lagarde']},
      {name: 'UK', market_ids: [], keywords: ['UK','Boris','Boris Johnson','Sunak ','Raab','Michael Gove']}
    ]
  }

  getRegionsByName() {
    const regionList = this.state.regions.map(({name},index,res)  => res[index]=name);
    return regionList;
  }

  render() {
    
    return (
      <Fragment>
        <Header regions={this.getRegionsByName()}/>
        <Dashboard />
        <Footer />
      </Fragment>
    );
  }
}
