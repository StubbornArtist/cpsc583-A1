function MatrixData(){
	
	this.parseCSV = function(file, rowsLabel){
		
		var pairs = [];
		var rows = [];
		var columns = [];
		
		
		d3.csv(file, function (data){
			
			data.forEach(function (d){
				
				var row = new Row(d[rowsLabel]);
				
				for (var key in d){
					
					if(key !== rowsLabel){
						
						var index = columns.map(function(d){return d.name;}).indexOf(key);
						if( index === -1){
							index = columns.length;
							columns.push(new Column(key));
						}
						columns[index].addRow(d[rowsLabel], +d[key]);
						
						pairs.push(new Pair(d[rowsLabel], key, +d[key]));
						
						row.addColumn(key, +d[key]);
					}
				}	
				rows.push(row);
			});			
		
		});
		this.pairs = pairs;
		this.columns = columns;
		this.rows = rows;	
	}

	this.averageRows = function(){
		this.rows.forEach(function(d){ d.addAverage();});
	}
	
	this.averageColumns = function(){
		this.columns.forEach(function(d){d.addAverage();});
	}
	
	this.findColumn = function(name){
		return this.columns.find(function(d){return d.name === name;})
	}
	
	this.findRow = function(name){
		return this.rows.find(function(d){return d.name === name;});
	}
	
	this.findPair = function(row, column){
		return this.pairs.find(function(d){ return d.row === row && d.column === column });
	}
}

function Pair(row, column, value){
	
	this.row = row;
	this.column = column;
	this.value = value;
}

function Column(name){
	this.name = name;
	this.rows = [];
	
	this.addRow = function(name, value){
		this.rows.push({name : name, value : value});
	}
	
	this.addAverage = function(){
		var values = this.rows.map(function(d){return d.value});
		this.value = d3.mean(values);
	}
}

function Row(name){
	this.name = name;
	this.columns = [];
	
	this.addColumn = function(name, value){
		this.columns.push({name:name, value: value});	
	}
	this.addAverage = function(){
		var values = this.columns.map(function(d){return d.value});
		this.value = d3.mean(values);
	}
}