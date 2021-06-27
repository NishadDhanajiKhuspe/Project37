class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    var display_anwser = 230;
    question.hide();
   
    
    textSize(30);
    text("Game Start",120,100);
    Contestant.getContestantInfo();

    if(allContestants !== undefined){
      
      for(var plr in allContestants){
        var correctAns = "2";
        if(correctAns === allContestants[plr].answer){
          fill("green");
        }
        else{
          fill("red");
        }
        display_anwser +=30;
        
        textSize(15);
        text(allContestants[plr].name + ": " + allContestants[plr].answer, 250,display_anwser);
        fill("blue");
        text("*NOTE: Contestant who answered correct are hightlighted in green color ",130,230);
      }
    }
    
    }
  }
