export interface player{
    id : number,
    first_name : string,
    height_feet : number,
    height_inches : number,
    last_name : string,
    position : string,
    team_id : number,
    weight_pounds : number,
}

export interface game {
    id: number,
    date: string,
    home_team: team,
    home_team_score: number,
    period: number,
    postseason: boolean,
    season: number,
    status: string,
    time: string,
    visitor_team: team,
    visitor_team_score: number
}

export interface team {
    id: number,
    current_page: number,
    abbreviation: string,
    city: string,
    conference: string,
    division: string,
    full_name: string,
    name: string
}

export interface details {
    total_pages: number,
    current_page: number,
    next_page: number,
    per_page: number,
    total_count: number,
}

export interface gameData {
    data: game[],
    meta: {details}
}

/*
export interface rawSportsData{
    sports_content: sports_content;
}

export interface sports_content{
    sports_meta : sports_meta;
}

export interface sports_meta{
    date_time:string,
    end_to_end_time_millis: string, 
    consolidatedDomKey: string, 
    season_meta:season_meta, 
    next: {url:string}
}

export interface season_meta{
    calendar_date: string,
    season_year: number
    stats_season_year: string,
    stats_season_id: string,
    stats_season_stage: string,
    roster_season_year: string,
    schedule_season_year: string,
    standings_season_year: string,
    season_id: string,
    display_year: string,
    display_season: string,
    season_stage: string,
    league_id: string
}

*/

//new seasonYear data

export interface todayData{
    _internal :string,
	teamSitesOnly :string,
    seasonScheduleYear: number,
    showPlayoffsClinch :boolean,
	links :string
}
//new seasonYear data


export interface rawTeamAvgData{
    _internal: internal,
    league: league
}

export interface internal{
    pubDateTime	:	Date,
    igorPath	:	string,
    xslt	:	string,
    xsltForceRecompile	:	boolean,
    xsltInCache	:	boolean,
    xsltCompileTimeMillis	:	number,
    xsltTransformTimeMillis	:	number,
    consolidatedDomKey	:	string,
    endToEndTimeMillis	:	number
}

export interface league{
    standard : season,
	africa : season,
	sacramento : season,
	vegas : season,
	utah: season
}

export interface season{
    seasonYear : string,
    preseason : string,
    regularSeason: {teams: nbaTeam[]},
    playoffs : string
}

export interface nbaTeam{
    teamId	:	number,
    name	:	string,
    nickname	:	string,
    teamcode	:	string,
    abbreviation	:	string,
    min : avgRank,
	fgp : avgRank,
	tpp : avgRank,
	ftp : avgRank,
	orpg : avgRank,
	drpg : avgRank,
	trpg : avgRank,
	apg : avgRank,
	tpg : avgRank,
	spg : avgRank,
	bpg : avgRank,
	pfpg : avgRank,
	ppg : avgRank,
	oppg : avgRank,
	eff : avgRank

}

export interface avgRank{
    avg	: number,
    rank : number
}

export interface playerCurrentSeasonStats{
    data : seasonObject,
}

export interface seasonObject{
    seasons: playerSeasonStats[]
}

export interface playerSeasonStats{
    games_played :number,
    player_id :number,
    season :number,
    min :number,
    fgm :number,
    fga :number,
    fg3m :number,
    fg3a :number,
    ftm :number,
    fta :number,
    oreb :number,
    dreb :number,
    reb :number,
    ast :number,
    stl :number,
    blk :number,
    turnover :number,
    pf :number,
    pts :number,
    fg_pct :number,
    fg3_pct :number,
    ft_pct :number,
}

export interface rawPlayerIDData{
    _internal: internal,
    league: league2
}

export interface league2{
    standard : playerIDData[],
	africa : playerIDData[],
	sacramento : playerIDData[],
	vegas : playerIDData[],
	utah: playerIDData[]
}

export interface playerIDData{
    firstName: string,
    lastName: string,
    temporaryDisplayName: string,
    personId: number,
    teamId: number,
    jersey: number,
    isActive:boolean,
    pos: string,
    heightFeet: number,
    heightInches: number,
    heightMeters: number,
    weightPounds: number,
    weightKilograms: number,
    dateOfBirthUTC: number,
    teamSitesOnly: {playerCode: string,
        posFull: string,
        displayAffiliation: string,
        freeAgentCode: string},
    teams:number[],
    draft:{teamId: string,
        pickNum: string,
        roundNum: string,
        seasonYear: string
        },
    nbaDebutYear: number,
    yearsPro: number,
    collegeName: string,
    lastAffiliation: string,
    country: string
}

export interface playerGameStats{
    data: gameStats[],
    meta: {details}
}

export interface gameStats{
    id : number,
    ast : number,
    blk : number,
    dreb : number,
    fg3_pct : number,
    fg3a : number,
    fg3m : number,
    fg_pct : number,
    fga : number,
    fgm : number,
    ft_pct : number,
    fta : number,
    ftm : number,
	game : game,
    min : number,
    oreb : number,
    pf : number,
    player: player,
        
    pts : number,
    reb : number,
    stl : number,
    team : team,

}

export interface rawWidgetData{
    uid	: string,
    title : string,
    deep_link : string,	
    last_updated : string,
    count : number,
	items : widgetItem[]
}

export interface widgetItem{
    uid	: string,
    title : string,
    deep_link : string,	
    template: string,
    last_updated : string,
    count : number,
	items : widgetItem2[]
}

export interface widgetItem2{
    title: string,
    deep_link: string,
    name: string,
    timestamp:string,
    season: string,
    seasontype: string,
    gamedate:string,
    permode:string,
    leagueid: string,
    urldate:string,
	playergametats : string[]
}