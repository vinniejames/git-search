import React from 'react';
import {render} from 'react-dom';
import SearchFilters from './SearchFilters.jsx';

var App = React.createClass({
  render () {
    return (
			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<h1 className="text-xs-center">Search GitHub Orgs</h1>
					</div>
					<SearchFilters />
				</div>
			</div>
    )
  }
});

render(<App/>, document.getElementById('app'));
