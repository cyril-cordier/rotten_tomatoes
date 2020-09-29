const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Film = require('../models/film');
const checkAuth = require('../middleware/check-auth');


router.get('/',(req,res,next) => {
   Film.find()
   .select('-__v')
   .exec()
   .then(data => {
       const response = {
           count: data.length,
           films: data 
       }
       if(data){
           res.status(200).json(response);
       }else{
           res.status(404).json({message: 'No entries !'});
       }  
   })
   .catch(err=> res.status(500).json({error: err}));

});


router.get('/:filmId',(req,res,next) => {
    const id = req.params.filmId; 
   Film.findById(id)
   .exec()
   .then(data => {
       console.log(data);

       if(data){
           res.status(200).json({
               message:'Film retrivied successfully',
               film:data,
               request:{
                   type:'GET',
                   url:'http://localhost:3000/films',
               }
           })
       }else{
           res.status(400).json({message: 'No valid Film entry found for provided ID'});
       }
   })
   .catch(err=>res.status(500).json({error:err}));


})



router.delete('/:filmId',(req,res,next) =>{
    const id = req.params.filmId; 
    Film.remove({_id: id})
    .exec()
    .then(data => {
        console.log(data)
        if(data){
            res.status(200).json({
                message: 'Film deleted successfully',
               request:{
                    type:'POST',
                    url: 'http://localhost:3000/films',
                    body: { title: 'String', genre: 'String'}
  
                } 
            })
        }else{
            res.status(400).json({message: 'No valid Film entry found for provided ID'});
        }
    })
    .catch(err=>res.status(500).json({error:err}));
})

router.patch('/:filmId',(req,res,next) =>{
    const id = req.params.filmId; 
   const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    
    } 

    

    Film.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Film updated successfully',
            request:{
                type: 'GET',
                url: 'http://localhost:3000/films/' + id

            } 
        
    });
    })
    .catch(err=>res.status(500).json({error:err}));
})

router.post('/',(req,res,next) => {
    const film = new Film({
        _id: new mongoose.Types.ObjectId(),
        title:req.body.title,
        api_id:req.body.api_id,
        description:req.body.description,
   /*      producer:req.body.producer, */
        year:req.body.year,
        image:req.body.image,
    });

    film.save()
        .then(result => {
            console.log(result);

        res.status(200).json({
            message: "Bravo tu as crée ta fiche !",
            createdFilm : film,
            request:{
                type:'GET',
                url:'http://localhost:3000/films/' + result._id
            }
        })
        })
        .catch(err=>res.status(500).json({error:err}));


})







module.exports = router;


