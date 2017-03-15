class App{
	constructor(){
		this.data = [];
	}
	render(html,component){
		component.innerHTML += html;
	}
	reRender(html,component){
		component.innerHTML = html;
	}
}

class Component extends App{
	constructor(){

		super();
		this.fetchData();
	}

	viewList(){
		let html = `<ul>`;
		for(let i= 0;i<this.data.length;i++){
			html += `<li>${this.data[i].id} - ${this.data[i].name}</li>`;
		}
		html += `</ul>`;
		this.reRender(html,document.querySelector("#app"));
	}

	fetchData(){
		//Create Table > "CREATE TABLE IF NOT EXISTS tablename (id unique, data)"
		var db = window.openDatabase("appDPDemo", "1.0", "appDPDemo", 1000000);
		db.transaction(populateDB,errorDB,successDB);
		db.transaction(queryDB, errorDB);		

		function populateDB(tx){
			tx.executeSql('DROP TABLE IF EXISTS DEMO');
        	tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, name)');
         	tx.executeSql('INSERT INTO DEMO (id, name) VALUES ("1", "Clyde")');
         	tx.executeSql('INSERT INTO DEMO (id, name) VALUES ("2", "RJ")');
         	tx.executeSql('INSERT INTO DEMO (id, name) VALUES ("3", "Remy")');
         	tx.executeSql('INSERT INTO DEMO (id, name) VALUES ("4", "Dada")');
		}
		function errorDB(err){
			console.log("Error processing SQL: " + err.code);
		}
		function successDB(){
			console.log("Success!");			
		}
		function queryDB(tx) {
		    tx.executeSql('SELECT * FROM DEMO', [],(tx, results)=>{
		    	console.log(results.rows);
		    	appDPDemo.data = results.rows;	
		    	console.log(appDPDemo.data);
		    	appDPDemo.viewList();
		  //   	console.log("Insert ID = " + results.insertId);				
				// console.log("Rows Affected = " + results.rowAffected);				
				// console.log("Insert ID = " + results.rows.length);
		    },errorDB);
		}



		//Select > "SELECT * FROM tablename"
		//Save to your local variable > this.data
	}

	
}

let appDPDemo = new Component();


/*
{
	"id":"1",
	"name":"Clyde"
},
{
	"id":"2",
	"name":"RJ"
},
{
	"id":"3",
	"name":"Remy"
},
{
	"id":"4",
	"name":"Dada"
}
*/