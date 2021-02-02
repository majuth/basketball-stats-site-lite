import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { gameData, gameStats, playerCurrentSeasonStats, playerGameStats, playerIDData, rawPlayerIDData, team } from '../interfaces';
import { Observable } from 'rxjs';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {

  constructor(private data: DataService, private http: HttpClient) { }

  playerID: number;
  playerData: Array<string>;
  currentSeason;
  playerCurrentSeasonStats;
  playerIDData: playerIDData[];
  playerGameStats: gameStats[];
  playerOldSeasonStats = [];
  showContent = true;
  loading = false;
  playerTeamID = 0;

  ngOnInit(){
    this.data.currentPlayer.subscribe((player) => {this.playerID = player; this.loadPlayerData()});
    this.data.currentSeason.subscribe((season) => {this.currentSeason = season});
    this.data.loading.subscribe((loading) => {this.loading = loading});
  }

  loadPlayerData(){
    var playerData= [];
    
    this.http.get("https://www.balldontlie.io/api/v1/players/" + this.playerID).toPromise().then(data =>{
      console.log(data);

        for(let key in data)
          if (data.hasOwnProperty(key))
          playerData.push(data[key]);

        console.log(playerData);

        this.playerData = playerData;

    if(this.showContent == true){
    this.getPlayerTeam();
    this.getSeasonStats();
    this.loadPastGames();
    this.getPastSeasonStats();
    }

    this.data.changeLoading(false);
  });}

  getSeasonStats(){
    this.http.get<playerCurrentSeasonStats>("https://www.balldontlie.io/api/v1/season_averages?season=" + this.currentSeason +"&player_ids[]=" + this.playerID).subscribe( res => (this.playerCurrentSeasonStats = res.data[0]));
    console.log(this.playerCurrentSeasonStats);
  }


  loadPastGames(){
    var startDate = new Date();
    var endDate = new Date();

    startDate.setMonth(startDate.getMonth() - 1);
    endDate.setTime( endDate.getTime());

    
    var startdateString = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
    var enddateString = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
    this.getGameStatData(startdateString, enddateString).subscribe( res => this.playerGameStats = res.data.sort((a,b) => b.game.date.localeCompare(a.game.date)));
    console.log(this.playerGameStats);
  }

  getGameStatData(startdateString: string, enddateString: string): Observable<playerGameStats>{
    return this.http.get<playerGameStats>("https://www.balldontlie.io/api/v1/stats?player_ids[]=" + this.playerID + "&start_date=%27" + startdateString+ "%27&end_date=%27" + enddateString +"%27&per_page=50");
  }

  getPastSeasonStats(){
    this.playerOldSeasonStats=[];
    for(var i = 0; i < 2; i++){
      this.http.get<playerCurrentSeasonStats>("https://www.balldontlie.io/api/v1/season_averages?season=" + (this.currentSeason - 1 - i) +"&player_ids[]=" + this.playerID).subscribe( res => (this.playerOldSeasonStats.push(res.data[0])));
    }
    console.log(this.playerOldSeasonStats);
  }
  
  getPlayerTeam(){
    var playerTeam: team = this.playerData[6] as unknown as team;
    this.playerTeamID = playerTeam.id;
    console.log(playerTeam);
  }

}
