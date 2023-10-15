/// <reference path="../typings/globals/jquery/index.d.ts" />
import {Quiz} from './quiz.js'
export class Setting{
    constructor(){
        this.categoryInput=document.getElementById('category');
        this.difficultyInput=document.getElementsByName('difficulty');
        this.numberOfQuestionsInput=document.getElementById('numberOfQuestions');
        
        document.getElementById('startBtn').addEventListener('click',this.startQuiz.bind(this));
    }
    /**
     * get values from inputs
     * send values of inputs to link api
     * fetch data from server
     */
    async startQuiz(){
        //get values from inputs
         let category =this.categoryInput.value;
         let difficulty=Array.from(this.difficultyInput).find(value=>value.checked).value;
         let numberOfQuestions=this.numberOfQuestionsInput.value;
         //send values of inputs to link api
         let Url=`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`;
        //fetch data from server
         let response=await this.fetchData(Url);
         //display screen quiz ,hide screen setting
         if(response.length > 0)
         {
            $('#setting').fadeOut(500);
            $('#quiz').fadeIn(500);
            let quiz=new Quiz(response);
         }
        
    }
   async fetchData(url)
    {
        let response =await fetch(url);
        response=await response.json();
       return response.results;
    }
}