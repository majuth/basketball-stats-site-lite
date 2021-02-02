import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  url = 'https://www.balldontlie.io/api/v1/players?per_page=5';
  names = [];
  names2: Array<string> = [];
  teamNames = ["Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls", "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "Golden State Warriors", "Houston Rockets", "Indiana Pacers", "LA Clippers", "Los Angeles Lakers", "Memphis Grizzlies", "Miami Heat", "Milwaukee Bucks", "Minnesota Timberwolves", "New Orleans Pelicans", "New York Knicks", "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns", "Portland Trail Blazers", "Sacramento Kings", "San Antonio Spurs", "Toronto Raptors", "Utah Jazz", "Washington Wizards"];
  loading = false;

  constructor(private http: HttpClient, private data: DataService){
    var starterFields = ["Lebron James", "James Harden", "Kyle Lowry", "Kawhi Leonard", "Anthony Davis", "Los Angeles Lakers", "Miami Heat", "Toronto Raptors", "Milwaukee Bucks"];
    this.names2 = starterFields;
  }
  
  
  @Output() optionActivated: EventEmitter<void> = new EventEmitter();
  @Output() optionSelected: EventEmitter<void> = new EventEmitter();

  myControl = new FormControl();
  options = this.names2;
  filteredOptions: Observable<string[]>;
  selectedOption = "";

  tab:Array<boolean>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.data.currentTab.subscribe(tab => this.tab = tab);
    this.data.loading.subscribe(loading => this.loading = loading);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.getFilteredHttpData(filterValue);
    //Check team names
    var tempTeamName = this.teamNames;
    tempTeamName = tempTeamName.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    return this.names2.concat(tempTeamName);
  }

  getFilteredHttpData(value: string){
    var tempNames= [];
    var tempNames2= [];
    
    this.http.get(this.url + "&search=" +value).toPromise().then(data =>{
      //console.log(data);

        for(let key in data)
          if (data.hasOwnProperty(key))
          tempNames.push(data[key]);

        tempNames = tempNames[0];

        //console.log(tempNames);

        for(let key in tempNames)
          if (tempNames.hasOwnProperty(key))
          tempNames2.push(tempNames[key].first_name + " " + tempNames[key].last_name);

        //console.log(tempNames2);
        this.names2 = tempNames2;
  });}

  submitForm(){
    this.selectedOption = this.myControl.value;
    this.data.changeLoading(true);
    if(this.teamNames.includes(this.selectedOption)){
      var teamID = this.teamNames.indexOf(this.selectedOption) + 1;
      this.changeTeam(teamID)
      this.changeToTeam();
    }else{
      this.getPlayerID(this.selectedOption);
      this.changeToPlayer();
    }
  }

  changeToAbout(){
    this.data.changeTab([true,true,true,false]);
  }

  changeToHomepage(){
    this.data.changeTab([false,true,true,true]);
  }

  changeToPlayer(){
    this.data.changeTab([true,false,true,true]);
  }

  changeToTeam(){
    this.data.changeTab([true,true,false,true]);
  }

  submitSearch(search: String){
    this.myControl.patchValue(search);
    this.submitForm();
  }

  changeTeam(team: number){
    this.data.changeTeam(team);
  }

  changePlayer(player: number){
    this.data.changePlayer(player);
  }

  getPlayerID(search: String){
    var id: number;
    var firstData =[];
    var secondData = [];
    this.http.get(this.url + "&search=" +search).toPromise().then(data =>{
      
        for(let key in data)
          if (data.hasOwnProperty(key))
          firstData.push(data[key]);

        firstData= firstData[0];

        for(let key in firstData)
          if (firstData.hasOwnProperty(key))
          secondData.push(firstData[key]);

        
        id = secondData[0].id;
        this.changePlayer(id);
  });
  }
}
