import React from 'react';
import $ from 'jquery';

var SearchFilters = React.createClass({

	getInitialState: function () {
		return {
			text: '',
			repos: []
		};
	},
	_handleSubmit: function (e) {
		e.preventDefault();
		var searchOrg = this.state.text;
		var url = 'https://api.github.com/orgs/' + searchOrg + '/repos';
		$.ajax({
			url: url,
			dataType: "jsonp",
			success: function (body) {

				var response = body.data;
				var popular = [];

				if (response.message) {
					this.setState({
						text: '',
						repos: [['Oops..', response.message]]
					})
				} else {

					for (var i in response) {
						popular.push([response[i].watchers, response[i].full_name]);
					}
					;

					popular.sort(
						function (a, b) {
							return b[0] - a[0];
						}
					);

					this.setState({
						text: '',
						repos: popular
					});

				}


			}.bind(this)
		})
	},
	_onChange: function (e) {
		var text = e.target.value;
		this.setState({text: text});
	},
	_searchForm: function () {
		return (
			<div className="col-sm-6 offset-sm-3">
				<form onSubmit={this._handleSubmit}>
					<div className="input-group">
						<input type="text" className="form-control" onChange={this._onChange} value={this.state.text}
									 placeholder="Search for an organization..."/>
						<span className="input-group-btn">
										<input className="btn btn-secondary" type="submit" value="Search"/>
									</span>
					</div>
				</form>
			</div>
		)
	},
	render: function () {
		var repos = this.state.repos;

		if (repos.length == 0) {
			return this._searchForm();
		} else {
			return (
				<span>
					{this._searchForm()}
					<div className="col-sm-12">
						<table className="table table-inverse">
						<thead>
							<tr>
								<th>Watchers</th>
								<th>Repo Name</th>
							</tr>
						</thead>
						<tbody>
							{repos.map(function (repo, i) {
								return (
									<tr key={i}>
										<th scope="row">{repo[0]}</th>
										<td>{repo[1]}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
					</div>
				</span>
			);
		}
	}

})

export default SearchFilters;
